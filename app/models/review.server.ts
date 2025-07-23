import mongoose, { Schema, Document } from 'mongoose';
import dbConnect from '~/utils/db.server';

export interface Review extends Document {
  _id: string;
  id: string;
  name: string;
  email?: string | null;
  rating: number;
  title?: string | null;
  comment: string;
  ipHash: string;
  userAgent: string;
  status: 'pending' | 'approved' | 'rejected';
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<Review>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, default: null, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, default: null, trim: true },
    comment: { type: String, required: true, trim: true },
    ipHash: { type: String, required: true },
    userAgent: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['pending', 'approved', 'rejected'], 
      default: 'pending' 
    },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

// Create indexes for performance
reviewSchema.index({ status: 1, createdAt: -1 });
reviewSchema.index({ featured: 1, status: 1 });

const ReviewModel = mongoose.models.Review || mongoose.model<Review>('Review', reviewSchema);

export async function createReview(data: {
  name: string;
  email?: string | null;
  rating: number;
  title?: string | null;
  comment: string;
  ipHash: string;
  userAgent: string;
}) {
  await dbConnect();
  
  const review = new ReviewModel(data);
  await review.save();
  
  return review.toJSON();
}

export async function getApprovedReviews() {
  await dbConnect();
  
  const reviews = await ReviewModel
    .find({ status: 'approved' })
    .sort({ createdAt: -1 })
    .lean();
  
  const featuredReviews = await ReviewModel
    .find({ status: 'approved', featured: true })
    .sort({ createdAt: -1 })
    .limit(6)
    .lean();
  
  return {
    reviews: reviews.map(review => ({
      ...review,
      id: review._id.toString(),
      _id: undefined
    })),
    featuredReviews: featuredReviews.map(review => ({
      ...review,
      id: review._id.toString(),
      _id: undefined
    }))
  };
}

export async function getPendingReviews() {
  await dbConnect();
  
  const reviews = await ReviewModel
    .find({ status: 'pending' })
    .sort({ createdAt: -1 })
    .lean();
  
  return reviews.map(review => ({
    ...review,
    id: review._id.toString(),
    _id: undefined
  }));
}

export async function updateReviewStatus(
  id: string, 
  status: 'approved' | 'rejected', 
  featured: boolean = false
) {
  await dbConnect();
  
  const review = await ReviewModel.findByIdAndUpdate(
    id,
    { status, featured },
    { new: true }
  ).lean();
  
  if (!review) {
    throw new Error('Review not found');
  }
  
  return {
    ...review,
    id: review._id.toString(),
    _id: undefined
  };
}

export async function deleteReview(id: string) {
  await dbConnect();
  
  const review = await ReviewModel.findByIdAndDelete(id).lean();
  
  if (!review) {
    throw new Error('Review not found');
  }
  
  return {
    ...review,
    id: review._id.toString(),
    _id: undefined
  };
}