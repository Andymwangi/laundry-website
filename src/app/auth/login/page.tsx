// Import shared configuration
export { dynamic, runtime, generateStaticParams } from '../../page-config';

import { LoginForm } from '@/components/auth/LoginForm';
import { AuthBanner } from '@/components/auth/AuthBanner';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="w-full max-w-md space-y-8">
        <AuthBanner type="login" />
        <LoginForm />
      </div>
    </div>
  );
}