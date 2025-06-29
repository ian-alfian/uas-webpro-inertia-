import { HttpContext } from '@adonisjs/core/http'

export default class RoleMiddleware {
  async handle(ctx: HttpContext, next: any, allowedRoles: string[]) {
    const user = ctx.auth.user

    if (!user) {
      return ctx.response.unauthorized({
        message: 'Silakan login terlebih dahulu',
      })
    }

    if (!allowedRoles.includes(user.role)) {
      return ctx.response.forbidden({
        message: 'Akses ditolak: Role tidak sesuai',
      })
    }

    await next()
  }
}
