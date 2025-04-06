// Dashboard configuration to force SSR for all dashboard pages
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // Using nodejs runtime for dashboard pages

// This ensures that these pages always run on the server
export const generateStaticParams = () => {
  return [];
}; 