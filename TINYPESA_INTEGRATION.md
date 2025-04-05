# TinyPesa Payment Integration Guide

This guide explains how to set up and use the TinyPesa payment gateway in your laundry website application.

## Why TinyPesa for Kenya?

TinyPesa is an excellent choice for processing M-Pesa payments in Kenya because:

1. **Direct Personal M-Pesa Integration**: Receive payments directly to your personal M-Pesa number
2. **No Business Till Required**: No need for a Safaricom business account or till number
3. **Simple API**: Extremely easy to integrate with minimal setup
4. **Low Transaction Fees**: More affordable than most payment gateways
5. **Fast Settlement**: Money is sent directly to your phone

## Prerequisites

1. Sign up for a [TinyPesa account](https://tinypesa.com/signup)
2. Obtain your API key from the TinyPesa Dashboard
3. Your personal M-Pesa number (the number where you want to receive payments)

## Setup Steps

### 1. Set Environment Variables

Create a `.env.local` file at the root of your project (if it doesn't exist already) and add your TinyPesa API key:

```
TINYPESA_API_KEY="your-tinypesa-api-key"
```

### 2. TinyPesa Components

The following files are part of the TinyPesa integration:

- `src/components/TinypesaPaymentButton.tsx`: The payment button component
- `src/app/api/tinypesa/initiate/route.ts`: API endpoint to initiate M-Pesa payments
- `src/app/api/tinypesa/callback/route.ts`: Webhook handler for payment notifications

### 3. Configure Webhook (Optional but Recommended)

In your TinyPesa dashboard:

1. Go to **Settings > Webhooks**
2. Add your webhook URL: `https://your-domain.com/api/tinypesa/callback`
3. This will notify your application when a payment is completed

## How It Works

1. When a customer selects TinyPesa as a payment method, they enter their M-Pesa phone number
2. When they click "Pay", your API endpoint makes a request to TinyPesa
3. TinyPesa sends an STK push to the customer's phone
4. The customer enters their M-Pesa PIN to approve the payment
5. The payment is instantly sent to your personal M-Pesa number
6. TinyPesa notifies your application via webhook (if configured)

## Implementation Details

### Payment Flow

1. Customer enters their M-Pesa phone number
2. Customer clicks "Pay" button
3. TinyPesa sends STK push to customer's phone
4. Customer approves payment by entering M-Pesa PIN
5. Payment is settled directly to your personal M-Pesa number
6. Customer is redirected to confirmation page

### API Integration

TinyPesa offers a very simple API that only requires:

- Your API key
- Amount to be paid
- Customer's phone number
- Optional reference (we use order ID)

### Testing

During development, TinyPesa allows you to test integration without making actual payments:

1. Create a test account in TinyPesa
2. Use the test API key provided
3. When in test mode, TinyPesa will simulate payments without charging real money

## Troubleshooting

- **STK Push Not Received**: Ensure the phone number is in the correct format (07XX XXX XXX or 254XXXXXXXXX)
- **API Key Issues**: Double-check your API key in the environment variables
- **Callback Not Working**: Ensure your webhook URL is publicly accessible and properly configured

## Benefits for Your Business

1. **No Registration Complexity**: No need for M-Pesa Daraja API business registration
2. **Direct to Personal Number**: Funds come directly to your phone
3. **Low Setup Effort**: Get up and running in less than an hour
4. **Simple Fee Structure**: Transparent fees with no hidden costs

## Resources

- [TinyPesa Website](https://tinypesa.com)
- [TinyPesa API Documentation](https://tinypesa.com/documentation)
- [TinyPesa Dashboard](https://tinypesa.com/dashboard)
- [M-Pesa Developer Documentation](https://developer.safaricom.co.ke/)
