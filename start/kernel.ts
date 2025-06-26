/*
|--------------------------------------------------------------------------
| HTTP kernel file
|--------------------------------------------------------------------------
|
| The HTTP kernel file is used to register the middleware with the server
| or the router.
|
*/

import router from '@adonisjs/core/services/router';
import server from '@adonisjs/core/services/server';

/**
 * The error handler is used to convert an exception
 * to a HTTP response.
 */
server.errorHandler(() => import('#exceptions/handler'));

/**
 * The server middleware stack runs middleware on all the HTTP
 * requests, even if there is no route registered for
 * the request URL.
 */
server.use([
  () => import('#middleware/container_bindings_middleware'), // Custom middleware
  () => import('@adonisjs/static/static_middleware'), // Serve static files
  () => import('@adonisjs/cors/cors_middleware'), // Handle CORS
  () => import('@adonisjs/vite/vite_middleware'), // Vite middleware
  () => import('@adonisjs/inertia/inertia_middleware') // Inertia middleware
]);

/**
 * The router middleware stack runs middleware on all the HTTP
 * requests with a registered route.
 */
router.use([
  () => import('@adonisjs/core/bodyparser_middleware'), // Parse request body
  () => import('@adonisjs/session/session_middleware'), // Manage session
  () => import('@adonisjs/shield/shield_middleware'), // CSRF protection
  () => import('@adonisjs/auth/initialize_auth_middleware'), // Initialize authentication
  () => import('#middleware/share_example_middleware') // Custom shared data middleware
]);

/**
 * Named middleware collection must be explicitly assigned to
 * the routes or the routes group.
 */
export const middleware = router.named({
  guest: () => import('#middleware/guest_middleware'), // Middleware for guest users
  auth: () => import('#middleware/auth_middleware') // Middleware for authenticated users
});
