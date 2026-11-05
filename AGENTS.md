# KSHMMI Project Guide

## Project Overview
KSHMMI is a vintage botanical perfume e-commerce website built with Next.js 14, featuring a magical garden aesthetic with 3D elements, Firebase integration, and Razorpay payment processing.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules (no Tailwind - custom vintage design)
- **3D Graphics**: Three.js + React Three Fiber
- **Animations**: CSS animations + Framer Motion
- **State Management**: Zustand
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Payments**: Razorpay (India, test mode ready)
- **Fonts**: Google Fonts (Playfair Display, Cormorant Garamond, Great Vibes, Crimson Text)

## Design Philosophy
- Vintage botanical aesthetic with pastel colors (pink, lavender, ivory)
- Handcrafted scrapbook feel with paper textures, torn edges, pressed flowers
- Handwritten annotations and vintage stamps
- Asymmetrical layouts and artistic compositions
- Subtle 3D animations (floating petals, butterflies, magical particles)
- Mobile-first responsive design

## Key Features Implemented
✅ Illustrated garden homepage with parallax scrolling
✅ Product catalogue with vintage styling
✅ Product detail pages with botanical frames
✅ Shopping cart with Zustand persistence
✅ Wishlist functionality
✅ Firebase authentication (Email/Password + Google OAuth)
✅ User account dashboard
✅ Checkout flow (Razorpay architecture ready)
✅ Contact form
✅ About page with brand story
✅ 3D garden scene with floating elements
✅ Responsive design for all devices

## Development Commands
```bash
npm run dev      # Start development server on localhost:3000
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Environment Setup
Create `.env.local` file with:
- Firebase credentials (API key, auth domain, project ID, etc.)
- Razorpay credentials (test mode)

See `ENV_SETUP.md` for detailed setup instructions.

## File Structure Highlights
- `src/app/` - Next.js pages (App Router)
- `src/components/` - React components (UI, 3D, layout, forms)
- `src/lib/` - Utilities (Firebase config, mock data)
- `src/store/` - Zustand stores (cart, wishlist)
- `src/hooks/` - Custom React hooks (useAuth)
- `src/styles/` - Global CSS and design system
- `src/types/` - TypeScript type definitions

## Important Notes
- No Tailwind CSS - custom CSS Modules for complete creative freedom
- 3D elements are lightweight and optimized for performance
- Firebase is configured but requires credentials in `.env.local`
- Razorpay integration is architecturally ready but requires merchant credentials
- All images are placeholders - replace with actual product photography
- Paper textures can be added to `public/textures/` for enhanced vintage effect

## Testing the Application
1. Ensure dependencies are installed: `npm install`
2. Set up environment variables in `.env.local`
3. Run dev server: `npm run dev`
4. Open http://localhost:3000
5. Test navigation between pages
6. Test cart and wishlist functionality
7. Test authentication (requires Firebase setup)
8. Test checkout flow (currently simulated)

## Firebase Setup Required
To enable authentication and database features:
1. Create Firebase project at console.firebase.google.com
2. Enable Authentication (Email/Password + Google)
3. Create Firestore Database
4. Enable Storage
5. Copy configuration to `.env.local`

## Razorpay Setup Required
To enable payments:
1. Create Razorpay account at dashboard.razorpay.com
2. Get API keys (test mode)
3. Add to `.env.local`
4. Implement actual payment integration in checkout page

## Performance Optimization
- Next.js Image component for images
- Code splitting via dynamic imports
- 3D elements use Suspense for lazy loading
- CSS animations are GPU-accelerated where possible
- Zustand stores use localStorage persistence

## Secret Garden Game
An interactive storybook adventure game integrated at `/secret-garden` route.

**Game Features:**
- Illustrated introduction screen with antique garden gate
- Interactive garden map with 5 locations
- Rose Path: Collect discoverable roses with poetic descriptions
- Butterfly Meadow: Find hidden butterflies with unique stories
- Forgotten Corner: Discover objects and solve a puzzle
- Little Cottage: Read secret letters from the mailbox
- Wishing Well: Make private wishes stored locally
- Garden Journal: Track all discoveries and achievements

**Game State:**
- Managed via Zustand store (`src/store/gameStore.ts`)
- Persists to localStorage
- Tracks flowers, butterflies, objects, letters, wishes
- Puzzle completion status saved

**Access:**
- Added "Secret Garden" link to header navigation
- Enter through `/secret-garden` route
- Navigate between locations via garden map
- Garden journal accessible from any location

**Design:**
- Matches KSHMMI vintage botanical aesthetic
- Uses existing color palette and fonts
- Paper textures and vintage borders
- Subtle animations (not excessive)
- Responsive for mobile and desktop

## Future Enhancements
- Admin dashboard for product/order management
- Real-time order tracking
- Email notifications (Firebase Cloud Functions)
- Product reviews and ratings
- Advanced search with filters
- Gift card functionality
- Multi-language support

## Deployment
Recommended: Vercel (easy Next.js deployment)
Alternative: Firebase Hosting

## Contact
For questions or issues, refer to the project README or contact the development team.
