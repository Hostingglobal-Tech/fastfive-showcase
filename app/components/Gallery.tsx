import { useState } from 'react';
import type { FacilityImage } from '~/types';
import ImageModal from './ImageModal';

interface GalleryProps {
  images: FacilityImage[];
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<FacilityImage | null>(null);

  return (
    <>
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          FastFive 남부터미널 시설 안내
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={`/images/${image.filename}`}
                alt={image.title}
                loading="lazy"
                className="w-full h-64 object-cover"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-lg">
                    {image.title}
                  </h3>
                  <p className="text-white/90 text-sm mt-1">
                    {image.description}
                  </p>
                </div>
              </div>
              
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md">
                <span className="text-xs font-medium text-gray-700">
                  {getCategoryLabel(image.category)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    lounge: '라운지',
    workspace: '업무공간',
    amenity: '편의시설',
    access: '오시는 길'
  };
  return labels[category] || category;
}