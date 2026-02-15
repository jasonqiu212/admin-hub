/**
 * Appwrite Services
 * 
 * This module provides centralized access to Appwrite services.
 * Import from here for cleaner and more maintainable code.
 */

// Core client and service instances
export { client, account, databases } from './client';

// Database utilities
export {
  listDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
  Query,
  type DatabaseResponse,
} from './database';
