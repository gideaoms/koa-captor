[![npm version](https://img.shields.io/npm/v/koa-captor.svg?style=flat)](https://www.npmjs.com/package/koa-captor)

# koa-captor

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
  console.log('middleware 1')
  await next()
}

const middleware2 = async (ctx, next) => {
  console.log('middleware 2')
  await next()
}

router.get('/:name', captor({
  validations: {
    // or params or query or files or file
    body: Joi.object({
      name: Joi.string().required()
    })
  },
  middlewares: [
    middleware1,
    middleware2
  ],
  handler: ({ request, response }) => {
    return response.code(201).json({ hello: "world" })
  }
}))
```

*Other ways to use the handler method:*
```js
handler: ({ request, response }) => {
  return { hello: "world" }
}
```

```js
handler: ({ request, response }) => {
  return response.json({ hello: "world" })
}
```

```js
handler: ({ request, response }) => {
  return response.code(404)
}
```

## Author
[Gideão Silva](https://github.com/gideaoms)
