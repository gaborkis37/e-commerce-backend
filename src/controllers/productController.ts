import { Request, Response } from "express";
import { Product, IProduct } from "../models/Product";

export const getProducts = async (req: Request, res: Response) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products: IProduct[];

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const newProduct: IProduct = new Product(req.body);

  try {
    res.status(201).json(await newProduct.save());
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct: IProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json("Product has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};
