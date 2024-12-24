import { uploadToS3, deleteFromS3 } from "../config/s3Config";
import { Request, Response } from "express";

export const uploadDocument = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const upload = uploadToS3.single("document");

    upload(req, res, async (err) => {
      if (err) {
        res
          .status(400)
          .json({ message: "Error uploading document", error: err });
        return;
      }

      const file = req.file as Express.MulterS3.File;
      res
        .status(200)
        .json({
          message: "Document uploaded successfully",
          url: file.location,
        });
    });
  } catch (error) {
    res.status(400).json({ message: "Error uploading document", error });
  }
};

export const deleteDocument = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { key } = req.body;
    await deleteFromS3(key);
    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting document", error });
  }
};
