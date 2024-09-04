import { jwt, UseJWT } from 'toruk/middlewares'

export const useJwt = jwt({
  secret: Deno.env.get('JWT_SECRET')!,
  verify: ['uid'],
})

export type APIUseJWT = UseJWT<{
  uid: string
}>
