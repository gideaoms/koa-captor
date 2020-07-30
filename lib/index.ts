import compose from 'koa-compose'
import responder from './responder'
import validator from './validator'
import { Opts } from './types'

const captor = ({ validations = [], middlewares = [], handler }: Opts) =>
  compose([
    validator.capture,
    compose(validations.map(validator.validate)),
    compose(middlewares),
    responder,
    handler
  ])

export default captor
