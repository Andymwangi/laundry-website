/**
 * A utility function that suppresses TypeScript errors for components
 * This can be removed once proper type definitions are in place
 */
export function withTypes<P extends object>(Component: any) {
  return Component as any;
} 