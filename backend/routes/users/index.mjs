import express from 'express';
import User from '@models/User.mjs';
import UserQueryController from '@controllers/User.query.controller.mjs';
import UserCommandController from '@controllers/User.command.controller.mjs';
import validatorMiddleware from './validatorMiddleware.js';

const router = express.Router();

router.post('/user/create', ...validatorMiddleware,
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
      const userId = await UserQueryController.findUserIdByEmail(user);

      if (userId) {
        return res.status(422)
          .json({ data: null, errors: ['EMAIL_ALREADY_EXIST'] })
          .end();
      }

      const createdUserId = await UserCommandController.createUser(user);

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
          route: '/users/create',
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

router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
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
      id,
      firstName,
      lastName,
      email,
      country,
      city,
      phoneNumber,
      avatar,
    });

    // todo: must check email or not edit email on form

    const count = await UserCommandController.updateUser(user);

    res.status(200).json({ data: { count }, errors: null }).end();

  } catch (e) {
    console.error(
      JSON.stringify({
        route: `/users/${id}`,
        error: e.message,
      }));

    res.status(500)
      .json({
        data: null,
        errors: ['SERVER_ERROR'],
      })
      .end();
  }
});

router.delete('/users/:id', async (req, res) => {
  const user = new User({ id: req.params.id });
  const count = await UserCommandController.deleteUser(user);
  // todo: manage errors response
  res.status(200).json({ data: { count }, errors: null }).end();
})

router.get('/users/:id', async (req, res) => {
  const user = new User({ id: req.params.id });
  const userInfo = await UserQueryController.getUserById(user);
  // todo: manage errors response
  res.status(200).json({ data: userInfo, errors: null });
});

router.get('/users', async (req, res) => {
  const users = await UserQueryController.getUsers();
  // todo: manage errors response
  res.status(200).json({ data: users, errors: null }).end();
});

export default router;
