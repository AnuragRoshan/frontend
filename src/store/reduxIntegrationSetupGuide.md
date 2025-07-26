# Redux Integration Setup Guide

## 📦 Installation

First, install the required dependencies:

```bash
npm install @reduxjs/toolkit react-redux react-hook-form @hookform/resolvers zod react-hot-toast
```

## 📁 File Structure

Create the following files in your project:

```
src/
├── store/
│   ├── store.ts                    # Redux store configuration
│   ├── hooks.ts                    # Typed Redux hooks
│   ├── api/
│   │   └── authApi.ts             # RTK Query API slice
│   └── slices/
│       └── authSlice.ts           # Auth state slice
├── providers/
│   └── ReduxProvider.tsx          # Redux Provider wrapper
├── components/
│   └── auth/
│       ├── SignUpInfluencer.tsx   # Updated signup component
│       └── ProtectedRoute.tsx     # Route protection component
└── App.tsx                        # Updated with Redux integration
```

## 🔧 Backend API Requirements

Ensure your backend has the following endpoint structure:

### Registration Endpoint

```typescript
POST /api/auth/register
Content-Type: application/json

// Request Body
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "userType": "influencer" | "brand",
  "username": "string" (optional),
  "socialAccount": {
    "platform": "instagram" | "youtube" | "tiktok" | "twitter",
    "handle": "string"
  } (optional),
  "termsAccepted": boolean
}

// Response Format
{
  "success": boolean,
  "message": "string",
  "data": {
    "user": {
      "userId": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      "userType": "INFLUENCERinf" | "BRAND" | "ADMIN",
      "isVerified": boolean,
      "userStatus": "ACTIVE" | "INACTIVE" | "SUSPENDED" | "PENDING_VERIFICATION",
      "createdAt": "string",
      "updatedAt": "string"
    },
    "tokens": {
      "accessToken": "string",
      "refreshToken": "string",
      "tokenType": "Bearer",
      "expiresIn": "string",
      "sessionId": "string"
    },
    "requiresVerification": boolean
  },
  "timestamp": "string",
  "requestId": "string"
}
```

## 🚀 Setup Steps

### 1. Create Store Files

Copy the provided store files:

- `src/store/store.ts`
- `src/store/hooks.ts`
- `src/store/api/authApi.ts`
- `src/store/slices/authSlice.ts`

### 2. Create Provider

Create `src/providers/ReduxProvider.tsx` with the provided code.

### 3. Update App.tsx

Replace your existing App.tsx with the updated version that includes Redux integration.

### 4. Update SignUpInfluencer Component

Replace the existing SignUpInfluencer component with the new Redux-integrated version.

### 5. Update Package.json

Update your package.json with the new dependencies.

## 🔒 Environment Variables

Make sure your backend has these environment variables set:

```env
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
NODE_ENV=development
```

## 🧪 Testing the Integration

### 1. Start Your Backend Server

Make sure your backend server is running and the registration endpoint is accessible.

### 2. Test Registration Flow

1. Navigate to `/signup`
2. Fill out the registration form
3. Submit the form
4. Verify the API call is made correctly
5. Check that success/error handling works

### 3. Verify State Management

1. Open Redux DevTools in browser
2. Monitor state changes during registration
3. Verify localStorage is updated correctly

## 🐛 Common Issues & Solutions

### Issue: CORS Errors

**Solution**: Ensure your backend allows requests from your frontend origin:

```javascript
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true,
  })
);
```

### Issue: 401/403 Errors

**Solution**: Check that your backend auth controller matches the expected request format.

### Issue: TypeScript Errors

**Solution**: Ensure all interfaces match between frontend and backend.

### Issue: Redux State Not Persisting

**Solution**: Check browser localStorage and ensure no errors in localStorage access.

## 📝 Key Features Implemented

### ✅ Form Validation

- Real-time validation with Zod schema
- Password strength requirements
- Email format validation
- Terms acceptance requirement

### ✅ Redux State Management

- Centralized auth state
- Automatic token management
- Error handling
- Loading states

### ✅ RTK Query Integration

- Automatic API calls
- Caching and optimization
- Error handling
- Type safety

### ✅ User Experience

- Loading indicators
- Toast notifications
- Error messages
- Responsive design

### ✅ Security Features

- Password visibility toggle
- Secure token storage
- Input sanitization
- CSRF protection ready

## 🔄 Next Steps

After successful integration, you can:

1. **Add Login Component**: Create a similar Redux-integrated login component
2. **Implement Protected Routes**: Use the ProtectedRoute component for secured pages
3. **Add Token Refresh**: Implement automatic token refresh logic
4. **Email Verification**: Add email verification flow
5. **Social Login**: Integrate OAuth providers

## 📚 Additional Resources

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [RTK Query Guide](https://redux-toolkit.js.org/rtk-query/overview)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)

## 🆘 Support

If you encounter any issues:

1. Check the browser console for errors
2. Verify network requests in DevTools
3. Check Redux DevTools for state changes
4. Ensure backend API matches expected format
