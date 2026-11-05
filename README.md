# KSHMMI - Vintage Botanical Perfume Website

A magical, handcrafted e-commerce experience for premium perfumes, designed to feel like exploring an illustrated vintage garden journal.

## 🌸 Project Vision

KSHMMI is not just a perfume website—it's an immersive experience. Visitors enter through an illustrated garden cover and discover fragrances as if browsing a lovingly handcrafted vintage botanical storybook.

## ✨ Features

### Customer Experience
- **Illustrated Garden Homepage**: Parallax scrolling with floating petals, butterflies, and magical particles
- **Product Catalogue**: Vintage-styled product cards with botanical frames and torn edges
- **Product Detail Pages**: Handwritten annotations, pressed flower effects, and elegant typography
- **Shopping Cart**: Paper-textured cart drawer with vintage styling
- **Wishlist**: Save favorite fragrances in a bookmark-style layout
- **User Authentication**: Firebase-based login/register with Google OAuth
- **User Account**: Order history, addresses, and profile management
- **Checkout Flow**: Multi-step checkout with Razorpay integration (test mode ready)
- **Contact Form**: Illustrated contact page with vintage aesthetics
- **About Page**: Brand story with botanical illustrations

### Technical Features
- **3D Elements**: Three.js/React Three Fiber for floating petals, butterflies, and magical particles
- **Animations**: CSS animations for gentle floating effects and parallax scrolling
- **State Management**: Zustand for cart and wishlist persistence
- **Authentication**: Firebase Authentication (Email/Password + Google OAuth)
- **Database**: Firestore (ready for product, order, and user data)
- **Storage**: Firebase Storage for product images
- **Payments**: Razorpay integration (India, test mode architecture ready)
- **Responsive Design**: Mobile-first approach for all screen sizes

## 🎨 Design System

### Color Palette
- Pastel Pink: `#FFE4E1`
- Lavender: `#E6E6FA`
- Warm Ivory: `#FFFFF0`
- Cream: `#FFFDD0`
- Antique White: `#FAEBD7`
- Sage Green: `#8FBC8F`
- Dusty Rose: `#D8A7A7`
- Mauve: `#E0B0FF`
- Gold: `#D4AF37`
- Brown: `#8B4513`

### Typography
- Display: Playfair Display
- Body: Cormorant Garamond
- Handwritten: Great Vibes
- Labels: Crimson Text

### Visual Elements
- Paper textures with vintage overlays
- Torn edge effects
- Pressed flower decorations
- Handwritten annotations
- Vintage stamps
- Botanical frames
- Asymmetrical layouts

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
cd C:\KSHMMI
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Razorpay Configuration (Test Mode)
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
KSHMMI/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/              # About page
│   │   ├── account/            # User account dashboard
│   │   ├── auth/               # Authentication pages
│   │   │   ├── login/          # Login page
│   │   │   └── register/       # Registration page
│   │   ├── cart/               # Shopping cart
│   │   ├── checkout/           # Checkout flow
│   │   │   └── success/        # Order confirmation
│   │   ├── contact/            # Contact form
│   │   ├── product/            # Product detail pages
│   │   │   └── [id]/           # Dynamic product pages
│   │   ├── shop/               # Product catalogue
│   │   ├── wishlist/           # Wishlist page
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Homepage
│   ├── components/
│   │   ├── 3d/                 # Three.js components
│   │   │   ├── Butterflies.tsx
│   │   │   ├── FloatingPetals.tsx
│   │   │   ├── GardenScene.tsx
│   │   │   └── MagicalParticles.tsx
│   │   ├── animations/         # CSS animations
│   │   ├── forms/              # Form components
│   │   ├── layout/             # Layout components
│   │   │   ├── Footer.tsx
│   │   │   └── Header.tsx
│   │   └── ui/                 # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── Input.tsx
│   ├── hooks/
│   │   └── useAuth.ts          # Authentication hook
│   ├── lib/
│   │   ├── firebase.ts         # Firebase configuration
│   │   └── mockData.ts         # Mock product data
│   ├── store/
│   │   ├── cartStore.ts        # Cart state management
│   │   └── wishlistStore.ts    # Wishlist state management
│   ├── styles/
│   │   └── globals.css         # Global styles and design system
│   └── types/
│       └── index.ts            # TypeScript type definitions
├── public/
│   ├── images/                 # Static images
│   └── textures/               # Paper textures
├── ENV_SETUP.md               # Environment setup guide
└── package.json
```

## 🔧 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication:
   - Email/Password sign-in method
   - Google sign-in method
4. Create Firestore Database
5. Enable Storage
6. Go to Project Settings > General > Your apps > Web app
7. Copy the configuration values to your `.env.local` file

## 💳 Razorpay Setup

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign up and create an account
3. Go to Settings > API Keys
4. Copy the Key ID and Key Secret (use Test Mode for development)
5. Add to your `.env.local` file

**Note**: Live payments will require merchant approval and production credentials.

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Key Components

### 3D Garden Scene
- FloatingPetals: Animated flower petals with gentle movement
- Butterflies: Flapping butterflies with flight patterns
- MagicalParticles: Glowing particles for ambiance
- GardenScene: Combined 3D scene for homepage

### UI Components
- Button: Vintage-styled buttons with flower accents
- Card: Paper-textured cards with botanical frames
- Input: Vintage-styled form inputs

### State Management
- cartStore: Shopping cart with persistence
- wishlistStore: Wishlist with persistence

## 📱 Responsive Design

The website is fully responsive with breakpoints for:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎨 Customization

### Adding New Products
Edit `src/lib/mockData.ts` to add products:

```typescript
{
  id: 'unique-id',
  name: 'Product Name',
  description: 'Product description',
  shortDescription: 'Short description',
  price: 2499,
  compareAtPrice: 2999,
  category: 'floral',
  images: ['/images/product.jpg'],
  thumbnail: '/images/product-thumb.jpg',
  variants: [...],
  stock: 100,
  featured: true,
  tags: [...],
  notes: [...],
  createdAt: new Date(),
  updatedAt: new Date(),
}
```

### Customizing Colors
Edit `src/styles/globals.css` CSS variables:

```css
:root {
  --color-pastel-pink: #FFE4E1;
  --color-lavender: #E6E6FA;
  /* ... more colors */
}
```

## 🔐 Security Notes

- Never commit `.env.local` to version control
- Use Firebase Security Rules for database access
- Implement server-side payment verification for Razorpay
- Enable HTTPS in production
- Use environment variables for all sensitive data

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Firebase Hosting
```bash
npm run build
firebase deploy
```

## 📝 Future Enhancements

- Admin dashboard for product/order management
- Real-time order tracking
- Email notifications
- Advanced search and filtering
- Product reviews and ratings
- Gift card functionality
- Subscription boxes
- Multi-language support

## 🤝 Contributing

This is a proprietary project. For contributions, please contact the development team.

## 📄 License

Proprietary - All rights reserved to KSHMMI

## 🌟 Acknowledgments

- Design inspired by vintage botanical illustrations and scrapbook aesthetics
- Built with Next.js, React Three Fiber, Firebase, and Razorpay
- Fonts from Google Fonts: Playfair Display, Cormorant Garamond, Great Vibes, Crimson Text

---

Made with ❤️ and 🌸 for KSHMMI
