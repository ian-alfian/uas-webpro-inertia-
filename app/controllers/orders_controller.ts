import { HttpContext } from '@adonisjs/core/http'
import Order from '#models/order'

export default class OrderController {
  // Proses checkout
  async store({ request, response, auth }: HttpContext) {
    const payload = request.only(['items', 'total_price', 'address'])
    const data = {
      ...payload,
      user_id: auth.user!.id,
    }

    const order = await Order.create(data)
    return response.redirect(`/payment/success?order_id=${order.id}`)
  }

  // Tampilkan riwayat order
  async index({ inertia, auth }: HttpContext) {
    const orders = await Order.query().where('user_id', auth.user!.id)
    return inertia.render('Orders/Index', { orders })
  }

  // Detail order
  async show({ params, inertia }: HttpContext) {
    const order = await Order.findOrFail(params.id)
    return inertia.render('Orders/Show', { order })
  }

  // Tampilkan halaman sukses pembayaran
  async paymentSuccess({ request, inertia }: HttpContext) {
    const orderId = request.input('order_id')
    return inertia.render('Orders/Success', { orderId })
  }
}
