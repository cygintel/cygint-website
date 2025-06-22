export async function POST({ request }) {
  try {
    const data = await request.json();

    // Validate required fields
    const { firstName, lastName, email, company, message } = data;

    if (!firstName || !lastName || !email || !company || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "All fields are required"
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Please enter a valid email address"
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // For now, we'll just log the form data
    // In a real implementation, you would:
    // 1. Send an email using a service like SendGrid, Nodemailer, etc.
    // 2. Save to a database
    // 3. Send to a CRM system

    console.log("Contact form submission:", {
      firstName,
      lastName,
      email,
      company,
      message,
      timestamp: new Date().toISOString()
    });

    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    return new Response(
      JSON.stringify({
        success: true,
        message: "Thank you for your message! We'll get back to you soon."
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

  } catch (error) {
    console.error("Contact form error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "An unexpected error occurred. Please try again later."
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
