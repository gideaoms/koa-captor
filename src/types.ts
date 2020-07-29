import { Middleware } from 'koa'
import { ObjectSchema } from '@hapi/joi'

declare module 'koa' {
  interface Response {
    json: (body: any) => void

    code: (status: number) => ({
      json: (body: any) => void
    })
  }
}

export type Opts = {
  validate?: {
    body?: ObjectSchema
    query?: ObjectSchema
    params?: ObjectSchema
  }
  middlewares?: Middleware[]
  handler: Middleware,
}
