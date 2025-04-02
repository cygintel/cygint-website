import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertCaseStudySchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate the request body against our schema
      const validatedData = insertContactSchema.parse(req.body);
      
      // Store the submission
      const submission = await storage.createContactSubmission(validatedData);
      
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
      const submissions = await storage.getContactSubmissions();
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
      const caseStudies = await storage.getCaseStudies();
      return res.status(200).json(caseStudies);
    } catch (error) {
      console.error("Error fetching case studies:", error);
      return res.status(500).json({ 
        message: "An error occurred while fetching case studies" 
      });
    }
  });
  
  // Get featured case studies
  app.get("/api/case-studies/featured", async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const caseStudies = await storage.getFeaturedCaseStudies(limit);
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
      
      const caseStudy = await storage.getCaseStudyById(id);
      if (!caseStudy) {
        return res.status(404).json({ message: "Case study not found" });
      }
      
      return res.status(200).json(caseStudy);
    } catch (error) {
      console.error("Error fetching case study:", error);
      return res.status(500).json({ 
        message: "An error occurred while fetching the case study" 
      });
    }
  });
  
  // Create new case study (admin endpoint)
  app.post("/api/case-studies", async (req: Request, res: Response) => {
    try {
      // Validate the request body against our schema
      const validatedData = insertCaseStudySchema.parse(req.body);
      
      // Store the case study
      const caseStudy = await storage.createCaseStudy(validatedData);
      
      // Return success response
      return res.status(201).json({
        message: "Case study created successfully",
        id: caseStudy.id
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
      console.error("Error creating case study:", error);
      return res.status(500).json({ 
        message: "An error occurred while processing your request" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}