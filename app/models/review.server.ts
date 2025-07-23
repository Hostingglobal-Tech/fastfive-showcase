import { prisma } from '~/utils/db.server';
import type { Review } from '@prisma/client';

export async function getApprovedReviews() {
  const reviews = await prisma.review.findMany({
    where: {
      approved: true,
      featured: false,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 9, // Show latest 9 regular reviews
  });

  const featuredReviews = await prisma.review.findMany({
    where: {
      approved: true,
      featured: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 2, // Show 2 featured reviews
  });

  return { reviews, featuredReviews };
}

export async function createReview(data: {
  name: string;
  email?: string | null;
  rating: number;
  title?: string | null;
  comment: string;
  ipHash?: string;
  userAgent?: string;
}): Promise<Review> {
  return await prisma.review.create({
    data: {
      name: data.name,
      email: data.email,
      rating: data.rating,
      title: data.title,
      comment: data.comment,
      ipHash: data.ipHash,
      userAgent: data.userAgent,
      approved: false, // Requires admin approval
      featured: false,
    },
  });
}

export async function getPendingReviews() {
  return await prisma.review.findMany({
    where: {
      approved: false,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function approveReview(reviewId: string, featured = false) {
  return await prisma.review.update({
    where: { id: reviewId },
    data: {
      approved: true,
      featured,
    },
  });
}

export async function deleteReview(reviewId: string) {
  return await prisma.review.delete({
    where: { id: reviewId },
  });
}