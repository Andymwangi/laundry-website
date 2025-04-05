# Laundry Basket - E-Commerce Platform

An end-to-end e-commerce platform for a laundry service business, built with Next.js, TypeScript, and Tailwind CSS.

## Features

### Customer-Facing

- **Product Browsing**: Browse laundry services and products with category filters
- **Shopping Cart**: Add items to cart, update quantities, and view order summary
- **User Authentication**: User login/signup with secure authentication
- **Checkout Flow**: Streamlined checkout process
- **Multiple Payment Options**: M-Pesa, Credit Card, and PesaPal integration
- **Order Tracking**: View order history and status
- **User Dashboard**: Manage orders, profile, and payment methods

### Admin Features

- **Product Management**: Add, edit, and remove products and services
- **Order Management**: View and process incoming orders
- **Customer Management**: View customer data and order history
- **Analytics Dashboard**: Track sales, revenue, and popular products

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI components
- **State Management**: React Context API
- **Authentication**: Custom authentication system
- **Animation**: Framer Motion
- **Icons**: Lucide React, React Icons
- **Form Validation**: React Hook Form with Zod
- **Notifications**: Sonner Toast
- **Database**: PostgreSQL with Drizzle ORM
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/laundry-website.git
   cd laundry-website
   ```

2. Quick Setup

   On Windows, you can use the included setup script:

   ```
   setup-and-run.bat
   ```

   On Linux/Mac:

   ```bash
   chmod +x setup-and-run.sh
   ./setup-and-run.sh
   ```

   These will install all dependencies and start the development server.

3. Manual Installation

   Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

4. Set up environment variables

   ```
   # Create a .env.local file with the following variables
   DATABASE_URL=your_postgres_connection_string
   JWT_SECRET=your_jwt_secret
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

   You can copy the provided example file:

   ```bash
   cp .env.local.example .env.local
   # Then edit .env.local with your actual credentials
   ```

5. Initialize the database

   ```bash
   npm run db:generate
   npm run db:push
   ```

6. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Troubleshooting

If you encounter 'next' not recognized as a command:

- Make sure Node.js is properly installed (v18+)
- Try running with npx: `npx next dev`
- Check that Next.js is installed in your package.json

## Project Structure

```
/src
  /app                    # Next.js App Router
    /api                  # API routes
    /auth                 # Authentication pages
    /dashboard            # User dashboard pages
    /products             # Products listing page
  /components             # React components
    /cart                 # Cart-related components
    /dashboard            # Dashboard components
    /layout               # Layout components
    /pricing              # Pricing components
    /ui                   # UI components (buttons, cards, etc.)
  /lib                    # Utility functions
    /auth                 # Authentication utilities
    /db                   # Database utilities
    /utils                # General utilities
  /types                  # TypeScript type definitions
```

## Key Components

### Cart System

The cart system uses React Context API to manage state globally:

- `CartProvider`: Provides cart functionality across the app
- `CartButton`: Shows cart count in the navigation
- `CartPage`: Displays cart items with ability to update quantities

### Authentication

Custom authentication system with JWT tokens:

- `AuthProvider`: Manages auth state, login, registration
- Login redirects with return URL support
- Protected routes in dashboard section

### Checkout Flow

Multi-step checkout process:

- Cart review
- Delivery information
- Payment method selection
- Order confirmation

### Payment Methods

Support for multiple payment methods:

- M-Pesa mobile payment
- Credit/debit card processing
- PesaPal integration (like PayPal)

## UI Components

The UI is built with Tailwind CSS and Shadcn UI components, providing:

- Responsive design for mobile and desktop
- Dark/light mode support
- Accessible components
- Modern, clean interface

## Development Roadmap

- [ ] Admin dashboard implementation
- [ ] Analytics and reporting
- [ ] Real-time order tracking
- [ ] Customer reviews system
- [ ] Subscription management
- [ ] Email notifications
- [ ] SMS notifications for order status
- [ ] Loyalty program

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [Framer Motion](https://www.framer.com/motion/)
