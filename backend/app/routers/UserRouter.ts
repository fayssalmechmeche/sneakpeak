import express, { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserService } from '../services/UserService';
import { RequestError } from '../helpers/error';
import { UserRepository } from '../repositories/UserRepository';

export const UserRouter = express.Router();

const findUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const user = await UserRepository.findById(Number(id));
  if (!user) {
    next(new RequestError(StatusCodes.NOT_FOUND, 'user_not_found'));
  }

  res.locals.user = user;
  next();
};

// Register a new user
UserRouter.post(
  '/users',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      return res
        .status(StatusCodes.CREATED)
        .json(await UserService.registerUser(email, password));
    } catch (error) {
      next(error);
    }
  },
);

// Verify if the user exists before sending email verification
UserRouter.use('/users/:id/challenge/email', findUser);
UserRouter.post(
  '/users/:id/challenge/email',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = res.locals;
      const { token } = req.body;

      return res
        .status(StatusCodes.OK)
        .json(await UserService.verifyEmail(user, token));
    } catch (error) {
      next(error);
    }
  },
);

UserRouter.post(
  '/users/password-reset',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      return res
        .status(StatusCodes.OK)
        .json(await UserService.sendPasswordResetEmail(email));
    } catch (error) {
      next(error);
    }
  },
);

UserRouter.use('/users/:id/password', findUser);
UserRouter.put(
  '/users/:id/password',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = res.locals;
      const { token, password } = req.body;

      return res
        .status(StatusCodes.OK)
        .json(await UserService.resetPassword(user, token, password));
    } catch (error) {
      next(error);
    }
  },
);