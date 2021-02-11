const express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const https = require("https");
const port = 3001;
require("dotenv").config({ path: "./configs/.env" });

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const SUBSCRIPTION_KEY = process.env["AZURE_SUBSCRIPTION_KEY"];
if (!SUBSCRIPTION_KEY) {
  throw new Error("AZURE_SUBSCRIPTION_KEY is not set.");
}

const CONFIGURATION_ID = process.env["CUSTOM_CONFIGURATION_ID"];

const bingWebSearch = async (query) => {
  const options = {
    hostname: "api.bing.microsoft.com",
    path:
      "/v7.0/custom/search?q=" +
      encodeURIComponent(query) +
      "&customconfig=" +
      CONFIGURATION_ID +
      "&mkt=en-NZ",
    headers: { "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY },
  };

  let promise = new Promise((resolve, reject) => {
    https.get(options, (res) => {
      let body = "";
      res.on("data", (part) => (body += part));

      res.on("end", () => {
        for (var header in res.headers) {
          if (
            header.startsWith("bingapis-") ||
            header.startsWith("x-msedge-")
          ) {
            console.log(header + ": " + res.headers[header]);
          }
        }
        console.log("\nJSON Response:\n");
        console.dir(JSON.parse(body), { colors: false, depth: null });
        resolve(JSON.stringify(JSON.parse(body), null, "  "));
      });

      res.on("error", (e) => {
        console.log("Error: " + e.message);
        reject(e);
      });
    });
  });
  return await promise;
};

app.post("/search", async (req, res) => {
  const query = req.body.query;

  const response = await bingWebSearch(query)
    .then((result) => {
      console.log("result", result);
      console.log("done");
      return result;
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
      res.send(`Error: ${err}`);
    });

  console.log("response", response);
  res.status(200).send(response);
});

app.listen(port, (err) => {
  err
    ? console.log(`ERROR ${console.log(err)}`)
    : console.log(`running server on port ${port}`);
});
