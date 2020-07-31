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

export type Validations = {
  body?: ObjectSchema
  query?: ObjectSchema
  files?: ObjectSchema
  file?: ObjectSchema
  params?: ObjectSchema
}

export type Opts = {
  validations?: Validations,
  middlewares?: Middleware[]
  handler: Middleware,
}
