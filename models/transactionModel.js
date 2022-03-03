const fs = require("fs");
path = require("path");
transactionsFile = path.join(__dirname, "../data/transactions.json");

const getPoints = () => {
  let data = fs.readFileSync(transactionsFile);
  if (data.length != 0) {
    data = JSON.parse(data);
  } else {
    data = [];
  }
  return data;
};

const display = () => {
  const tArray = getPoints();
  const displayPoints = {};
  tArray.forEach((entry) => {
    if (!displayPoints[entry.payer]) {
      displayPoints[entry.payer] = entry.points;
    } else {
      displayPoints[entry.payer] += entry.points;
    }
  });
  return displayPoints;
};

const add = (transaction) => {
  const tArray = getPoints();
  transaction.timestamp = new Date(transaction.timestamp).getTime();
  tArray.push(transaction);
  tArray.sort((a, b) => {
    return a.timestamp - b.timestamp;
  });
  fs.writeFileSync(transactionsFile, JSON.stringify(tArray));
  return `Transaction with ${transaction.payer} completed successfully.`;
};

const spend = (points) => {
  const tArray = getPoints();
  const deductions = [];
  for (let i = 0; i < tArray.length; i++) {
    if (points <= 0) {
      break;
    } else if (points < tArray[i].points) {
      tArray[i].points -= points;
      if (!deductions[tArray[i].payer]) {
        deductions[tArray[i].payer] = points * -1;
      } else {
        deductions[tArray[i].payer] -= points;
      }
      points = 0;
    } else {
      points -= tArray[i].points;
      if (!deductions[tArray[i].payer]) {
        deductions[tArray[i].payer] = tArray[i].points * -1;
      } else {
        deductions[tArray[i].payer] -= tArray[i].points;
      }
      tArray[i].points = 0;
    }
  }
  if (points > 0) {
    return "Not enough points. Cancelling transaction.";
  }
  fs.writeFileSync(transactionsFile, JSON.stringify(tArray));

  const response = [];
  for (const [key, value] of Object.entries(deductions)) {
    let obj = { payer: key, points: value };
    response.push(obj);
  }
  return response;
};

module.exports = { display, add, spend };
