import { Request, Response } from "express";
import Product from "../models/Product";
import { IProduct } from "../utils/interface";
import dotenv from "dotenv";
import { uploadToS3, deleteFromS3 } from "../config/s3Config";

dotenv.config();

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const upload = uploadToS3.array("images", 5); // Allow up to 5 images

    upload(req, res, async (err) => {
      if (err) {
        res.status(400).json({ message: "Error uploading images", error: err });
        return;
      }

      const files = req.files as Express.MulterS3.File[];
      const imageUrls = files.map((file) => file.location);

      const productData = {
        ...req.body,
        imageUrls,
      };

      const product: IProduct = new Product(productData);
      await product.save();
      res.status(201).json(product);
    });
  } catch (error) {
    res.status(400).json({ message: "Error creating product", error });
  }
};

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products: IProduct[] = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: "Error fetching products", error });
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product: IProduct | null = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: "Error fetching product", error });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const upload = uploadToS3.array("images", 5);

    upload(req, res, async (err) => {
      if (err) {
        res.status(400).json({ message: "Error uploading images", error: err });
        return;
      }

      const files = req.files as Express.MulterS3.File[];
      const newImageUrls = files.map((file) => file.location);

      const product: IProduct | null = await Product.findById(req.params.id);
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      // Delete old images from S3
      for (const url of product.imageUrls) {
        const key = url.split("/").slice(-2).join("/"); // Extract the key from the URL
        await deleteFromS3(key);
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { ...req.body, imageUrls: newImageUrls },
        { new: true }
      );

      res.status(200).json(updatedProduct);
    });
  } catch (error) {
    res.status(400).json({ message: "Error updating product", error });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product: IProduct | null = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    // Delete images from S3
    for (const url of product.imageUrls) {
      const key = url.split("/").slice(-2).join("/");
      await deleteFromS3(key);
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting product", error });
  }
};
