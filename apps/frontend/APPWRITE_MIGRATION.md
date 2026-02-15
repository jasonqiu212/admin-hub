# Appwrite Migration Guide

This document outlines the migration from custom JWT backend authentication to Appwrite.

## What Changed

### 1. Authentication Flow

**Before (Custom JWT Backend):**
- Login called backend API at `/api/auth/login`
- Tokens stored in localStorage
- Manual token refresh required
- JWT decoding for user data

**After (Appwrite):**
- Login uses Appwrite Account service
- Sessions managed via HTTP-only cookies
- Automatic session management
- User data from Appwrite Account API

### 2. File Changes

#### New Files
- `src/services/appwrite/client.ts` - Appwrite client initialization
- `src/services/appwrite/database.ts` - Database helper functions
- `src/services/appwrite/index.ts` - Service re-exports
- `src/features/auth/services/appwriteAuth.ts` - Appwrite auth service

#### Modified Files
- `src/features/auth/types/index.ts` - Updated to use Appwrite User type
- `src/features/auth/context/AuthContext.tsx` - Simplified to use Appwrite sessions
- `src/features/auth/hooks/useAuth.ts` - Removed refreshAccessToken method
- `src/components/DashboardLayout/Header.tsx` - Uses real user data from Appwrite
- `vite.config.ts` - Removed backend API proxy (can be re-enabled if needed)
- `.env.example` - Updated with Appwrite configuration

#### Deprecated Files
- `src/features/auth/services/authApi.ts` - Old backend auth API (can be removed)
- `src/features/auth/utils/jwt.ts` - JWT utilities (no longer needed)

### 3. Type Changes

**Before:**
```typescript
interface User {
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
```

**After:**
```typescript
import { Models } from 'appwrite';

type User = Models.User<Models.Preferences>;

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
```

### 4. API Changes

#### useAuth Hook

**Removed:**
- `refreshAccessToken()` - No longer needed

**Changed:**
- `logout()` - Now returns Promise<void> instead of void

**Unchanged:**
- `user`
- `isAuthenticated`
- `isLoading`
- `loginAction(credentials)`

## Setup Steps

### 1. Appwrite Project Setup

1. Create an account at [Appwrite Cloud](https://cloud.appwrite.io)
2. Create a new project
3. Note your Project ID and API Endpoint
4. Set up authentication:
   - Go to Auth settings
   - Enable Email/Password authentication
   - Configure your app domain in the allowed origins

### 2. Environment Configuration

Update your `.env` file with your Appwrite credentials:

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id_here
VITE_APPWRITE_PROJECT_NAME=five-star-console
```

### 3. Create Users

Since you're migrating from a custom backend, you'll need to:

1. **Option A: Manual Creation**
   - Use Appwrite Console to create users manually
   - Go to Auth → Users → Create User

2. **Option B: Registration Flow**
   - Add a registration page to your app
   - Use `account.create()` to register users

3. **Option C: Migration Script**
   - Export users from your backend
   - Use Appwrite Server SDK to bulk import users

### 4. Database Setup (Optional)

If you plan to use Appwrite Database:

1. Create a database in Appwrite Console
2. Create collections for your data
3. Set up appropriate permissions
4. Update your code to use the database service

Example:
```typescript
import { listDocuments, Query } from '@/services/appwrite';

const DATABASE_ID = 'your-database-id';
const COLLECTION_ID = 'purchase-orders';

const result = await listDocuments(DATABASE_ID, COLLECTION_ID, [
  Query.equal('status', 'active'),
  Query.limit(10)
]);
```

## Testing

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Test login flow:**
   - Navigate to `/login`
   - Enter valid credentials
   - Verify redirect to dashboard
   - Check that user info appears in header

3. **Test protected routes:**
   - Try accessing protected routes without auth
   - Should redirect to `/login`

4. **Test logout:**
   - Click logout in user menu
   - Should redirect to login page
   - Session should be cleared

## Troubleshooting

### CORS Errors
- Add your app URL to allowed origins in Appwrite Console
- For local development: `http://localhost:8080`

### "Missing environment variables" Error
- Check `.env` file exists and has correct values
- Restart dev server after changing `.env`

### Login Not Working
- Verify Appwrite project ID is correct
- Check that Email/Password auth is enabled
- Ensure user exists in Appwrite Console

### Session Not Persisting
- Check browser cookies are enabled
- Verify Appwrite endpoint is accessible
- Check for CORS issues in browser console

## Cleanup (Optional)

After verifying everything works, you can:

1. Remove old auth files:
   ```bash
   rm apps/frontend/src/features/auth/services/authApi.ts
   rm apps/frontend/src/features/auth/utils/jwt.ts
   ```

2. Remove JWT dependencies:
   ```bash
   npm uninstall jwt-decode
   ```

3. Clean up backend:
   - Remove `/api/auth/*` endpoints from backend (if no longer needed)
   - Remove JWT-related dependencies from backend

## Next Steps

1. **Add Registration:** Create a signup page using `account.create()`
2. **Password Reset:** Implement forgot password flow
3. **Email Verification:** Enable email verification in Appwrite
4. **Database Integration:** Start using Appwrite Database for your collections
5. **File Storage:** Use Appwrite Storage for file uploads
6. **Real-time:** Implement real-time subscriptions for live updates

## References

- [Appwrite Docs](https://appwrite.io/docs)
- [Appwrite Auth Guide](https://appwrite.io/docs/products/auth)
- [Appwrite Database Guide](https://appwrite.io/docs/products/databases)
