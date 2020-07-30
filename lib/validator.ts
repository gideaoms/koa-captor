import { Context, Next } from 'koa'
import { ValidationError } from '@hapi/joi'
import { Validation } from './types'

const validate = ({ type, rules }: Validation) =>
  async (ctx: Context, next: Next) => {
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

export default { capture, validate }
