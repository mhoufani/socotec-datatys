import express from 'express';
import User from '@models/User.mjs';
import UserController from '@controllers/UserController.mjs';
import validatorMiddleware from './validatorMiddleware.js';


const router = express.Router();

router.post('/user/register', ...validatorMiddleware,
  async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      country,
      city,
      phoneNumber,
      avatar
    } = req.body;

    try {
      const user = new User({
        firstName,
        lastName,
        email,
        country,
        city,
        phoneNumber,
        avatar,
      });

      // we control that the user already exist on the database
      const userId = await UserController.findUserIdByEmail(user.email);

      if (userId) {
        return res.status(422)
          .json({ errors: ['EMAIL_ALREADY_EXIST'] })
          .end();
      }

      const createdUserId = await UserController.save(user);

      if (!createdUserId) {
        return res.status(422)
          .json({
            data: null,
            errors: ['USER_NOT_CREATED'],
          })
          .end();
      }

      res.status(200)
        .json({
          data: { id: createdUserId },
          errors: null,
        })
        .end();
    } catch (e) {
      console.error(
        JSON.stringify({
          route: '/user/register',
          error: e.message
        }));

      res.status(500)
        .json({
          data: null,
          errors: ['SERVER_ERROR'],
        })
        .end();
    }
  });

export default router;
