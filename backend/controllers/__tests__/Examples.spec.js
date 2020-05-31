import request from 'supertest'
import express from 'express'
import bodyParser from 'body-parser'
import examples from '../Examples'

describe('Examples', () => {
  const app = express()
  app.use(bodyParser.json())
  app.get('/example/hello', examples.hello)
  app.post('/example/hello-name', examples.helloName)

  it('should return hello world', (done) => {
    request(app)
      .get('/example/hello')
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({ message: 'Hello World' })
        done()
      })
      .catch(err => done.fail(err))
  })

  it('should return hello <name>', (done) => {
    request(app)
      .post('/example/hello-name')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ name: 'John' })
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({ message: 'Hello John' })
        done()
      })
      .catch(err => done.fail(err))
  })
})
