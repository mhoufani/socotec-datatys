import { body, validationResult } from 'express-validator';

// this validator control and sanitize values on request received for prevent xss vulnerabilities

export const emailValidator = body('email')
  .trim()
  .isEmail()
  .escape();

export const firstnameValidator = body('firstName')
  .trim()
  .notEmpty()
  .isString()
  .escape();

export const lastnameValidator = body('lastName')
  .trim()
  .notEmpty()
  .isString()
  .escape();

export const cityValidator = body('city')
  .trim()
  .notEmpty()
  .isString()
  .escape();

export const countryValidator = body('country')
  .trim()
  .notEmpty()
  .isString()
  .escape();

export const phoneNumberValidator = body('phoneNumber')
  .trim()
  .notEmpty()
  .isString()
  .escape();

export default [
  firstnameValidator,
  lastnameValidator,
  emailValidator,
  cityValidator,
  countryValidator,
  phoneNumberValidator,
  // customize error response with formatted response
  (req, res, next) => {
    const result = validationResult(req)
      .array({ onlyFirstError: true });
    if (result.length) {
      const errorFormatted = result.map(({
        path,
        msg,
      }) => `${path}: ${msg}`);
      return res.status(400)
        .json({
          data: null,
          errors: errorFormatted,
        })
        .end();
    }
    next();
  },
];
