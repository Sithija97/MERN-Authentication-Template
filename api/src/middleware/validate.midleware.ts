import { body } from "express-validator";

export const validateSignUp = [
  body("username")
    .trim()
    .isLength({ min: 6 })
    .escape()
    .withMessage("Username must be at least 3 character long"),

  body("email")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false })
    .withMessage("Invalid Mail Format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 Character long"),
];
