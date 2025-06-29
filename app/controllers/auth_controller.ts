import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator } from '#validators/auth'

export default class AuthController {
  async showRegisterForm({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  async register({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)
    const user = await User.create({
      ...payload,
      role: payload.role || 'user' // Default value
    })

    await auth.use('web').login(user)
    return response.redirect('/dashboard')
  }

  async showLoginForm({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async login({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      await auth.use('web').attempt(email, password)
      return response.redirect('/dashboard')
    } catch {
      return response.redirect().back().withErrors({
        email: 'Invalid credentials'
      })
    }
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/login')
  }

  async dashboard({ inertia }: HttpContext) {
    return inertia.render('auth/dashboard')
  }
}
