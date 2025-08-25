# Firebase Chat Setup Instructions

## Prerequisites
1. Firebase project created
2. Firestore and Storage enabled

## Setup Steps

### 1. Firebase Console Configuration

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create new project or use existing

2. **Enable Required Services**
   - Enable Firestore Database
   - Enable Cloud Storage
   - Enable Authentication

3. **Get Configuration**
   - Go to Project Settings → General
   - Copy Web app configuration
   - Download service account key from Service Accounts tab

### 2. Environment Variables

Add these to your environment files:

**Client (.env.local):**
```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```
**Server (.env):**
```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
```

### 3. Service Account Setup

1. Place Firebase service account JSON in `/server/firebase-service-account.json`
2. Use the example file as reference: `/server/firebase-service-account.example.json`

### 4. Deploy Security Rules

**Firestore Rules** (copy from `/firestore.rules`):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /chatRooms/{bookingId} {
      allow read, write: if request.auth != null 
        && (request.auth.token.bookingId == bookingId)
        && (request.auth.token.role == 'USER' || request.auth.token.role == 'VETPARTNER')
        && request.auth.token.exp > request.time.seconds();
    }
    
    match /chatRooms/{bookingId}/messages/{messageId} {
      allow read, write: if request.auth != null 
        && (request.auth.token.bookingId == bookingId)
        && (request.auth.token.role == 'USER' || request.auth.token.role == 'VETPARTNER')
        && request.auth.token.exp > request.time.seconds();
    }
  }
}
```

**Storage Rules** (copy from `/storage.rules`):
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /chat-files/{bookingId}/{allPaths=**} {
      allow read, write: if request.auth != null 
        && (request.auth.token.bookingId == bookingId)
        && (request.auth.token.role == 'USER' || request.auth.token.role == 'VETPARTNER')
        && request.auth.token.exp > request.time.seconds()
        && resource.size < 10 * 1024 * 1024;
    }
  }
}
```

### 5. Initialize Firebase in Server

Add to your server startup file:

```javascript
import { initializeFirebase } from './src/config/firebase.js';
import chatCleanupService from './src/service/chat.cleanup.service.js';

// Initialize Firebase
initializeFirebase();

// Start chat cleanup service
chatCleanupService.startScheduledCleanup();
```

### 6. Test the Integration

1. Start a consultation session
2. Click the chat button during video call
3. Send messages and upload files
4. Verify cleanup after consultation ends

## Features Included

✅ **Real-time messaging** during consultations
✅ **File sharing** (images, documents, PDFs up to 10MB)
✅ **Session-based access** (only during active consultations)
✅ **Auto-cleanup** (2 hours after consultation ends)
✅ **Security rules** (role-based access control)
✅ **Mobile responsive** chat interface

## Security Features

- Custom Firebase tokens tied to booking IDs
- Role-based access (USER/VETPARTNER only)
- Session expiration (4 hours max)
- File size limits (10MB)
- Automatic data cleanup
- Secure storage paths

## File Structure

```
├── client/
│   ├── lib/firebase.js                 # Firebase client config
│   ├── components/chat/ChatRoom.jsx    # Chat component
│   └── app/.../call/[bookingId]/page.js # Integration point
├── server/
│   ├── src/config/firebase.js          # Firebase admin config
│   ├── src/controller/Chat/            # Chat endpoints
│   ├── src/service/chat.cleanup.service.js # Cleanup service
│   └── firebase-service-account.json   # Service account (add this)
├── firestore.rules                     # Database security rules
└── storage.rules                       # Storage security rules
```

## Troubleshooting

1. **Chat not loading**: Check Firebase token generation
2. **Files not uploading**: Verify storage rules and permissions
3. **Messages not syncing**: Check Firestore rules and network
4. **Cleanup not working**: Verify service account permissions