# Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

## Firebase Configuration
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Razorpay Configuration (Test Mode)
```
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### Getting Firebase Credentials:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Enable Authentication (Email/Password and Google)
4. Create Firestore Database
5. Enable Storage
6. Go to Project Settings > General > Your apps > Web app
7. Copy the configuration values

### Getting Razorpay Credentials:
1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign up and create an account
3. Go to Settings > API Keys
4. Copy the Key ID and Key Secret (use Test Mode for development)
