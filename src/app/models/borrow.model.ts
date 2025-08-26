import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { IBook } from "./book.model";

export interface IBorrow extends Document {
  book: Types.ObjectId | IBook;
  quantity: number;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const borrowSchema = new Schema<IBorrow>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Borrow: Model<IBorrow> = mongoose.model<IBorrow>(
  "Borrow",
  borrowSchema
);
