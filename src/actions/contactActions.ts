'use server';

import { z } from 'zod';

// This schema should ideally be consistent with the client-side validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_API_URL = 'https://api.brevo.com/v3';
const TARGET_EMAIL = 'kartikmishra262@gmail.com';
// IMPORTANT: This sender email MUST be validated in your Brevo account.
const SENDER_EMAIL = 'contact@pixelsflow.com'; 
const SENDER_NAME = 'PixelsFlow Contact Form';

export async function submitContactFormAction(data: ContactFormValues): Promise<{ success: boolean; message: string }> {
  if (!BREVO_API_KEY) {
    console.error('Brevo API key is not configured. Ensure BREVO_API_KEY is set in .env.local');
    return { success: false, message: 'Server configuration error. Please try again later.' };
  }

  // Validate data with Zod on the server-side as an extra layer of security, though client-side validation also exists.
  const validationResult = contactFormSchema.safeParse(data);
  if (!validationResult.success) {
    console.error('Server-side validation failed:', validationResult.error.flatten().fieldErrors);
    // Concatenate error messages for simplicity
    const errorMessages = Object.values(validationResult.error.flatten().fieldErrors)
      .map(errors => errors?.join(', '))
      .filter(Boolean)
      .join('; ');
    return { success: false, message: `Invalid form data: ${errorMessages || 'Please check your input.'}` };
  }
  
  const validatedData = validationResult.data;

  try {
    // 1. Create/Update contact in Brevo
    const contactPayload = {
      email: validatedData.email,
      attributes: {
        // Brevo will create a custom attribute 'FULLNAME' (text type) if it doesn't exist.
        // Alternatively, you could map to standard Brevo attributes like FIRSTNAME/LASTNAME if preferred.
        FULLNAME: validatedData.name,
      },
      updateEnabled: true, // Creates if email doesn't exist, updates if it does
    };

    const contactResponse = await fetch(`${BREVO_API_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify(contactPayload),
    });

    if (!contactResponse.ok) {
      let errorData;
      try {
        errorData = await contactResponse.json();
      } catch (e) {
        // If response is not JSON
        errorData = { message: contactResponse.statusText };
      }
      console.error('Brevo API Error (Contacts):', contactResponse.status, errorData);
      throw new Error(`Failed to save contact: ${errorData.message || `HTTP ${contactResponse.status}`}`);
    }
    console.log('Contact saved/updated in Brevo successfully for:', validatedData.email);

    // 2. Send email notification
    const emailPayload = {
      sender: { email: SENDER_EMAIL, name: SENDER_NAME },
      to: [{ email: TARGET_EMAIL }],
      subject: `New Contact Form Submission: ${validatedData.subject}`,
      htmlContent: `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { padding: 20px; border: 1px solid #ddd; border-radius: 5px; max-width: 600px; margin: 20px auto; background-color: #f9f9f9; }
              h2 { color: #0056b3; border-bottom: 2px solid #0056b3; padding-bottom: 10px;}
              p { margin-bottom: 10px; }
              strong { color: #333; }
              .message-block { background-color: #fff; border: 1px solid #eee; padding: 15px; border-radius: 4px; margin-top: 5px; }
              hr { border: 0; border-top: 1px solid #eee; margin: 20px 0; }
              small { color: #777; }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${validatedData.name}</p>
              <p><strong>Email:</strong> <a href="mailto:${validatedData.email}">${validatedData.email}</a></p>
              <p><strong>Subject:</strong> ${validatedData.subject}</p>
              <p><strong>Message:</strong></p>
              <div class="message-block">${validatedData.message.replace(/\n/g, '<br>')}</div>
              <hr>
              <p><small>This email was sent from the PixelsFlow website contact form.</small></p>
            </div>
          </body>
        </html>
      `,
    };

    const emailResponse = await fetch(`${BREVO_API_URL}/smtp/email`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify(emailPayload),
    });

    if (!emailResponse.ok) {
      let errorData;
      try {
        errorData = await emailResponse.json();
      } catch (e) {
        errorData = { message: emailResponse.statusText };
      }
      console.error('Brevo API Error (Email):', emailResponse.status, errorData);
      // Note: Contact might have been saved even if email failed.
      throw new Error(`Failed to send email notification: ${errorData.message || `HTTP ${emailResponse.status}`}`);
    }
    console.log('Email notification sent successfully via Brevo to:', TARGET_EMAIL);

    return { success: true, message: 'Message sent successfully! We will get back to you soon.' };

  } catch (error) {
    console.error('Error in submitContactFormAction:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, message: `Submission failed. ${errorMessage}` };
  }
}
