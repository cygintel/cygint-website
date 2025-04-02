import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { insertContactSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import * as fs from 'fs';
import * as path from 'path';

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

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate the request body against our schema
      const validatedData = insertContactSchema.parse(req.body);
      
      // In a static site, we'd typically send this data to a third-party service
      // Here, we'll simulate storing it in our JSON file
      const filePath = path.join(process.cwd(), 'public', 'data', 'contact-submissions.json');
      let submissions = [];
      
      try {
        submissions = await readJsonFile(filePath);
      } catch (readErr) {
        // If file doesn't exist or is invalid, start with empty array
        submissions = [];
      }
      
      // Create new submission with ID
      const newId = submissions.length > 0 ? Math.max(...submissions.map((s: any) => s.id)) + 1 : 1;
      const submission = {
        id: newId,
        ...validatedData,
        createdAt: new Date().toISOString()
      };
      
      // Add to submissions and save
      submissions.push(submission);
      await writeJsonFile(filePath, submissions);
      
      // Return success response
      return res.status(201).json({
        message: "Contact submission received successfully",
        id: submission.id
      });
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle validation errors
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.details
        });
      }
      
      // Handle other errors
      console.error("Error processing contact submission:", error);
      return res.status(500).json({ 
        message: "An error occurred while processing your request" 
      });
    }
  });

  // Get all contact submissions (admin endpoint)
  app.get("/api/contact", async (_req: Request, res: Response) => {
    try {
      const filePath = path.join(process.cwd(), 'public', 'data', 'contact-submissions.json');
      const submissions = await readJsonFile(filePath);
      return res.status(200).json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      return res.status(500).json({ 
        message: "An error occurred while fetching contact submissions" 
      });
    }
  });
  
  // Case Studies API Endpoints
  
  // Get all case studies
  app.get("/api/case-studies", async (_req: Request, res: Response) => {
    try {
      const filePath = path.join(process.cwd(), 'public', 'data', 'case-studies.json');
      const caseStudies = await readJsonFile(filePath);
      return res.status(200).json(caseStudies);
    } catch (error) {
      console.error("Error fetching case studies:", error);
      return res.status(500).json({ 
        message: "An error occurred while fetching case studies" 
      });
    }
  });
  
  // Get featured case studies
  app.get("/api/case-studies/featured", async (_req: Request, res: Response) => {
    try {
      const filePath = path.join(process.cwd(), 'public', 'data', 'featured-case-studies.json');
      const caseStudies = await readJsonFile(filePath);
      return res.status(200).json(caseStudies);
    } catch (error) {
      console.error("Error fetching featured case studies:", error);
      return res.status(500).json({ 
        message: "An error occurred while fetching featured case studies" 
      });
    }
  });
  
  // Get case study by ID
  app.get("/api/case-studies/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid case study ID" });
      }
      
      const filePath = path.join(process.cwd(), 'public', 'data', 'case-studies', `${id}.json`);
      try {
        const caseStudy = await readJsonFile(filePath);
        return res.status(200).json(caseStudy);
      } catch (readErr) {
        return res.status(404).json({ message: "Case study not found" });
      }
    } catch (error) {
      console.error("Error fetching case study:", error);
      return res.status(500).json({ 
        message: "An error occurred while fetching the case study" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}