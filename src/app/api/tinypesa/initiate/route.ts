import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, msisdn, account_no } = body;

    if (!amount || !msisdn) {
      return NextResponse.json(
        { success: false, message: 'Amount and phone number are required' },
        { status: 400 }
      );
    }

    // Format phone number to ensure it's in the correct format (254XXXXXXXXX)
    const formattedPhone = msisdn.startsWith('+') 
      ? msisdn.substring(1) 
      : msisdn.startsWith('0') 
        ? '254' + msisdn.substring(1) 
        : msisdn;

    // Get your API key from env vars
    const apiKey = process.env.TINYPESA_API_KEY;
    
    if (!apiKey) {
      console.error('TINYPESA_API_KEY is not set in environment variables');
      return NextResponse.json(
        { success: false, message: 'Payment service configuration error' },
        { status: 500 }
      );
    }

    // Make a request to Tinypesa API
    const tinypesaResponse = await fetch('https://tinypesa.com/api/v1/express/initialize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Apikey': apiKey
      },
      body: new URLSearchParams({
        amount: amount.toString(),
        msisdn: formattedPhone,
        account_no: account_no || 'Order' + Date.now().toString()
      }).toString()
    });

    const responseData = await tinypesaResponse.json();

    if (!tinypesaResponse.ok) {
      console.error('Tinypesa API error:', responseData);
      return NextResponse.json(
        { success: false, message: responseData.message || 'Failed to initiate payment' },
        { status: tinypesaResponse.status }
      );
    }

    // Return success response with the request ID
    return NextResponse.json({
      success: true,
      message: 'Payment initiated successfully',
      request_id: responseData.request_id
    });
  } catch (error) {
    console.error('Error initializing payment:', error);
    return NextResponse.json(
      { success: false, message: 'Error processing payment request' },
      { status: 500 }
    );
  }
}

// Handle GET request to test if the API is working
export async function GET() {
  return NextResponse.json({ 
    message: 'TinyPesa API endpoint is working. Use POST to initiate payment.' 
  });
} 