import { Router, Request, Response, NextFunction } from 'express';
import { Order, ProductPosition } from '../utils/common';
import { getProductPositions } from '../externalApiService';

const router = Router();

const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export default () => {
  router.get(
    '/pick',
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
            error: 'Products and Starting position are required in body',
          });
          return;
        }

        const orderBody: Order = req.body;
        const products = orderBody.products;
        const productsPositions: Record<string, ProductPosition[]> = {};
        for (const productId of products) {
          productsPositions[productId] = await getProductPositions(productId);
        }
        console.log('productsPositions', productsPositions);
        res.status(200).json({
          message: 'Order received and picking optimization is ready.',
        });
        return;
      } catch (error: any) {
        console.error('Error in /pick route', error.response.data);
        res.status(500).json(error.response.data);
        return;
      }
    }),
  );

  return router;
};
