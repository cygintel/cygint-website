import type { APIRoute } from 'astro';
import { storage } from '../../../server/storage';
import { insertContactSchema } from '../../../shared/schema';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    // Validate the data using the schema
    const parseResult = insertContactSchema.safeParse(data);
    if (!parseResult.success) {
      return new Response(
        JSON.stringify({
          message: 'Invalid form data',
          errors: parseResult.error.format(),
        }),
        { status: 400 }
      );
    }
    
    // Save to storage
    const result = await storage.createContactSubmission(parseResult.data);
    
    return new Response(
      JSON.stringify({
        message: 'Contact form submitted successfully',
        data: result,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return new Response(
      JSON.stringify({
        message: 'An error occurred while processing your request',
      }),
      { status: 500 }
    );
  }
};

export const GET: APIRoute = async () => {
  try {
    const submissions = await storage.getContactSubmissions();
    
    return new Response(
      JSON.stringify({
        message: 'Contact submissions retrieved successfully',
        data: submissions,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error retrieving contact submissions:', error);
    return new Response(
      JSON.stringify({
        message: 'An error occurred while retrieving contact submissions',
      }),
      { status: 500 }
    );
  }
};