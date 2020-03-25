const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());
// set static path
app.use(express.static(path.join(__dirname, "client")));

const publicVapidKey =
  "BI0swpUwvrReSLQh5a4oMPrTs7w1JTBaMAuTc5Cp-kVGf5YWHQNV2hPbx-oLc-pmuZmd2A5w0doO2qVlDdKPiBs";

const privateVapidKey = "Jjr3k903BhJqkOs10EevdkBmSGAArtuOnmGo7kjkj30";

webpush.setVapidDetails(
  "mailto:email@test.com",
  publicVapidKey,
  privateVapidKey
);

app.post("/subscribe", (req, res) => {
  const subscribtion = req.body;

  res.status(201).json({});

  const payload = JSON.stringify({ title: "Push Test" });

  webpush
    .sendNotification(subscribtion, payload)
    .catch(err => console.error(err));
});

const port = 4000;

app.listen(port, () => console.log("app is listen on port", port));
