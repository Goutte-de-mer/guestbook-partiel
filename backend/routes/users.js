var express = require("express");
var router = express.Router();
const {
  newMessageValidations,
  handleValidationErrors,
} = require("../middlewares/messageValidations");
const { postMessage } = require("../controllers/userController");

router.post(
  "/new-message",
  newMessageValidations,
  handleValidationErrors,
  async (req, res) => {
    try {
      const result = await postMessage(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

module.exports = router;
