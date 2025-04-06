// This file is used to configure dynamic routes and API settings
export const config = {
  runtime: 'edge',
  // This is needed for deployment where we need to handle cookies and authentication
  unstable_allowDynamic: [
    '/api/auth/**/*',
    '/node_modules/jose/**/*',
    '/node_modules/cookie/**/*',
    '/node_modules/bcryptjs/**/*',
  ],
}; 