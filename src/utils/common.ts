export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface Order {
  products: string[];
  startingPosition: Position;
}

export interface ProductPosition {
  positionId: string;
  x: number;
  y: number;
  z: number;
  productId: string;
  quantity: number;
}

export interface PickProduct {
  productId: string;
  positionId: string;
}

export interface PickingList {
  distance: number;
  pickingOrder: PickProduct[];
}
