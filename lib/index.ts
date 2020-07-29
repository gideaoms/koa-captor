import compose from 'koa-compose'
import responder from './responder'
import validator from './validator'
import { Opts } from './types'

const captor = ({ validate, middlewares = [], handler }: Opts) =>
  compose([
    validator.capture,
    validator.body(validate?.body),
    validator.query(validate?.query),
    validator.params(validate?.params),
    compose(middlewares),
    responder,
    handler
  ])

export default captor
