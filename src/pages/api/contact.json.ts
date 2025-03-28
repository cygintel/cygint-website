import type { APIRoute } from 'astro';
import { storage } from '../../../server/storage';
import { insertContactSchema } from '../../../shared/schema';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    // Validate the data using the schema
    const validatedData = insertContactSchema.parse({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      company: data.company,
      interest: data.interest,
      message: data.message,
      createdAt: new Date(),
    });
    
    // Store in the database
    const submission = await storage.createContactSubmission(validatedData);
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Contact form submitted successfully',
        data: submission
      }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to process contact form submission',
        error: error instanceof Error ? error.message : String(error)
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};

export const GET: APIRoute = async () => {
  try {
    // Fetch all contact submissions
    const submissions = await storage.getContactSubmissions();
    
    return new Response(
      JSON.stringify({
        success: true,
        data: submissions
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to fetch contact submissions',
        error: error instanceof Error ? error.message : String(error)
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};