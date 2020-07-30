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

export type Validation = 'body'
  | 'query'
  | 'files'
  | 'file'
  | 'params'

export type Opts = {
  validations?: {
    body?: ObjectSchema
    query?: ObjectSchema
    files?: ObjectSchema
    file?: ObjectSchema
    params?: ObjectSchema
  },
  middlewares?: Middleware[]
  handler: Middleware,
}
