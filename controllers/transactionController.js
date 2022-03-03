const transaction = require("../models/transactionModel");

exports.add = (req, res) => {
  const { payer, points, timestamp } = req.body;
  if (!(payer && points && timestamp)) {
    res
      .status(400)
      .json(
        "Please include payer, points, and timestamp information in your input."
      );
  }
  res.json(transaction.add(req.body));
};

exports.spend = (req, res) => {
  const { points } = req.body;
  if (points < 0) {
    res.status(400).json("Cannot spend a negative quantity of points");
  }
  res.json(transaction.spend(points));
};

exports.display = (_req, res) => {
  res.json(transaction.display());
};
