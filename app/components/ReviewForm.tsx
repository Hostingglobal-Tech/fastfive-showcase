import { Form } from '@remix-run/react';
import { useState } from 'react';

export default function ReviewForm() {
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-8">
          FastFive 이용 후기를 남겨주세요
        </h2>
        
        <Form method="post" action="/api/reviews" className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="홍길동"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              이메일 (선택사항)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@email.com"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              평점 <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none"
                >
                  <svg
                    className={`w-8 h-8 ${
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    } transition-colors`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
              <input type="hidden" name="rating" value={rating} />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              제목 (선택사항)
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="한 줄 요약"
              maxLength={200}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              후기 내용 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="comment"
              name="comment"
              required
              rows={4}
              maxLength={500}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="FastFive 이용 경험을 자유롭게 작성해주세요"
            />
            <p className="text-sm text-gray-500 mt-1">최대 500자</p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            후기 등록하기
          </button>
        </Form>
      </div>
    </section>
  );
}