import request from 'supertest'
import express from 'express'
import bodyParser from 'body-parser'
import backendRoutes from '../routes'

describe('Backend routes', () => {
  const app = express()
  app.use(bodyParser.json())
  app.use(backendRoutes)

  it('returns hello world', (done) => {
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

  it('returns hello name', (done) => {
    request(app)
      .post('/example/hello-name')
      .send({ name: 'Test' })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({ message: 'Hello Test' })
        done()
      })
      .catch(err => done.fail(err))
  })
})
