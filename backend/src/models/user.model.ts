export interface User {
  id: string;
  email: string;
  password?: string; // Hashed password
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mock database for now
export const users: User[] = [];
