import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'

export default class ProductsController {
  public async index({ inertia }: HttpContext) {
    const products = await Product.all() // contoh fetch semua produk
    return inertia.render('Products/Index', { products })
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'price', 'description', 'image'])
    await Product.create(data)
    return response.redirect().toPath('/admin/products')
  }

  public async update({ params, request, response }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    product.merge(request.only(['name', 'price', 'description']))
    await product.save()
    return response.redirect().toPath('/admin/products')
  }

  public async destroy({ params, response }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    await product.delete()
    return response.redirect().toPath('/admin/products')
  }
}
