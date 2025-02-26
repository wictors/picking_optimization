import { Router, Request, Response, NextFunction } from 'express';
import { Order, ProductPosition } from '../utils/common';
import { getProductPositions } from '../externalApiService';
import { optimizeRoute } from '../service/optimizationRoute';

const router = Router();

const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export default () => {
  router.get(
    '/pick-order',
    asyncHandler(async (req: Request, res: Response) => {
      try {
        if (!req.body) {
          res.status(400).json({ error: 'Body is required' });
          return;
        }
        if (
          !Object.keys(req.body).includes('products') ||
          !Object.keys(req.body).includes('startingPosition')
        ) {
          res.status(400).json({
            error: 'Products and starting position are required in body',
          });
          return;
        }

        const orderBody: Order = req.body;

        const startingPosition = orderBody.startingPosition;
        const products = orderBody.products;

        let productsPositions: ProductPosition[] = [];
        for (const productId of products) {
          const newPositions = await getProductPositions(productId);
          productsPositions = [...productsPositions, ...newPositions];
        }

        const optimizedRoute = optimizeRoute(
          productsPositions,
          startingPosition,
        );

        res.status(200).json({
          message: 'Order received and optimization of picking order is ready.',
          optimizedRoute,
        });
        return;
      } catch (error: any) {
        console.error('Error in /pick-order route', error.response.data);
        res.status(500).json(error.response.data);
        return;
      }
    }),
  );

  return router;
};
