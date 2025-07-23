import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import Gallery from '~/components/Gallery';
import ReviewCard from '~/components/ReviewCard';
import ReviewForm from '~/components/ReviewForm';
import { getImageData } from '~/utils/images.server';
import { getApprovedReviews } from '~/models/review.server';
import type { FacilityImage, Review } from '~/types';

export const meta: MetaFunction = () => {
  return [
    { title: 'FastFive 남부터미널 - 프리미엄 공유 오피스' },
    { 
      name: 'description', 
      content: 'FastFive 남부터미널점 - 깨끗하고 모던한 인테리어의 프리미엄 공유 오피스. 11층 라운지, 최신 시설, 편리한 교통.' 
    },
    { property: 'og:title', content: 'FastFive 남부터미널 - 프리미엄 공유 오피스' },
    { property: 'og:description', content: '남부터미널역 도보 10분, 최신 시설의 프리미엄 공유 오피스' },
    { property: 'og:type', content: 'website' },
  ];
};

type LoaderData = {
  images: FacilityImage[];
  reviews: Review[];
  featuredReviews: Review[];
};

export const loader: LoaderFunction = async () => {
  const images = await getImageData();
  const { reviews, featuredReviews } = await getApprovedReviews();
  
  return json<LoaderData>({ 
    images, 
    reviews,
    featuredReviews 
  });
};

export default function Index() {
  const { images, reviews, featuredReviews } = useLoaderData<LoaderData>();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            FastFive 남부터미널
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            프리미엄 공유 오피스 공간
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
            <span className="bg-white/20 px-4 py-2 rounded-full">
              📍 남부터미널역 도보 10분
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full">
              🏢 11층 라운지
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full">
              ☕ 최신 편의시설
            </span>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <Gallery images={images} />

      {/* Featured Reviews */}
      {featuredReviews.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            추천 이용 후기
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {featuredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>
      )}

      {/* All Reviews */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          이용 후기
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>

      {/* Review Form */}
      <ReviewForm />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 FastFive. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}