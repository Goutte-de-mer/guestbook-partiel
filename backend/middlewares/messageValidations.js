const { body, validationResult } = require("express-validator");

const newMessageValidations = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Le nom est obligatoire")
    .isString()
    .withMessage("Le contenu doit être une chaîne de caractères"),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Le message est obligatoire")
    .isString()
    .withMessage("Le message doit être une chaîne de caractères")
    .isLength({ min: 5 })
    .withMessage("Le message doit contenir au moins 5 caractères"),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Erreurs de validation",
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
        value: error.value,
      })),
    });
  }
  next();
};

module.exports = {
  newMessageValidations,
  handleValidationErrors,
};
