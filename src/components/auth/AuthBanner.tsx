import Image from "next/image";

type AuthBannerProps = {
  type: "login" | "signup";
};

export function AuthBanner({ type }: AuthBannerProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-2">
        <svg 
          width="200" 
          height="120" 
          viewBox="0 0 200 120" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="200" height="120" fill="#f0f9ff" rx="8" />
          <path 
            d="M100 30 C60 30, 40 70, 40 90 L160 90 C160 70, 140 30, 100 30 Z" 
            fill="#e0f2fe"
            stroke="#93c5fd"
            strokeWidth="2"
          />
          <circle cx="100" cy="60" r="20" fill="#60a5fa" />
          <path 
            d="M80 90 C80 80, 90 75, 100 75 C110 75, 120 80, 120 90" 
            fill="none"
            stroke="#1d4ed8"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path 
            d="M60 65 C70 60, 65 40, 55 45 C45 50, 50 70, 60 65 Z" 
            fill="#bfdbfe"
            stroke="#60a5fa"
            strokeWidth="1"
          />
          <path 
            d="M140 65 C150 60, 145 40, 135 45 C125 50, 130 70, 140 65 Z" 
            fill="#bfdbfe"
            stroke="#60a5fa"
            strokeWidth="1"
          />
          <rect x="85" y="40" width="30" height="15" rx="5" fill="#f0f9ff" />
          <circle cx="95" cy="48" r="3" fill="#1d4ed8" />
          <circle cx="105" cy="48" r="3" fill="#1d4ed8" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-center text-gray-900">
        {type === "login" ? "Welcome back" : "Join Laundry Basket"}
      </h1>
      <p className="mt-2 text-center text-gray-600">
        {type === "login" 
          ? "Sign in to your account to access your laundry services" 
          : "Create an account to manage your laundry needs"}
      </p>
    </div>
  );
}