import compose from 'koa-compose'
import responder from './responder'
import validator from './validator'
import { Opts } from './types'

const captor = ({ validations, middlewares = [], handler }: Opts) =>
  compose([
    validator.capture,
    validator.body(validations?.body),
    validator.query(validations?.query),
    validator.params(validations?.params),
    validator.files(validations?.files),
    validator.file(validations?.file),
    compose(middlewares),
    responder,
    handler
  ])

export default captor
