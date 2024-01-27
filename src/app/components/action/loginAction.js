'use server'

import { signIn } from "../../../../auth"

export async function loginAction(formData) {
  // console.log(formData)
  await signIn('credentials', {
    email: formData.email,
    password: formData.password,
    redirectTo: '/'
  })
}