# koa-captor
*Inspired by [Hapi](https://hapi.dev/)*

## Installation
```bash
npm install --save koa-captor
```

## Usage
```js
const Koa = require('koa')
const Joi = require('@hapi/joi')
const Router = require('koa-router')
const captor = require('koa-captor')

const app = new Koa()
const router = new Router()

const middleware1 = async (ctx, next) => {
  console.log('middleware1')
  await next()
}

const middleware2 = async (ctx, next) => {
  console.log('middleware1')
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
```

*Other ways to use the handler method:*
```js
handler: ({ request, response }) => {
  return { hi: request.query.name }
}
```

```js
handler: ({ request, response }) => {
  return response.json({ hi: request.query.name })
}
```

```js
handler: ({ request, response }) => {
  return response.code(404)
}
```

## Author
[Gideão Silva](https://github.com/gideaoms)
