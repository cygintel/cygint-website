import { 
  type ContactSubmission, 
  type InsertContact,
  type CaseStudy,
  type InsertCaseStudy,
  type BlogPost,
  type InsertBlogPost
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
  
  // Blog posts
  createBlogPost(data: InsertBlogPost): Promise<BlogPost>;
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost | null>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | null>;
  getFeaturedBlogPosts(limit?: number): Promise<BlogPost[]>;
  getBlogPostsByTag(tag: string): Promise<BlogPost[]>;
}

export class MemStorage implements IStorage {
  private contactSubmissions: Map<number, ContactSubmission>;
  private currentContactId: number;
  private caseStudies: Map<number, CaseStudy>;
  private currentCaseStudyId: number;
  private blogPosts: Map<number, BlogPost>;
  private currentBlogPostId: number;

  constructor() {
    this.contactSubmissions = new Map();
    this.currentContactId = 1;
    this.caseStudies = new Map();
    this.currentCaseStudyId = 1;
    this.blogPosts = new Map();
    this.currentBlogPostId = 1;
    
    // Initialize sample data
    this.initSampleCaseStudies();
    this.initSampleBlogPosts();
  }

  // Contact submissions methods
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
  
  // Blog post methods
  async createBlogPost(data: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const publishedDate = new Date();
    
    const blogPost: BlogPost = {
      id,
      title: data.title,
      slug: data.slug,
      author: data.author,
      publishedDate: data.publishedDate || publishedDate,
      content: data.content,
      excerpt: data.excerpt,
      imageUrl: data.imageUrl,
      tags: data.tags || [],
      featured: data.featured || "false",
      readTimeMinutes: data.readTimeMinutes,
    };
    
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort((a, b) => 
      b.publishedDate.getTime() - a.publishedDate.getTime()
    );
  }
  
  async getBlogPostById(id: number): Promise<BlogPost | null> {
    return this.blogPosts.get(id) || null;
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = Array.from(this.blogPosts.values());
    return posts.find(post => post.slug === slug) || null;
  }
  
