import { Context, Next } from 'koa'
import { ValidationError, ObjectSchema } from '@hapi/joi'
import { Validations } from './types'

const test = (rules?: ObjectSchema, data?: any) => {
  if (!rules) {
    return data
  }

  const { error, value } = rules.validate(data || {}, { abortEarly: false })

  if (error) {
    throw error
  }

  return value
}

const validate = (validations?: Validations) =>
  async (ctx: Context, next: Next) => {
    ctx.request.body = test(validations?.body, ctx.request.body)
    ctx.request.query = test(validations?.query, ctx.request.query)
    ctx.params = test(validations?.params, ctx.params)
    ctx.files = test(validations?.files, ctx.files)
    ctx.file = test(validations?.file, ctx.file)

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

export default { capture, validate }
