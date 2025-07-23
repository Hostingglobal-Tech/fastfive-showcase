import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { createReview } from '~/models/review.server';
import { validateReviewInput } from '~/utils/validation.server';

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, { status: 405 });
  }

  const formData = await request.formData();
  
  const reviewData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string | null,
    rating: parseInt(formData.get('rating') as string),
    title: formData.get('title') as string | null,
    comment: formData.get('comment') as string,
  };

  // Validate input
  const validation = validateReviewInput(reviewData);
  if (!validation.isValid) {
    return json(
      { error: 'Invalid input', errors: validation.errors },
      { status: 400 }
    );
  }

  try {
    // Get client IP for spam prevention (hashed)
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown';
    const userAgent = request.headers.get('user-agent') || '';

    const review = await createReview({
      ...reviewData,
      ipHash: hashIP(clientIP),
      userAgent,
    });

    return json(
      { 
        success: true, 
        message: '후기가 등록되었습니다. 관리자 승인 후 게시됩니다.',
        reviewId: review.id 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating review:', error);
    return json(
      { error: '후기 등록 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
};

// Simple IP hashing for privacy
function hashIP(ip: string): string {
  if (ip === 'unknown') return ip;
  
  // In production, use a proper hashing library
  return Buffer.from(ip).toString('base64').substring(0, 16);
}