'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to profile page
    router.push('/dashboard/profile');
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Loader2 className="h-10 w-10 text-blue-600 animate-spin mb-4" />
      <h1 className="text-2xl font-bold">Redirecting to your profile...</h1>
    </div>
  );
} 