  async getFeaturedBlogPosts(limit: number = 10): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.featured === "true")
      .sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime())
      .slice(0, limit);
  }
  
  async getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.tags && post.tags.includes(tag))
      .sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime());
  }
  
  // Sample data initialization
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
    
    for (const data of sampleCaseStudies) {
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
    }
  }
  
  private initSampleBlogPosts() {
    const sampleBlogPosts: InsertBlogPost[] = [
      {
        title: "Understanding Zero Trust Security: A Modern Approach to Enterprise Security",
        slug: "understanding-zero-trust-security",
        author: "Dr. Sarah Mitchell",
        publishedDate: new Date("2025-03-15"),
        content: `# Understanding Zero Trust Security: A Modern Approach to Enterprise Security

In today's rapidly evolving cybersecurity landscape, the traditional perimeter-based security model is increasingly inadequate. This article explores the Zero Trust security framework, its principles, and how organizations can implement it effectively.

## What is Zero Trust Security?

Zero Trust is a security concept based on the principle of "never trust, always verify." Unlike traditional security models that focus on defending the perimeter and trusting everything inside, Zero Trust assumes breach and verifies each request as though it originates from an untrusted network.

Key principles include:

1. **Verify explicitly**: Always authenticate and authorize based on all available data points
2. **Use least privileged access**: Limit user access rights to only what is necessary
3. **Assume breach**: Minimize blast radius and segment access, verify end-to-end encryption, and use analytics to improve defenses

## Why Zero Trust Matters Now

Several factors have made Zero Trust increasingly relevant:

- **Dissolving Perimeter**: Cloud services, remote work, and BYOD policies have blurred traditional network boundaries
- **Sophisticated Threats**: Advanced persistent threats and supply chain attacks require more robust security approaches
- **Regulatory Compliance**: Data protection regulations increasingly demand fine-grained access controls

## Implementing Zero Trust: A Practical Roadmap

### 1. Identify Your Protect Surface

Start by identifying your critical data, assets, applications, and services (DAAS). These form your "protect surface," which is much smaller and more focused than your attack surface.

### 2. Map Transaction Flows

Understand how traffic moves across your network. Determine how users and systems interact with resources in your protect surface.

### 3. Build a Zero Trust Architecture

Design a network with micro-perimeters around your protect surface elements. Deploy controls like Next-Generation Firewalls (NGFW) to enforce these boundaries.

### 4. Create Zero Trust Policies

Define who should have access to what, under which circumstances. Zero Trust policies should follow the principle of least privilege.

### 5. Monitor and Maintain

Zero Trust is not a "set and forget" solution. Continuously monitor all logs and traffic, looking for suspicious behavior.

## Technologies Enabling Zero Trust

Several technologies are essential for implementing Zero Trust:

- **Identity and Access Management (IAM)**
- **Multi-factor Authentication (MFA)**
- **Micro-segmentation**
- **Software-Defined Perimeter (SDP)**
- **Security Information and Event Management (SIEM)**
- **Cloud Access Security Brokers (CASB)**

## Real-World Success Stories

Many organizations have successfully implemented Zero Trust and seen significant benefits:

- A global financial services firm reduced their attack surface by 75% in just six months
- A healthcare provider decreased incident response time from days to hours
- A government agency reported 30% fewer security incidents after implementing Zero Trust principles

## Conclusion

Zero Trust security represents a paradigm shift in how we approach cybersecurity. By assuming breach and verifying every access request, organizations can better protect their critical assets in today's complex threat landscape.

Implementing Zero Trust is a journey, not a destination. Start small, focus on your most critical assets, and gradually expand your Zero Trust architecture across your organization.`,
        excerpt: "Explore the Zero Trust security model and learn how its 'never trust, always verify' approach can protect your organization against sophisticated threats in today's expanded attack surface.",
        imageUrl: "/blog/zero-trust-security.jpg",
        tags: ["Zero Trust", "Network Security", "Access Control"],
        featured: "true",
        readTimeMinutes: "8"
      },
      {
        title: "The Rise of Ransomware-as-a-Service: What Security Teams Need to Know",
        slug: "ransomware-as-a-service",
        author: "Michael Chen",
        publishedDate: new Date("2025-03-10"),
        content: `# The Rise of Ransomware-as-a-Service: What Security Teams Need to Know

Ransomware attacks have evolved from isolated incidents to a sophisticated criminal ecosystem. This article examines the growing Ransomware-as-a-Service (RaaS) model and provides actionable strategies for defense.

## Understanding the RaaS Model

Ransomware-as-a-Service operates much like legitimate Software-as-a-Service businesses. Criminal developers create, maintain, and update ransomware code, then license it to affiliates who conduct attacks. Profits are shared, typically with affiliates keeping 60-80% of ransom payments.

This model has democratized ransomware, lowering technical barriers to entry and enabling more threat actors to launch sophisticated attacks.

## Key RaaS Groups and Their Tactics

Several RaaS operations have gained notoriety:

### LockBit

LockBit emphasizes speed, with claims of encrypting networks in minutes. They leverage double and triple extortion tactics and have a professional "affiliate program" with technical support.

### BlackCat (ALPHV)

Written in Rust, BlackCat is technically sophisticated with cross-platform capabilities. They pioneered triple extortion by creating public websites to shame victims.

### Royal

Known for not using affiliates, Royal conducts operations themselves and targets critical infrastructure. They bypass security solutions through living-off-the-land techniques.

## The Attack Chain: How RaaS Operations Work

A typical RaaS attack progresses through several stages:

1. **Initial Access**: Typically via phishing, exploiting public-facing applications, or using valid credentials
2. **Persistence & Privilege Escalation**: Establishing footholds and gaining administrative access
3. **Lateral Movement**: Spreading through the network to maximize impact
4. **Data Exfiltration**: Stealing sensitive data before encryption for leverage
5. **Encryption & Extortion**: Deploying ransomware and demanding payment

## Defensive Strategies Against RaaS

Organizations can implement several measures to protect against RaaS:

### 1. Proactive Technical Controls

- Implement multifactor authentication for all remote access
- Maintain rigorous patch management across all systems
- Deploy application whitelisting to prevent unauthorized code execution
- Segment networks to contain potential breaches
- Backup data regularly using the 3-2-1 strategy (three copies, two different media types, one off-site)

### 2. Detection & Response Capabilities

- Deploy EDR/XDR solutions to detect suspicious activity
- Monitor for common ransomware precursors like credential dumping
- Establish an incident response plan specifically for ransomware
- Practice with tabletop exercises and simulations

### 3. The Human Element

- Conduct regular security awareness training
- Develop a specialized program focusing on recognizing phishing
- Create a security-conscious culture

## To Pay or Not to Pay?

The question of whether to pay ransom demands is complex. Consider:

- Legal implications (some jurisdictions restrict ransom payments)
- No guarantee of data recovery
- Funding further criminal activities
- Encouraging future attacks

Organizations should work with legal counsel, insurance providers, and law enforcement to make informed decisions based on their specific circumstances.

## Conclusion

Ransomware-as-a-Service represents a significant evolution in the threat landscape. By understanding the RaaS model and implementing defense-in-depth strategies, organizations can reduce their risk exposure and minimize potential damage from these increasingly sophisticated attacks.

The most effective approach combines technical controls, detection capabilities, incident response preparation, and human awareness—all working together as part of a comprehensive security program.`,
        excerpt: "Explore the growing threat of Ransomware-as-a-Service (RaaS), where criminal developers license sophisticated ransomware to affiliates, and learn defensive strategies to protect your organization.",
        imageUrl: "/blog/ransomware-as-service.jpg",
        tags: ["Ransomware", "Threat Intelligence", "Incident Response"],
        featured: "true",
        readTimeMinutes: "9"
      },
      {
        title: "Securing APIs in Modern Architectures: Best Practices for Developers",
        slug: "securing-apis-modern-architectures",
        author: "Jennifer Patel",
        publishedDate: new Date("2025-03-05"),
        content: `# Securing APIs in Modern Architectures: Best Practices for Developers

APIs form the backbone of modern software architecture, enabling the integration and communication that powers today's digital experiences. However, they also represent an expanding attack surface. This article explores practical approaches to API security for developers and security teams.

## The API Security Challenge

APIs face unique security challenges:

- They expose application logic and sensitive data
- They're increasingly targeted by attackers
- Traditional security tools often miss API-specific vulnerabilities
- Development speed can prioritize functionality over security

The OWASP API Security Top 10 highlights the most critical API security risks, including broken authentication, excessive data exposure, and lack of resources & rate limiting.

## Essential API Security Best Practices

### Authentication & Authorization

Implement robust identity mechanisms:

- Use industry standard OAuth 2.0 and OpenID Connect
- Implement proper token validation
- Employ short-lived access tokens with refresh tokens
- Utilize API keys for service-to-service communication
- Apply the principle of least privilege for all API access

### Input Validation & Output Encoding

Protect against injection attacks:

- Validate all inputs for type, length, format, and range
- Use schema validation tools like JSON Schema
- Escape output data to prevent injection
- Set strict content-type headers and validate incoming content
- Implement API schema validation using OpenAPI specifications

### Rate Limiting & Resource Monitoring

Prevent abuse and denial of service:

- Implement rate limiting based on user, IP, or API key
- Set resource quotas for CPU, memory, and requests
- Monitor for abnormal usage patterns
- Create alerts for unusual API behavior
- Implement exponential backoff for retries

### Transport Security

Secure data in transit:

- Enforce HTTPS for all API traffic
- Implement proper TLS configuration
- Use certificate pinning for mobile clients
- Set appropriate security headers
- Regular rotation of TLS certificates

### API Gateway Security

Centralize security controls:

- Deploy an API gateway as a security control point
- Implement consistent authentication and authorization
- Centralize logging and monitoring
- Apply rate limiting and threat protection
- Validate API schema and content at the gateway

## Secure API Development Lifecycle

Integrate security throughout the API lifecycle:

### Design Phase

- Conduct threat modeling specific to APIs
- Create security requirements
- Design authentication and authorization models
- Plan rate limiting strategy

### Development Phase

- Use secure coding practices
- Implement input validation
- Develop comprehensive test cases
- Create security unit tests

### Testing Phase

- Perform automated security testing
- Conduct API-specific penetration testing
- Use dynamic and static analysis tools
- Test for performance and rate limiting

### Deployment Phase

- Implement monitoring and alerting
- Deploy with proper access controls
- Configure production security settings
- Set up automated scanning

### Maintenance Phase

- Regular security updates
- Vulnerability management
- Deprecation and versioning strategy
- Security incident response planning

## Tools for API Security

Several tools can enhance your API security posture:

- **Static Analysis**: SonarQube, Checkmarx
- **Dynamic Testing**: OWASP ZAP, Burp Suite
- **API Gateways**: Kong, Apigee, AWS API Gateway
- **Schema Validation**: Spectral, Stoplight
- **Runtime Protection**: Signal Sciences, F5 Advanced WAF
- **Monitoring**: Datadog, New Relic, Elastic Stack

## Conclusion

Securing APIs requires a comprehensive approach that encompasses design, development, deployment, and monitoring. By implementing the best practices outlined in this article, organizations can significantly reduce the risk of API-related security incidents.

Remember that API security is not a one-time effort but an ongoing process. Regular assessment, testing, and improvement are essential to maintaining a strong API security posture in an evolving threat landscape.`,
        excerpt: "Learn essential best practices for securing APIs in modern architectures, including authentication, input validation, rate limiting, and implementing a secure API development lifecycle.",
        imageUrl: "/blog/api-security.jpg",
        tags: ["API Security", "Web Development", "Authentication"],
        featured: "false",
        readTimeMinutes: "7"
      },
      {
        title: "IoT Security Challenges: Protecting the Connected Ecosystem",
        slug: "iot-security-challenges",
        author: "Dr. Robert Williams",
        publishedDate: new Date("2025-02-28"),
        content: `# IoT Security Challenges: Protecting the Connected Ecosystem

The proliferation of Internet of Things (IoT) devices has created unprecedented connectivity but also introduced significant security challenges. This article examines the unique security concerns in IoT environments and provides practical approaches to address them.

## The Expanding IoT Attack Surface

IoT deployments create complex security challenges:

- **Scale**: Billions of connected devices, each a potential entry point
- **Diversity**: Heterogeneous devices with different operating systems, capabilities, and security features
- **Constraints**: Limited processing power, memory, and battery life restricting security measures
- **Lifespan**: Devices may remain in service for years without updates
- **Physical Access**: Devices often deployed in physically accessible locations

## Common IoT Security Vulnerabilities

Several security weaknesses frequently appear in IoT environments:

### Weak Authentication

Many IoT devices ship with default credentials, weak password policies, or no authentication requirements at all. Even when authentication exists, it's often implemented poorly, lacking features like brute force protection.

### Insufficient Encryption

Sensitive data is frequently transmitted unencrypted or with obsolete encryption standards. Local storage often lacks encryption, and many devices fail to implement secure boot processes.

### Inadequate Update Mechanisms

Software updates present significant challenges in IoT:
- Many devices lack automated update capabilities
- Updates often require manual intervention
- Some devices have no update path at all
- Updates may be infrequent or cease after a short period

### Insecure Interfaces

Web, cloud, and mobile interfaces controlling IoT devices frequently contain vulnerabilities:
- Injection flaws and XSS vulnerabilities
- Weak session management
- Inadequate access controls
- Insufficient TLS implementation

### Privacy Concerns

IoT devices collect vast amounts of potentially sensitive data:
- Location tracking
- Usage patterns
- Personal information
- Environmental data

## IoT Security Best Practices

Organizations can take several steps to improve IoT security:

### Secure by Design

- Implement security from the initial design phase
- Conduct threat modeling specific to IoT use cases
- Apply principles of least privilege
- Design with privacy in mind
- Plan for the entire device lifecycle, including decommissioning

### Device Hardening

- Change default credentials before deployment
- Disable unnecessary services and ports
- Implement secure boot mechanisms
- Apply firmware signing
- Encrypt sensitive data at rest and in transit
- Implement mutual authentication

### Network Security

- Segment IoT devices into separate network zones
- Implement network monitoring for abnormal behavior
- Apply strict access controls and firewall rules
- Use VPNs or other secure communication channels
- Consider implementing a Zero Trust architecture

### Update Management

- Develop a comprehensive update strategy
- Implement secure over-the-air update capabilities
- Verify update integrity through code signing
- Test updates thoroughly before deployment
- Plan for devices that cannot be updated

### Monitoring and Response

- Implement comprehensive logging
- Deploy anomaly detection systems
- Develop incident response procedures specific to IoT
- Conduct regular security assessments
- Practice tabletop exercises for IoT security incidents

## Industry Standards and Frameworks

Several organizations have developed IoT security standards:

- **NIST**: Special publications on IoT security (NISTIR 8259)
- **ENISA**: Baseline Security Recommendations for IoT
- **IoT Security Foundation**: IoT Security Compliance Framework
- **CSA**: IoT Security Controls Framework
- **OWASP**: IoT Security Verification Standard (ISVS)

## Case Study: Smart Building Security

A commercial real estate company implementing smart building technology addressed security challenges by:

1. Conducting a detailed risk assessment of all connected systems
2. Implementing a segregated network architecture for IoT devices
3. Deploying a central management platform for updates and monitoring
4. Establishing a security operations center with IoT-specific detection rules
5. Developing vendor security requirements for all future IoT purchases

These measures reduced their security incidents by 65% and improved operational efficiency by centralizing management.

## Conclusion

IoT security requires a holistic approach that addresses the unique challenges of connected devices. By implementing security by design, device hardening, network segmentation, update management, and comprehensive monitoring, organizations can significantly reduce the risks associated with IoT deployments.

As IoT continues to evolve, security practices must adapt accordingly. Organizations should stay informed about emerging threats and regularly reassess their IoT security posture to ensure it remains effective against new attack vectors.`,
        excerpt: "Explore the unique security challenges of IoT ecosystems and discover practical approaches for protecting connected devices, including device hardening, network segmentation, and secure update strategies.",
        imageUrl: "/blog/iot-security.jpg",
        tags: ["IoT Security", "Connected Devices", "Network Security"],
        featured: "false",
        readTimeMinutes: "10"
      }
    ];
    
    for (const data of sampleBlogPosts) {
      const id = this.currentBlogPostId++;
      // Ensure a valid date is used
      const currentDate = new Date();
      
      const blogPost: BlogPost = {
        id,
        title: data.title,
        slug: data.slug,
        author: data.author,
        publishedDate: data.publishedDate || currentDate,
        content: data.content,
        excerpt: data.excerpt,
        imageUrl: data.imageUrl,
        tags: data.tags || [],
        featured: data.featured || "false",
        readTimeMinutes: data.readTimeMinutes,
      };
      
      this.blogPosts.set(id, blogPost);
    }
  }
}

export const storage = new MemStorage();