/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import Route from '@adonisjs/core/services/router';

// Home Route
Route.get('/', async ({ inertia }) => {
  return inertia.render('home');
});

// Authentication Routes
Route.get('/register', async ({ inertia }) => {
  return inertia.render('auth/register');
});
Route.post('/register', async ({ inertia }) => {
  return inertia.render('auth/register');
});

Route.get('/login', async ({ inertia }) => {
  return inertia.render('auth/login');
});
Route.post('/login', async ({ inertia }) => {
  return inertia.render('auth/login');
});
Route.post('/logout', async ({ inertia }) => {
  return inertia.render('auth/logout');
});

// Dashboard Route
Route.get('/dashboard', async ({ inertia }) => {
  return inertia.render('auth/dashboard');
});

// Contact Route
Route.get('/contact', async ({ inertia }) => {
  return inertia.render('auth/contact');
});

// Cart Routes
Route.get('/cart', async ({ inertia }) => {
  return inertia.render('auth/cart');
});
Route.post('/cart', async ({ inertia }) => {
  return inertia.render('auth/cart');
});
Route.delete('/cart', async ({ inertia }) => {
  return inertia.render('auth/cart');
});

Route.get('/wanita', async ({ inertia }) => {
  return inertia.render('wanita')
})
Route.get('/pria', async ({ inertia }) => {
  return inertia.render('pria')
})
Route.get('/anak', async ({ inertia }) => {
  return inertia.render('anak')
})
Route.get('/bayi', async ({ inertia }) => {
  return inertia.render('bayi')
})
