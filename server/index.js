const express = require("express");
const bodyParser = require("body-parser");
const pdf = require("html-pdf");
const cors = require("cors");

const pdfTemplate = require("./documents");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("ello");
  res.send("elllo");
});

// POST ROUTE PDF generation
app.post("/create-pdf", (req, res) => {
  console.log("create-pdf", req.body);
  pdf.create(pdfTemplate(req.body), {}).toFile("result.pdf", err => {
    if (err) {
      res.send(Promise.reject());
    }
    res.send(Promise.resolve());
  });
});

app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

app.listen(5000, () => {
  console.log("Server is running... ");
});
