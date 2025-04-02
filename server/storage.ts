import * as fs from 'fs';
import * as path from 'path';

// This file is kept for compatibility with the server code
// In our static site approach, we're using static JSON files instead of in-memory storage

// Helper function to read JSON files
const readJsonFile = (filePath: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      try {
        const jsonData = JSON.parse(data);
        resolve(jsonData);
      } catch (parseErr) {
        reject(parseErr);
      }
    });
  });
};

// Helper function to write JSON files
const writeJsonFile = (filePath: string, data: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFile(filePath, jsonData, 'utf8', (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

// Placeholder adapter class that uses static JSON files
// This class simulates the behavior of the original MemStorage class
// but actually uses the static JSON files in public/data/
export const storage = {
  // These methods are just placeholders that redirect to the JSON files
  // The actual implementation is in routes.ts
  async createContactSubmission(data: any): Promise<any> {
    // Placeholder - actual implementation in routes.ts
    return { id: 1, ...data, createdAt: new Date() };
  },
  
  async getContactSubmissions(): Promise<any[]> {
    // Placeholder - actual implementation in routes.ts
    return [];
  },
  
  async createCaseStudy(data: any): Promise<any> {
    // Placeholder - actual implementation in routes.ts
    return { id: 1, ...data, createdAt: new Date() };
  },
  
  async getCaseStudies(): Promise<any[]> {
    // Placeholder - actual implementation in routes.ts
    return [];
  },
  
  async getCaseStudyById(id: number): Promise<any | null> {
    // Placeholder - actual implementation in routes.ts
    return null;
  },
  
  async getFeaturedCaseStudies(limit: number = 10): Promise<any[]> {
    // Placeholder - actual implementation in routes.ts
    return [];
  }
};