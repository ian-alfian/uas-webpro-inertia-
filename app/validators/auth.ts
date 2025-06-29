// app/validators/Auth.ts // Pastikan nama file adalah Auth.ts

import vine from '@vinejs/vine'

/**
 * Schema untuk validasi pendaftaran (register)
 */
export const registerValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3),
    email: vine.string().normalizeEmail(),
    password: vine.string().minLength(8).confirmed(), // 'confirmed' akan mencari field password_confirmation
    // Error: Property 'default' tidak ada di VineEnum
role: vine.enum(['admin', 'user']).default('user').optional()
  })
)

/**
 * Schema untuk validasi login
 */
export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().normalizeEmail(),
    password: vine.string(),
  })
)
