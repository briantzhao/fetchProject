const express = require("express");
const app = express();
const cors = require("cors");
const transactionRoutes = require("./routes/transactionRoutes");

const port = 8080;

app.use(cors());

app.use(express.json());

app.use("/", transactionRoutes);

app.listen(port, function () {
  console.log(`Server running on port ${port}`);
});
