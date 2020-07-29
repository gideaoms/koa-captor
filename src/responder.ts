import { Context, Next } from 'koa'

const responder = async ({ response }: Context, next: Next) => {
  response.json = (body) => {
    response.body = body
  }

  response.code = (status) => {
    response.status = status
    return {
      json: response.json
    }
  }

  const body = await next()

  if (!response.body) {
    response.body = body
  }
}

export default responder
