# FastFive Coworking Space Showcase - System Design

## 🎯 Project Overview

A Remix-based web application showcasing FastFive coworking space facilities with user review functionality.

### Core Features
- Image gallery showcasing facilities
- User reviews/testimonials system
- Responsive design for mobile/desktop
- Korean language support
- SEO optimized for local search

## 🏗️ System Architecture

### Technology Stack
- **Framework**: Remix (Full-stack React framework)
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (via Railway)
- **ORM**: Prisma
- **Image Storage**: Local files (potentially Cloudinary for production)
- **Deployment**: Railway
- **Authentication**: Simple cookie-based sessions

### Project Structure
```
fastfive/
├── app/
│   ├── routes/
│   │   ├── _index.tsx              # Homepage with gallery
│   │   ├── reviews.tsx             # Reviews listing
│   │   ├── api.reviews.tsx         # API endpoint for reviews
│   │   └── admin.tsx               # Admin panel (optional)
│   ├── components/
│   │   ├── Gallery.tsx             # Image gallery component
│   │   ├── ReviewCard.tsx          # Individual review display
│   │   ├── ReviewForm.tsx          # Review submission form
│   │   ├── ImageModal.tsx          # Full-size image viewer
│   │   └── Layout.tsx              # App layout wrapper
│   ├── models/
│   │   └── review.server.ts        # Review data models
│   ├── styles/
│   │   └── app.css                 # Global styles
│   └── utils/
│       ├── db.server.ts            # Database connection
│       └── images.server.ts        # Image data management
├── public/
│   └── images/                     # Processed images
├── prisma/
│   └── schema.prisma               # Database schema
└── package.json
```

## 💾 Database Schema

```prisma
model Review {
  id        String   @id @default(cuid())
  name      String
  email     String?
  rating    Int      @default(5)
  comment   String   @db.Text
  createdAt DateTime @default(now())
  approved  Boolean  @default(false)
  
  @@index([createdAt])
  @@index([approved])
}
```

## 🎨 UI/UX Design

### Layout Structure
```
┌─────────────────────────────────────┐
│          Header/Navigation          │
├─────────────────────────────────────┤
│                                     │
│       Hero Section with Logo        │
│                                     │
├─────────────────────────────────────┤
│                                     │
│      Image Gallery Grid (3x3)       │
│                                     │
├─────────────────────────────────────┤
│                                     │
│        Reviews Section              │
│      ┌─────────┬─────────┐         │
│      │ Review  │ Review  │         │
│      └─────────┴─────────┘         │
│                                     │
├─────────────────────────────────────┤
│         Review Form                 │
├─────────────────────────────────────┤
│           Footer                    │
└─────────────────────────────────────┘
```

### Component Specifications

#### Gallery Component
- Responsive grid (3 columns desktop, 1 column mobile)
- Click to open modal with full image
- Lazy loading for performance
- Image descriptions from filenames

#### Review System
- Star rating (1-5)
- Text review (max 500 chars)
- Name required, email optional
- Moderation queue (approved flag)
- Display only approved reviews

### Design Tokens
```css
:root {
  --primary: #0066CC;      /* FastFive Blue */
  --secondary: #FF6B35;    /* Accent Orange */
  --text-primary: #1A1A1A;
  --text-secondary: #666666;
  --bg-primary: #FFFFFF;
  --bg-secondary: #F8F9FA;
  --border: #E5E7EB;
}
```

## 🔄 Data Flow

### Image Data Structure
```typescript
interface FacilityImage {
  id: string;
  filename: string;
  title: string;
  description: string;
  category: 'lounge' | 'workspace' | 'amenity' | 'access';
  order: number;
}

// Example mapping
const imageData: FacilityImage[] = [
  {
    id: '1',
    filename: '11층라운지_신축이라_깨끗하고_인테리어가_깔끔하다.jpg',
    title: '11층 라운지',
    description: '신축 건물의 깨끗하고 모던한 인테리어',
    category: 'lounge',
    order: 1
  },
  // ... more images
];
```

### Review Flow
1. User submits review via form
2. Server validates and stores with `approved: false`
3. Admin reviews and approves
4. Approved reviews display on site

## 🚀 Deployment Strategy

### Railway Configuration
```toml
# railway.toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "npm run start"
healthcheckPath = "/"
healthcheckTimeout = 30

[environments.production]
NODE_ENV = "production"
```

### Environment Variables
```env
DATABASE_URL=postgresql://...
SESSION_SECRET=...
ADMIN_EMAIL=...
```

### Build Process
1. Install dependencies
2. Generate Prisma client
3. Build Remix app
4. Run database migrations
5. Start production server

## 🔐 Security Considerations

- CSRF protection via Remix
- Input sanitization for reviews
- Rate limiting on review submissions
- Admin authentication for moderation
- HTTPS enforced on Railway

## 📱 Responsive Design

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Mobile Optimizations
- Touch-friendly gallery
- Optimized image sizes
- Simplified navigation
- Full-width review cards

## 🌏 Internationalization

- Primary language: Korean
- Prepared for English support
- Date formatting: Korean locale
- Review moderation in Korean

## 📈 Performance Goals

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Lighthouse Score: > 90
- Image optimization: WebP format
- Lazy loading implementation

## 🔧 Development Workflow

1. Initialize Remix project
2. Set up Tailwind CSS
3. Configure Prisma and database
4. Implement image gallery
5. Add review system
6. Deploy to Railway
7. Test and optimize

This design provides a solid foundation for building a FastFive showcase site with user engagement features, optimized for Railway deployment.