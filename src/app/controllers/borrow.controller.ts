import express, { Request, Response, NextFunction } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";
import { libraryRoutes as bookRoutes } from "./book.controller";

// Main router to combine book and borrow routes
export const libraryRoutes = express.Router();
libraryRoutes.use(bookRoutes);

// Borrow a Book
libraryRoutes.post(
  "/borrow",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { book: bookId, quantity, dueDate } = req.body;
      const book = await Book.findById(bookId);
      if (!book)
        return res
          .status(404)
          .json({ success: false, message: "Book not found", data: null });
      if (book.copies < quantity) {
        return res.status(400).json({
          success: false,
          message: "Not enough copies available",
          data: null,
        });
      }
      book.copies -= quantity;
      await book.updateAvailability();
      await book.save();
      const borrow = await Borrow.create({ book: bookId, quantity, dueDate });
      res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrow,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Borrowed Books Summary (Aggregation)
libraryRoutes.get(
  "/borrow",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const summary = await Borrow.aggregate([
        {
          $group: {
            _id: "$book",
            totalQuantity: { $sum: "$quantity" },
          },
        },
        {
          $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "_id",
            as: "bookInfo",
          },
        },
        { $unwind: "$bookInfo" },
        {
          $project: {
            book: {
              title: "$bookInfo.title",
              isbn: "$bookInfo.isbn",
            },
            totalQuantity: 1,
          },
        },
      ]);
      res.json({
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data: summary,
      });
    } catch (error) {
      next(error);
    }
  }
);
