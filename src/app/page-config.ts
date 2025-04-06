// Global page configuration to be used across all dynamic pages
// This helps avoid the "useSearchParams() should be wrapped in a suspense boundary" error

// Export dynamic to force dynamic rendering for client components that use hooks like useSearchParams
export const dynamic = 'force-dynamic';

// Set runtime to edge for better performance with dynamic content
export const runtime = 'edge';

// Disable static page generation during build for routes that use client hooks
export const generateStaticParams = () => {
  return [];
}; 