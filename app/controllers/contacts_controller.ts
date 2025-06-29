// app/controllers/Http/contacts_controller.ts

import type { HttpContext } from '@adonisjs/core/http'

export default class ContactsController {
  async index({ inertia }: HttpContext) {
    return inertia.render('Contact') // Sesuaikan dengan nama file Vue-nya
  }
}
