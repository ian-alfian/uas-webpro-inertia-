import vine from '@vinejs/vine'

/**
 * Schema untuk validasi pendaftaran (register)
 */
export const registerValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3),
    email: vine.string().normalizeEmail(),
    password: vine.string().minLength(8).confirmed(),
    role: vine
      .enum(['admin', 'user'] as const)  // Gunakan 'as const' untuk type safety
      .optional()
      .transform((value) => value || 'user')  // Set default value melalui transform
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
