import { HttpContext } from '@adonisjs/core/http'
import Cart from '#models/cart'

export default class CartsController {
  // Tampilkan keranjang
  async index({ inertia, auth }: HttpContext) {
    const cartItems = await Cart.query().preload('product')

    return inertia.render('Cart/Index', { cartItems })
  }

  // Tambah ke keranjang
  async store({ request, response, auth }: HttpContext) {
    const payload = request.only(['product_id', 'quantity'])
    const data = {
      ...payload,
      user_id: auth.user!.id,
    }

    await Cart.create(data)
    return response.redirect().back()
  }

  // Update jumlah
  async update({ params, request, response }: HttpContext) {
    const cart = await Cart.findOrFail(params.id)
    cart.merge(request.only(['quantity']))
    await cart.save()
    return response.redirect().back()
  }

  // Hapus dari keranjang
  async destroy({ params, response }: HttpContext) {
    const cart = await Cart.findOrFail(params.id)
    await cart.delete()
    return response.redirect().back()
  }
}
