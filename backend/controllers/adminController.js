var express = require("express");
var router = express.Router();
const { getMessages } = require("../controllers/userController");

router.get("/messages", async (req, res) => {
  try {
    const result = await getMessages();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
