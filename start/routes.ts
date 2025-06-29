// prettier-ignore-file
import Route from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

// Import controller sesuai nama file kamu (lowercase)
import AuthController from '#controllers/auth_controller'
import DashboardController from '#controllers/dashboard_controller'
import ContactController from '#controllers/contacts_controller'
import CartsController from '#controllers/carts_controller'
import ProductsController from '#controllers/products_controller'
import OrdersController from '#controllers/orders_controller'

// --- Home Route ---
Route.get('/', async ({ inertia }) => {
  return inertia.render('home')
}).as('home')

// --- Auth Routes (tanpa prefix '/auth') ---
const authController = new AuthController()
Route.get('/register', (ctx) => authController.showRegisterForm(ctx)).as('register.show')
Route.post('/register', (ctx) => authController.register(ctx)).as('register')
Route.get('/login', (ctx) => authController.showLoginForm(ctx)).as('login.show')
Route.post('/login', (ctx) => authController.login(ctx)).as('login')
Route.post('/logout', (ctx) => authController.logout(ctx))
  .middleware(middleware.auth())
  .as('logout')

// --- Dashboard & Contact ---
const dashboardController = new DashboardController()
const contactController = new ContactController()
Route.group(() => {
  Route.get('/dashboard', (ctx) => dashboardController.index?.(ctx)).as('dashboard')
  Route.get('/contact', (ctx) => contactController.index?.(ctx)).as('contact')
}).middleware(middleware.auth())

// --- Cart Routes ---
const cartsController = new CartsController()
Route.group(() => {
  Route.get('/cart', (ctx) => cartsController.index(ctx)).as('cart.index')
  Route.post('/cart', (ctx) => cartsController.store(ctx)).as('cart.store')
  Route.put('/cart/:id', (ctx) => cartsController.update(ctx)).as('cart.update')
  Route.delete('/cart/:id', (ctx) => cartsController.destroy(ctx)).as('cart.destroy')
}).middleware(middleware.auth())

// --- Product Routes ---
Route.get('/products', async ({ inertia }) => {
  return inertia.render('ProductListing')
}).as('products.index')

Route.get('/wanita', async ({ inertia }) => {
  return inertia.render('wanita')
}).as('products.wanita')

// --- Admin Routes ---
const productsController = new ProductsController()
Route.group(() => {
  Route.get('/products', (ctx) => productsController.index(ctx)).as('admin.products.index')
  Route.post('/products', (ctx) => productsController.store(ctx)).as('admin.products.store')
  Route.put('/products/:id', (ctx) => productsController.update(ctx)).as('admin.products.update')
  Route.delete('/products/:id', (ctx) => productsController.destroy(ctx)).as('admin.products.destroy')
})
  .prefix('/admin')
  .middleware([middleware.auth(), middleware.role(['admin'])])

// --- Order Routes ---
const ordersController = new OrdersController()
Route.group(() => {
  Route.post('/checkout', (ctx) => ordersController.store(ctx)).as('order.store')
  Route.get('/orders', (ctx) => ordersController.index(ctx)).as('order.index')
  Route.get('/orders/:id', (ctx) => ordersController.show(ctx)).as('order.show')
  Route.get('/payment/success', (ctx) => ordersController.paymentSuccess?.(ctx)).as('payment.success')
}).middleware(middleware.auth())
