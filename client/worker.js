console.log("Service Worker Loaded...");

self.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: "Notified by Traversy Media!",
    icon: "http://image.ibb.co/frYOFd/tmlogo.png",
  });
});

self.addEventListener("notificationclick", (e) => {
  var notification = e.notification;
  var action = e.action;

  if (action === "close") {
    notification.close();
  } else {
    clients.openWindow("http://www.google.com");
    notification.close();
  }
});

self.addEventListener("message", function (event) {
  var data = JSON.parse(event.data);

  console.log("SW Received Message:");
  console.log(data);

  self.rec_Id = data.rec_Id;
  self.time = data.time;
  let title = "KeepSlip";
  setTimeout(() => {
    self.registration.showNotification(title, {
      body: `Your Receipt ID: ${data.rec_Id} will expire in 7 days`,
      icon: "http://image.ibb.co/frYOFd/tmlogo.png",
    });
  }, data.time);
});
