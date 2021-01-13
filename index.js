const express = require("express");
const cors = require("cors");
const router = require("./api/router");
const bodyParser = require("body-parser");

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", router);

app.get("/", (req, res) => res.send("Hello Okhome!"));

app.listen(port, () => {
  console.log(`Server are running on port ${port}`);
});
