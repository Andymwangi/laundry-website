"use client"
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth/auth-context";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

export function LoginForm() {
  const router = useRouter();
  const { login, user, loading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  
  // Get redirect parameters
  const returnUrl = searchParams?.get('returnUrl');
  const plan = searchParams?.get('plan');
  const kilos = searchParams?.get('kilos');
  
  // Build redirect path
  const redirectPath = plan 
    ? `/dashboard/orders?plan=${plan}${kilos ? `&kilos=${kilos}` : ''}`
    : returnUrl || '/dashboard/orders';
  
  // If user is already logged in, redirect them
  useEffect(() => {
    if (user && !authLoading) {
      if (plan) {
        router.push(`/dashboard/orders?plan=${plan}${kilos ? `&kilos=${kilos}` : ''}`);
      } else if (returnUrl) {
        router.push(returnUrl);
      } else {
        router.push('/dashboard/orders');
      }
    }
  }, [user, authLoading, router, plan, kilos, returnUrl]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const result = await login(values.email, values.password, redirectPath);
      
      if (result.success) {
        toast.success("Login successful", {
          description: "Welcome back to Laundry Basket!",
        });
        
        // The redirect will be handled by the AuthContext useEffect
      } else {
        toast.error("Login failed", {
          description: result.error || "Please check your credentials and try again.",
        });
      }
    } catch (error) {
      toast.error("Login failed", {
        description: "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Login</h2>
        <p className="text-gray-600">Welcome back! Please sign in to your account</p>
        {plan && (
          <div className="mt-3 p-3 bg-blue-50 text-blue-700 rounded-md">
            <p>You'll be redirected to complete your order after login.</p>
          </div>
        )}
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="your.email@example.com" 
                    {...field} 
                    className="border-gray-200 focus:border-blue-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    {...field} 
                    className="border-gray-200 focus:border-blue-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isLoading || authLoading}
          >
            {isLoading || authLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Log in"
            )}
          </Button>
        </form>
      </Form>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>
        
        <div className="mt-6">
          <Button 
            variant="outline" 
            className="w-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
            onClick={() => {
              setIsLoading(true);
              // Placeholder for Google OAuth
              setTimeout(() => setIsLoading(false), 1000);
            }}
            disabled={isLoading}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </Button>
        </div>
      </div>
      
      <div className="mt-6 text-center text-sm">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link 
            href={`/auth/signup${plan ? `?plan=${plan}${kilos ? `&kilos=${kilos}` : ''}` : 
              returnUrl ? `?returnUrl=${returnUrl}` : ''}`} 
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}