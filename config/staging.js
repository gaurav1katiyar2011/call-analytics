// TODO change URL local to staging
const client = {
  base: 'http://localhost:3000',
  protocol: 'http',
  host: 'localhost',
  port: 3000,
  credentials: 'include',
  basename: '/app/backend',
}

const server = {
  protocol: 'http',
  host: 'localhost',
  port: 3000,
  credentials: 'include',
  basename: '/app/backend',
}
const bodyParser = {
  limit: '100kb'
}
const errors = {
  displayMessage: true,
  displayStackTrace: true
}

const sampleConfig = {
  message: `This message is loading from a configuration file in ${process.env.APP_ENV}.js`
}

export default {
  // any non public facing config goes in backend - only available server-side
  backend: {
    bodyParser,
    errors
  },
  // public facing config goes in ui - available on both UI and server
  ui: {
    client,
    server,
    sampleConfig
  }
}
