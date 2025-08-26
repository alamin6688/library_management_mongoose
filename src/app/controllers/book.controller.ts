import express, { Request, Response, NextFunction } from "express";
import { Book } from "../models/book.model";

export const libraryRoutes = express.Router();

// Create Book
libraryRoutes.post(
  "/books",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const book = await Book.create(body);
      res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get All Books (with filtering, sorting, limit)
libraryRoutes.get(
  "/books",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        filter,
        sortBy = "createdAt",
        sort = "desc",
        limit = 10,
      } = req.query;
      const query: any = {};
      if (filter) query.genre = filter;
      const books = await Book.find(query)
        .sort({ [sortBy as string]: sort === "asc" ? 1 : -1 })
        .limit(Number(limit));
      res.json({
        success: true,
        message: "Books retrieved successfully",
        data: books,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get Book by ID
libraryRoutes.get(
  "/books/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const book = await Book.findById(req.params.bookId);
      if (!book)
        return res
          .status(404)
          .json({ success: false, message: "Book not found", data: null });
      res.json({
        success: true,
        message: "Book retrieved successfully",
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Update Book
libraryRoutes.put(
  "/books/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
        new: true,
        runValidators: true,
      });
      if (!book)
        return res
          .status(404)
          .json({ success: false, message: "Book not found", data: null });
      await book.updateAvailability();
      res.json({
        success: true,
        message: "Book updated successfully",
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Delete Book
libraryRoutes.delete(
  "/books/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.bookId);
      if (!book)
        return res
          .status(404)
          .json({ success: false, message: "Book not found", data: null });
      res.json({
        success: true,
        message: "Book deleted successfully",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
);
