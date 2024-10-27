import mongoose, { Document, Schema } from "mongoose";
import { IOrder } from "../domain/entities/IOrder";

export interface IOrderDocument extends IOrder, Document {}

const OrderSchema: Schema = new Schema({
  userId: {
      type: String,
      required: true,
  },
  transactionId: {
      type: String,
      required: true,
  },
  tutorId: {
      type: String,
      required: true,
  },
  courseId: {
      type: String,
      required: true,
  },
  category: {
      type: String,
      required: true,
  },
  title: {
      type: String,
      required: true,
  },
  thumbnail: {
      type: String,
      required: true,
  },
  discountPrice: {                            
      type: Number,  // Change to Number for consistency
      required: true,
  },
  price: {                            
      type: Number,  // Change to Number for consistency
      required: true,
  },
  adminShare: {
      type: Number,  // Change to Number for consistent calculations
      required: true,
  },
  tutorShare: {
      type: Number,  // Change to Number for consistent calculations
      required: true,
  },
  createdAt: {
      type: Date,
      default: Date.now,
  },
  paymentStatus: {
      type: Boolean,
      default: false,
  },
});


export const Order = mongoose.model<IOrderDocument>("Order",OrderSchema);