// src/Review.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  rating: number;
  description: string;
}

const ReviewSchema: Schema = new Schema({
  rating: { type: Number, required: true },
  description: { type: String, required: true },
});

const Review = mongoose.model<IReview>('Review', ReviewSchema);

export default Review;
