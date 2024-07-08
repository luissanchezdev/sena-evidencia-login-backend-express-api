import { z } from 'zod'

const userSchema = z.object({
  username: z.string({
    required_error: 'El campo username es requerido'
  }).regex(/^[A-Za-z0-9]+$/, 'El username no debe tener caracteres especiales'),
  name: z.string({
    required_error: 'El campo nombre es requerido',
    invalid_type_error: 'El nombre no debe tener numeros'
  }).refine((val) => isNaN(val), {
    message: 'El nombre no debe tener números o caracteres especiales'
  }),
  password: z.string({
    required_error: 'El campo contraseña es requerido'
  }).min(6)
})

const loginSchema = z.object({
  username: z.string({
    required_error: 'El campo username es requerido'
  }).regex(/^[A-Za-z0-9]+$/, 'El username no debe tener caracteres especiales'),
  password: z.string({
    required_error: 'El campo contraseña es requerido'
  })
})

const validateUserSchema = (object) => {
  return userSchema.safeParse(object)
}

const validateLoginSchema = (object) => {
  return loginSchema.safeParse(object)
}

export {
  userSchema,
  loginSchema,
  validateUserSchema,
  validateLoginSchema
}
