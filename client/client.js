const publicVapidKey =
  "BI0swpUwvrReSLQh5a4oMPrTs7w1JTBaMAuTc5Cp-kVGf5YWHQNV2hPbx-oLc-pmuZmd2A5w0doO2qVlDdKPiBs";

// check service worker
if ("serviceWorker" in navigator) {
  send().catch((err) => console.error(err));
}

// Register service worker, Regiter Push, Send Push
async function send() {
  // Register service worker
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/",
  });
  console.log("Service worker registerd...");

  // Regiter Push
  console.log("Registering Push...");
  const subsciption = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });
  console.log("Push registered...");

  // Send Push Notification
  console.log("Sending Push...");
  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subsciption),
    headers: {
      "content-type": "application/json",
    },
  });
  console.log("Push sent...");
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
