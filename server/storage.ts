import { type ContactSubmission, type InsertContact } from "@shared/schema";

export interface IStorage {
  createContactSubmission(data: InsertContact): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
}

export class MemStorage implements IStorage {
  private contactSubmissions: Map<number, ContactSubmission>;
  private currentContactId: number;

  constructor() {
    this.contactSubmissions = new Map();
    this.currentContactId = 1;
  }

  async createContactSubmission(data: InsertContact): Promise<ContactSubmission> {
    const id = this.currentContactId++;
    const createdAt = new Date();
    
    const submission: ContactSubmission = {
      id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      company: data.company,
      interest: data.interest,
      message: data.message,
      createdAt,
    };
    
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

export const storage = new MemStorage();
