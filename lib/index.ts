import compose from 'koa-compose'
import responder from './responder'
import validator from './validator'
import { Opts } from './types'

const captor = ({ validations, middlewares = [], handler }: Opts) =>
  compose([
    validator.capture,
    validator.validate(validations),
    compose(middlewares),
    responder,
    handler
  ])

export default captor
