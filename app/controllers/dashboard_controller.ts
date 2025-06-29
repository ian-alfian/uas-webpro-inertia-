// app/controllers/Http/dashboard_controller.ts

import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async index({ inertia }: HttpContext) {
    return inertia.render('auth/dashboard') // Sesuaikan dengan nama file Vue kamu
  }
}
