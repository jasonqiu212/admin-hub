# Appwrite Services

This directory contains all Appwrite-related service configuration and utilities.

## Structure

```
appwrite/
├── client.ts       # Appwrite client initialization
├── database.ts     # Database helper functions
├── index.ts        # Re-exports for clean imports
└── README.md       # This file
```

## Usage

### Authentication

Authentication is handled through the auth feature at `features/auth/services/appwriteAuth.ts`.

```typescript
import { useAuth } from '@/features/auth/hooks/useAuth';

// In your component
const { user, isAuthenticated, loginAction, logout } = useAuth();
```

### Database Operations

```typescript
import { listDocuments, createDocument, Query } from '@/services/appwrite';

// List documents with filters
const result = await listDocuments(
  'your-database-id',
  'your-collection-id',
  [
    Query.equal('status', 'active'),
    Query.limit(10),
    Query.orderDesc('$createdAt')
  ]
);

if (result.success) {
  console.log(result.data.documents);
}
```

### Direct Client Access

For advanced use cases, you can import the client or service instances directly:

```typescript
import { account, databases, client } from '@/services/appwrite';

// Use account methods
const session = await account.getSession('current');

// Use databases methods
const doc = await databases.getDocument('db-id', 'collection-id', 'doc-id');
```

## Environment Variables

Required environment variables in `.env`:

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_PROJECT_NAME=your_project_name
```

## Creating Collection-Specific Services

For better organization, create collection-specific service classes:

```typescript
// Example: services/purchaseOrders.ts
import { listDocuments, createDocument } from '@/services/appwrite';

const DATABASE_ID = 'your-database-id';
const COLLECTION_ID = 'purchase-orders';

export const PurchaseOrdersService = {
  async list() {
    return listDocuments(DATABASE_ID, COLLECTION_ID);
  },

  async create(data: any) {
    return createDocument(DATABASE_ID, COLLECTION_ID, data);
  },

  // Add more methods...
};
```
