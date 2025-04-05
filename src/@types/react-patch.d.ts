import 'react';

declare module 'react' {
  // Add any missing React types or override existing ones here
}

declare module 'next/link' {
  import { LinkProps as NextLinkProps } from 'next/link';
  import * as React from 'react';
  
  export interface LinkProps extends NextLinkProps {
    children?: React.ReactNode;
    className?: string;
    [key: string]: any;
  }
  
  const Link: React.ForwardRefExoticComponent<LinkProps>;
  export default Link;
}

declare module 'next/image' {
  import { ImageProps as NextImageProps } from 'next/image';
  import * as React from 'react';
  
  export interface ImageProps extends NextImageProps {
    className?: string;
    [key: string]: any;
  }
  
  const Image: React.FC<ImageProps>;
  export default Image;
}

declare module 'next/navigation' {
  export function useRouter(): {
    push: (url: string) => void;
    replace: (url: string) => void;
    back: () => void;
  };
  
  export function usePathname(): string;
  export function useSearchParams(): URLSearchParams;
}

declare module 'lucide-react' {
  import * as React from 'react';
  
  export interface IconProps extends React.SVGAttributes<SVGElement> {
    size?: number | string;
    strokeWidth?: number | string;
  }
  
  export const ShoppingCart: React.FC<IconProps>;
  export const PlusCircle: React.FC<IconProps>;
  export const MinusCircle: React.FC<IconProps>;
  export const Trash2: React.FC<IconProps>;
  export const CheckCircle: React.FC<IconProps>;
  export const X: React.FC<IconProps>;
  export const LayoutDashboard: React.FC<IconProps>;
  export const UserCircle: React.FC<IconProps>;
  export const Menu: React.FC<IconProps>;
  export const CreditCard: React.FC<IconProps>;
  export const Smartphone: React.FC<IconProps>;
  export const AlertCircle: React.FC<IconProps>;
  export const ArrowLeft: React.FC<IconProps>;
  export const Clock: React.FC<IconProps>;
  export const ExternalLink: React.FC<IconProps>;
  export const Truck: React.FC<IconProps>;
  export const CalendarCheck: React.FC<IconProps>;
  export const ArrowRight: React.FC<IconProps>;
  
  // Add other icons as needed
}

declare module 'framer-motion' {
  import * as React from 'react';
  
  export interface MotionProps {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    variants?: any;
    className?: string;
    style?: React.CSSProperties;
    [key: string]: any;
  }
  
  export const motion: {
    div: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLDivElement>>;
    button: React.ForwardRefExoticComponent<MotionProps & React.ButtonHTMLAttributes<HTMLButtonElement>>;
    span: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLSpanElement>>;
    // Add other HTML elements as needed
  };
}

declare module 'react-icons/fi' {
  import * as React from 'react';
  
  export interface IconProps extends React.SVGAttributes<SVGElement> {
    size?: number | string;
    color?: string;
    title?: string;
  }
  
  export const FiMenu: React.FC<IconProps>;
  export const FiX: React.FC<IconProps>;
  export const FiPhone: React.FC<IconProps>;
  export const FiMail: React.FC<IconProps>;
  // Add other icons as needed
}

declare module 'sonner' {
  import * as React from 'react';
  
  export interface ToasterProps {
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
    duration?: number;
    className?: string;
    theme?: 'light' | 'dark' | 'system';
  }
  
  export const Toaster: React.FC<ToasterProps>;
  
  export interface ToastOptions {
    id?: string | number;
    duration?: number;
    icon?: React.ReactNode;
    className?: string;
    description?: React.ReactNode;
    action?: {
      label: string;
      onClick: () => void;
    };
  }
  
  export function toast(
    message: React.ReactNode,
    options?: ToastOptions
  ): void;
  
  toast.success = (
    message: React.ReactNode,
    options?: ToastOptions
  ): void => {};
  
  toast.error = (
    message: React.ReactNode,
    options?: ToastOptions
  ): void => {};
  
  toast.warning = (
    message: React.ReactNode,
    options?: ToastOptions
  ): void => {};
  
  toast.info = (
    message: React.ReactNode,
    options?: ToastOptions
  ): void => {};
} 