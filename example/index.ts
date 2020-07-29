import Koa, { Context, Next } from 'koa'
import Router from 'koa-router'
import Joi from '@hapi/joi'
import captor from '../lib/index'

const app = new Koa()
const router = new Router()
const port = 3000

const middleware1 = async (ctx: Context, next: Next) => {
  console.log('middleware 1')
  await next()
}

const middleware2 = async (ctx: Context, next: Next) => {
  console.log('middleware 2')
  await next()
}

router.get('/', captor({
  validate: {
    query: Joi.object({
      name: Joi.string().required()
    })
  },
  middlewares: [
    middleware1,
    middleware2
  ],
  handler: ({ request, response }) => {
    return response.code(201).json({ hi: request.query.name })
  }
}))

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(port, () => console.log('Ok'))
