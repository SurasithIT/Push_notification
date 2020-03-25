console.log("Service Worker Loaded");

self.addEventListener("push", e => {
  //   console.log(e.data);
  const data = e.data.json();
  console.log("Push Received...");
  self.registration.showNotification(data.title, {
    body: "Notified"
  });
});
