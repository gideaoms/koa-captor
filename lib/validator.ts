import { Context, Next } from 'koa'
import { ValidationError, ObjectSchema } from '@hapi/joi'
import { Validation } from './types'

const validate = ({ type, rules }: Validation) =>
  async (ctx: Context, next: Next) => {
    if (!rules) {
      return await next()
    }

    const { error, value } = rules.validate(ctx[type], { abortEarly: false })

    if (error) {
      throw error
    }

    ctx[type] = value

    await next()
  }

const capture = async ({ response }: Context, next: Next) => {
  try {
    await next()
  } catch (error) {
    if (!(error instanceof ValidationError)) {
      throw error
    }

    response.status = 400
    response.body = {
      messages: error.details.map(({ message, path, type }) => ({ message, path, type }))
    }
  }
}

const body = (body?: ObjectSchema) => validate({ type: 'request.body', rules: body })

const query = (query?: ObjectSchema) => validate({ type: 'request.query', rules: query })

const params = (params?: ObjectSchema) => validate({ type: 'params', rules: params })

const files = (files?: ObjectSchema) => validate({ type: 'request.files', rules: files })

const file = (file?: ObjectSchema) => validate({ type: 'request.file', rules: file })

export default { capture, body, query, params, files, file }
