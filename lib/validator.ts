import { Context, Next } from 'koa'
import { ValidationError, ObjectSchema } from '@hapi/joi'
import { Validation } from './types'

const validate = (type: Validation, rules?: ObjectSchema) =>
  async (ctx: Context, next: Next) => {
    if (!rules) {
      return await next()
    }

    const { error, value } = rules.validate(ctx[type] || {}, { abortEarly: false })

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

const body = (rules?: ObjectSchema) => validate('body', rules)

const query = (rules?: ObjectSchema) => validate('query', rules)

const params = (rules?: ObjectSchema) => validate('params', rules)

const files = (rules?: ObjectSchema) => validate('files', rules)

const file = (rules?: ObjectSchema) => validate('file', rules)

export default { capture, body, query, params, files, file }
