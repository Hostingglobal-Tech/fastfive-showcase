export interface FacilityImage {
  id: string;
  filename: string;
  title: string;
  description: string;
  category: 'lounge' | 'workspace' | 'amenity' | 'access';
  order: number;
}

export interface Review {
  id: string;
  name: string;
  email?: string | null;
  rating: number;
  title?: string | null;
  comment: string;
  approved: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'MODERATOR';
}

export interface ImageData {
  images: FacilityImage[];
}