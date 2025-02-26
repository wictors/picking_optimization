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
  const optimalRoute = nearestNeighbor(startingPosition, productsPositions);
  return optimalRoute;
}

function calculateDistance(a: Position, b: Position): number {
  return Math.sqrt(
    Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2) + Math.pow(b.z - a.z, 2),
  );
}

function nearestNeighbor(
  start: Position,
  points: ProductPosition[],
): PickingList {
  let current: Position = start;
  const route: PickProduct[] = [];
  let totalDistance: number = 0;

  const unvisited: ProductPosition[] = [...points];

  while (unvisited.length > 0) {
    let nearestPoint: ProductPosition | null = null;
    let minDistance = Infinity;
    let nearestIndex: string = '';

    for (let i = 0; i < unvisited.length; i++) {
      const productPosition: Position = {
        x: unvisited[i].x,
        y: unvisited[i].y,
        z: unvisited[i].z,
      };
      const distance = calculateDistance(current, productPosition);
      if (distance < minDistance) {
        minDistance = distance;
        nearestPoint = unvisited[i];
        nearestIndex = unvisited[i].productId;
      }
    }

    if (nearestPoint) {
      const nearestProduct: PickProduct = {
        productId: nearestPoint.productId,
        positionId: nearestPoint.positionId,
      };
      route.push(nearestProduct);
      totalDistance += minDistance;
      current = { x: nearestPoint.x, y: nearestPoint.y, z: nearestPoint.z };

      for (let i = unvisited.length - 1; i >= 0; i--) {
        if (unvisited[i].productId === nearestIndex) {
          unvisited.splice(i, 1);
        }
      }
    }
  }

  return { distance: Math.round(totalDistance), pickingOrder: route };
}
