const router = require("express").Router();
const {
  add,
  spend,
  display,
} = require("../controllers/transactionController.js");

router.post("/add", add);

router.delete("/spend", spend);

router.get("/display", display);

module.exports = router;
