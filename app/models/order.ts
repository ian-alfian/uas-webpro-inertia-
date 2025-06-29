import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare items: string // JSON string untuk menyimpan produk

  @column()
  declare totalPrice: number

  @column()
  declare address: string
}
