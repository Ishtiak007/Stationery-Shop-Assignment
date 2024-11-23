import { IStationaryProduct } from './product.interface';
import { StationeryProductModel } from './product.model';

// Implement functionality for creating a product
const createStationeryProductIntoDB = async (product: IStationaryProduct) => {
  const result = await StationeryProductModel.create(product);
  return result;
};

// Implement functionality to create and retrieve products from the database
export const stationeryProductServices = {
  createStationeryProductIntoDB,
};
