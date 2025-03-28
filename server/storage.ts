import { 
  type ContactSubmission, 
  type InsertContact,
  type CaseStudy,
  type InsertCaseStudy
} from "@shared/schema";

export interface IStorage {
  // Contact submissions
  createContactSubmission(data: InsertContact): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  
  // Case studies
  createCaseStudy(data: InsertCaseStudy): Promise<CaseStudy>;
  getCaseStudies(): Promise<CaseStudy[]>;
  getCaseStudyById(id: number): Promise<CaseStudy | null>;
  getFeaturedCaseStudies(limit?: number): Promise<CaseStudy[]>;
}

export class MemStorage implements IStorage {
  private contactSubmissions: Map<number, ContactSubmission>;
  private currentContactId: number;
  private caseStudies: Map<number, CaseStudy>;
  private currentCaseStudyId: number;

  constructor() {
    this.contactSubmissions = new Map();
    this.currentContactId = 1;
    this.caseStudies = new Map();
    this.currentCaseStudyId = 1;
    
    // Initialize with sample case studies
    this.initSampleCaseStudies();
  }
  
  private initSampleCaseStudies() {
    const sampleCaseStudies: InsertCaseStudy[] = [
      {
        title: "Securing Critical Infrastructure for Major Energy Provider",
        clientName: "EnergyGrid Co.",
        industry: "Energy & Utilities",
        challenge: "EnergyGrid Co. faced increasing threats to their operational technology (OT) systems controlling power distribution across multiple states. Their legacy security infrastructure was inadequate against sophisticated nation-state threats targeting the energy sector.",
        solution: "Cygint implemented a comprehensive attack surface management solution that continuously monitored both IT and OT environments. We deployed specialized IoT security sensors across critical infrastructure points and established 24/7 threat monitoring.",
        results: "Reduced attack surface by 73% within six months. Successfully identified and remediated three critical zero-day vulnerabilities before exploitation. Achieved regulatory compliance ahead of schedule and under budget.",
        imageUrl: "/case-studies/energy-grid.jpg",
        tags: ["Critical Infrastructure", "OT Security", "Threat Monitoring"],
        featured: "true"
      },
      {
        title: "Healthcare Provider Secures Patient Data Across 50+ Locations",
        clientName: "MediCare Systems",
        industry: "Healthcare",
        challenge: "MediCare Systems struggled with securing a complex network of medical IoT devices across 50+ healthcare facilities. They needed visibility into thousands of connected medical devices while ensuring HIPAA compliance and minimal disruption to patient care.",
        solution: "Cygint deployed its attack surface management platform with specialized healthcare configurations. We integrated with their existing security tools and implemented a non-intrusive scanning protocol safe for medical devices.",
        results: "Discovered 340+ previously unknown connected devices. Implemented security controls that reduced data breach risk by 68%. Automated compliance reporting saved 20+ hours of staff time weekly.",
        imageUrl: "/case-studies/healthcare.jpg",
        tags: ["Healthcare", "IoT Security", "Compliance"],
        featured: "true"
      },
      {
        title: "Financial Institution Strengthens Security Posture",
        clientName: "Global Finance Partners",
        industry: "Financial Services",
        challenge: "Global Finance Partners needed to secure a rapidly expanding digital infrastructure due to their accelerated cloud migration strategy. Their traditional security tools couldn't keep pace with new deployments and acquisitions.",
        solution: "Cygint implemented our continuous attack surface monitoring platform integrated with their CI/CD pipeline. We provided automated security validation before deployment and continuous monitoring in production.",
        results: "Identified and remediated 200+ potential vulnerabilities in the first month. Reduced mean time to detect from 9 days to under 2 hours. Security team productivity increased by 40% through automation.",
        imageUrl: "/case-studies/finance.jpg",
        tags: ["Financial Services", "Cloud Security", "DevSecOps"],
        featured: "false"
      }
    ];
    
    sampleCaseStudies.forEach(caseStudy => {
      this.createCaseStudy(caseStudy);
    });
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
  
  // Case studies methods
  async createCaseStudy(data: InsertCaseStudy): Promise<CaseStudy> {
    const id = this.currentCaseStudyId++;
    const createdAt = new Date();
    
    const caseStudy: CaseStudy = {
      id,
      title: data.title,
      clientName: data.clientName,
      industry: data.industry,
      challenge: data.challenge,
      solution: data.solution,
      results: data.results,
      imageUrl: data.imageUrl,
      tags: data.tags || [],
      featured: data.featured || "false",
      createdAt,
    };
    
    this.caseStudies.set(id, caseStudy);
    return caseStudy;
  }

  async getCaseStudies(): Promise<CaseStudy[]> {
    return Array.from(this.caseStudies.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
  
  async getCaseStudyById(id: number): Promise<CaseStudy | null> {
    return this.caseStudies.get(id) || null;
  }
  
  async getFeaturedCaseStudies(limit: number = 10): Promise<CaseStudy[]> {
    return Array.from(this.caseStudies.values())
      .filter(study => study.featured === "true")
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
}

export const storage = new MemStorage();
