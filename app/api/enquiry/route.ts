import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, consent } = body;

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const phoneRegex = /^[0-9+\s-]{10,15}$/;
    if (!phone || !phoneRegex.test(phone.replace(/[\s-]/g, ""))) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid contact phone number." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Message is too short. Please provide at least 10 characters." },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { success: false, error: "You must consent to the privacy guidelines." },
        { status: 400 }
      );
    }

    // Simulate database write / mailing latency
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Log the payload to the server-side terminal console
    console.log("----------------------------------------");
    console.log("NEW ENQUIRY RECEIVED:");
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Subject: ${subject || "General Enquiry"}`);
    console.log(`Message: ${message}`);
    console.log("----------------------------------------");

    return NextResponse.json({
      success: true,
      message: "Enquiry received successfully. Our team will contact you shortly.",
    });

  } catch (error) {
    console.error("Enquiry API Error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
