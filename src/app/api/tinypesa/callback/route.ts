import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the incoming webhook data
    const data = await request.json();
    
    // Log the webhook data for debugging
    console.log('Tinypesa webhook received:', data);
    
    /*
    Example Tinypesa callback payload:
    {
      "Body": {
        "stkCallback": {
          "MerchantRequestID": "29115-34620561-1",
          "CheckoutRequestID": "ws_CO_191220191020363925",
          "ResultCode": 0,
          "ResultDesc": "The service request is processed successfully.",
          "CallbackMetadata": {
            "Item": [
              { "Name": "Amount", "Value": 1 },
              { "Name": "MpesaReceiptNumber", "Value": "NLJ7RT61SV" },
              { "Name": "TransactionDate", "Value": 20191219102115 },
              { "Name": "PhoneNumber", "Value": 254722000000 }
            ]
          }
        }
      }
    }
    */
    
    // Store transaction data in your database
    // For this example, we'll just log the data, but in production
    // you should update the order status in your database
    
    // Check if the payment was successful
    const stkCallback = data?.Body?.stkCallback;
    
    if (stkCallback && stkCallback.ResultCode === 0) {
      // Payment successful
      const items = stkCallback.CallbackMetadata?.Item || [];
      
      // Extract important information
      const amount = items.find(item => item.Name === 'Amount')?.Value;
      const receiptNumber = items.find(item => item.Name === 'MpesaReceiptNumber')?.Value;
      const phoneNumber = items.find(item => item.Name === 'PhoneNumber')?.Value;
      const transactionDate = items.find(item => item.Name === 'TransactionDate')?.Value;
      
      // In a real application, you would update your order status:
      // 1. Find the order using the account_no or MerchantRequestID
      // 2. Update the payment status to "paid"
      // 3. Save the transaction details
      
      console.log(`Payment of KES ${amount} received from ${phoneNumber}. Receipt: ${receiptNumber}`);
      
      // Here you could trigger email confirmation, update inventory, etc.
    } else if (stkCallback) {
      // Payment failed
      console.error(`Payment failed: ${stkCallback.ResultDesc}`);
      
      // In a real application, you would update your order status:
      // 1. Find the order using the account_no or MerchantRequestID
      // 2. Update the payment status to "failed"
      // 3. Save the error details
    }
    
    // Always return a 200 OK response to acknowledge receipt of the webhook
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing Tinypesa webhook:', error);
    
    // Still return 200 to prevent Tinypesa from retrying
    return NextResponse.json({ success: false, error: 'Error processing webhook' });
  }
} 