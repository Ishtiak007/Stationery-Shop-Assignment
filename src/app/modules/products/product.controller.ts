/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { stationeryProductServices } from './product.service';
import productValidationWithZod from './product.validationWithZod';

// Implement functionality for creating a product
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    // Add schema validation for products using Zod
    const dataValidationZod = productValidationWithZod.parse(productData);

    const result =
      await stationeryProductServices.createStationeryProductIntoDB(
        dataValidationZod,
      );
    res.status(201).json({
      message: 'Product created successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Product created failed!',
      success: false,
      errors: {
        name: error.name,
        errors: error.errors,
      },
      stack: error.stack,
    });
  }
};

export const ProductControllers = {
  createProduct,
};
