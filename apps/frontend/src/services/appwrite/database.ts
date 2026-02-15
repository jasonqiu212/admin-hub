import { databases } from './client';
import { ID, Models, Query } from 'appwrite';

/**
 * Generic response wrapper for database operations
 */
export interface DatabaseResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * List documents from a collection
 * @param databaseId - The database ID
 * @param collectionId - The collection ID
 * @param queries - Optional query filters
 * @returns List of documents
 */
export const listDocuments = async <T extends Models.Document>(
  databaseId: string,
  collectionId: string,
  queries: string[] = []
): Promise<DatabaseResponse<Models.DocumentList<T>>> => {
  try {
    const response = await databases.listDocuments<T>(databaseId, collectionId, queries);
    return {
      success: true,
      data: response,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to list documents',
    };
  }
};

/**
 * Get a single document by ID
 * @param databaseId - The database ID
 * @param collectionId - The collection ID
 * @param documentId - The document ID
 * @returns The document
 */
export const getDocument = async <T extends Models.Document>(
  databaseId: string,
  collectionId: string,
  documentId: string
): Promise<DatabaseResponse<T>> => {
  try {
    const response = await databases.getDocument<T>(databaseId, collectionId, documentId);
    return {
      success: true,
      data: response,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to get document',
    };
  }
};

/**
 * Create a new document
 * @param databaseId - The database ID
 * @param collectionId - The collection ID
 * @param data - The document data
 * @param documentId - Optional document ID (auto-generated if not provided)
 * @returns The created document
 */
export const createDocument = async <T extends Models.Document>(
  databaseId: string,
  collectionId: string,
  data: Omit<T, keyof Models.Document>,
  documentId?: string
): Promise<DatabaseResponse<T>> => {
  try {
    const response = await databases.createDocument<T>(
      databaseId,
      collectionId,
      documentId || ID.unique(),
      data
    );
    return {
      success: true,
      data: response,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to create document',
    };
  }
};

/**
 * Update an existing document
 * @param databaseId - The database ID
 * @param collectionId - The collection ID
 * @param documentId - The document ID
 * @param data - The partial document data to update
 * @returns The updated document
 */
export const updateDocument = async <T extends Models.Document>(
  databaseId: string,
  collectionId: string,
  documentId: string,
  data: Partial<Omit<T, keyof Models.Document>>
): Promise<DatabaseResponse<T>> => {
  try {
    const response = await databases.updateDocument<T>(
      databaseId,
      collectionId,
      documentId,
      data
    );
    return {
      success: true,
      data: response,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to update document',
    };
  }
};

/**
 * Delete a document
 * @param databaseId - The database ID
 * @param collectionId - The collection ID
 * @param documentId - The document ID
 */
export const deleteDocument = async (
  databaseId: string,
  collectionId: string,
  documentId: string
): Promise<DatabaseResponse<void>> => {
  try {
    await databases.deleteDocument(databaseId, collectionId, documentId);
    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to delete document',
    };
  }
};

/**
 * Export Query helper for building queries
 * Usage example:
 * 
 * import { Query } from '@/services/appwrite/database';
 * 
 * const queries = [
 *   Query.equal('status', 'active'),
 *   Query.limit(10),
 *   Query.orderDesc('$createdAt')
 * ];
 */
export { Query };

/**
 * Collection-specific service classes can be added below
 * Example:
 * 
 * export class PurchaseOrdersService {
 *   private static databaseId = 'your-database-id';
 *   private static collectionId = 'purchase-orders';
 * 
 *   static async list() {
 *     return listDocuments(this.databaseId, this.collectionId);
 *   }
 * 
 *   static async getById(id: string) {
 *     return getDocument(this.databaseId, this.collectionId, id);
 *   }
 * 
 *   // Add more methods as needed
 * }
 */
