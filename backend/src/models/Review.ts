import mongoose, { Schema, Document } from 'mongoose';

export interface IReviewDocument extends Document {
  listingId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  bookingId: mongoose.Types.ObjectId;
  rating: number;
  cleanliness: number;
  communication: number;
  checkIn: number;
  accuracy: number;
  location: number;
  value: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReviewDocument>(
  {
    listingId: {
      type: Schema.Types.ObjectId,
      ref: 'Listing',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    rating: {
      type: Number,
      required: [true, 'Overall rating is required'],
      min: 1,
      max: 5,
    },
    cleanliness: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    communication: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    checkIn: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    accuracy: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    location: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    value: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, 'Review comment is required'],
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure one review per booking
reviewSchema.index({ bookingId: 1 }, { unique: true });
reviewSchema.index({ listingId: 1 });

export default mongoose.model<IReviewDocument>('Review', reviewSchema);
