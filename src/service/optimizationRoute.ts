import {
  ProductPosition,
  Position,
  PickingList,
  PickProduct,
} from '../utils/common';

export function optimizeRoute(
  productsPositions: ProductPosition[],
  startingPosition: Position,
): PickingList {
  const optimalRoute = nearestProduct(startingPosition, productsPositions);
  return optimalRoute;
}

function calculateDistance(a: Position, b: Position): number {
  return Math.sqrt(
    Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2) + Math.pow(b.z - a.z, 2),
  );
}

function nearestProduct(
  start: Position,
  points: ProductPosition[],
): PickingList {
  let current: Position = start;
  const route: PickProduct[] = [];
  let totalDistance: number = 0;

  const unvisited: ProductPosition[] = [...points];

  while (unvisited.length > 0) {
    let nearestProduct: ProductPosition | null = null;
    let minDistance = Infinity;
    let nearestIndex: string = '';
    let nearestPosition: Position = { x: 0, y: 0, z: 0 };

    for (let i = 0; i < unvisited.length; i++) {
      const productPosition: Position = {
        x: unvisited[i].x,
        y: unvisited[i].y,
        z: unvisited[i].z,
      };
      const distance = calculateDistance(current, productPosition);
      if (distance < minDistance) {
        minDistance = distance;
        nearestProduct = unvisited[i];
        nearestIndex = unvisited[i].productId;
        nearestPosition = productPosition;
      }
    }

    if (nearestProduct) {
      const pickProduct: PickProduct = {
        productId: nearestProduct.productId,
        positionId: nearestProduct.positionId,
      };
      route.push(pickProduct);
      totalDistance += minDistance;
      current = nearestPosition;

      for (let i = unvisited.length - 1; i >= 0; i--) {
        if (unvisited[i].productId === nearestIndex) {
          unvisited.splice(i, 1);
        }
      }
    }
  }

  return { distance: Math.round(totalDistance), pickingOrder: route };
}
