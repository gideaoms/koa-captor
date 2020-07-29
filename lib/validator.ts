import { Context, Next } from 'koa'
import { ValidationError, ObjectSchema } from '@hapi/joi'

const validate = (schema: ObjectSchema, data: any = {}) => {
  const { error, value } = schema.validate(data, { abortEarly: false })

  if (error) {
    throw error
  }

  return value
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

const body = (schema?: ObjectSchema) =>
  async ({ request }: Context, next: Next) => {
    if (!schema) {
      return await next()
    }

    request.body = validate(schema, request.body)
    await next()
  }

const query = (schema?: ObjectSchema) =>
  async ({ request }: Context, next: Next) => {
    if (!schema) {
      return await next()
    }

    request.query = validate(schema, request.query)
    await next()
  }

const params = (schema?: ObjectSchema) =>
  async (ctx: Context, next: Next) => {
    if (!schema) {
      return await next()
    }

    ctx.params = validate(ctx.params, ctx.params)
    await next()
  }

export default { capture, body, query, params }
