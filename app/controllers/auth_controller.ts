import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

// Optional kalau mau bikin interface:
interface WebGuard {
  attempt(email: string, password: string): Promise<any>
  logout(): Promise<void>
  user: any
}

export default class AuthController {
  async login({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const web = auth.use('web') as any as WebGuard

    try {
      await web.attempt(email, password)
      return response.redirect('auth/dashboard')
    } catch {
      return response.badRequest('Email atau password salah')
    }
  }

  async logout({ auth, response }: HttpContext) {
    const web = auth.use('web') as any as WebGuard
    await web.logout()
    return response.redirect('/login')
  }

  async me({ auth, response }: HttpContext) {
    const web = auth.use('web') as any as WebGuard
    if (!web.user) {
      return response.unauthorized({ message: 'Belum login' })
    }
    return response.ok(web.user)
  }

  async showRegisterForm({ inertia }: HttpContext) {
    return inertia.render('/register')
  }

  async register({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    // Simpan user ke database
    const user = await User.create({ email, password })

    // Login otomatis
    await auth.use('web').login(user)

    // Redirect ke dashboard
    return response.redirect('auth/dashboard')
  }

  async showLoginForm({ inertia }: HttpContext) {
    return inertia.render('/login')
  }

   async dashboard({ inertia }: HttpContext) {
    return inertia.render('auth/dashboard')
  }
}
