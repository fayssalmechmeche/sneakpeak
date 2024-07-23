import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { auth } from '../middlewares/auth';
import { ProductReturnService } from '../services/ProductReturnService';

export const ProductReturnRouter = Router();

ProductReturnRouter.get(
  '/:id',
  auth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res
        .status(StatusCodes.OK)
        .json(await ProductReturnService.find(parseInt(req.params.id)));
    } catch (error) {
      next(error);
    }
  },
);

ProductReturnRouter.post(
  '/',
  auth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res
        .status(StatusCodes.CREATED)
        .json(
          await ProductReturnService.create(
            parseInt(req.body.productId),
            req.body.reason,
          ),
        );
    } catch (error) {
      next(error);
    }
  },
);