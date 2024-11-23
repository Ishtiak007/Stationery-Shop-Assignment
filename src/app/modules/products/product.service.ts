import { IStationaryProduct } from './product.interface';
import { StationeryProductModel } from './product.model';

// .........................................................
// Implement functionality for creating a product
const createStationeryProductIntoDB = async (product: IStationaryProduct) => {
  const result = await StationeryProductModel.create(product);
  return result;
};

// ..........................................................
// Implement search functionality for retrieving all products
const getAllProductsFromDB = async (searchTerm?: string) => {
  const filter = searchTerm
    ? {
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { brand: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } },
        ],
      }
    : {};

  const result = await StationeryProductModel.find(filter);
  return result;
};
// ...........................................................
// Add functionality to fetch a single product by ID
const getSingleProductFromDB = async (id: string) => {
  const result = await StationeryProductModel.findOne({ _id: id });
  return result;
};

export const stationeryProductServices = {
  createStationeryProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
};
