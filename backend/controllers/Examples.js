class Example {
  constructor() {
    this.foo = 'bar'
    this.hello = this.hello.bind(this)
  }

  hello(req, res) {
    res.json({ message: 'Hello World' })
  }

  helloName(req, res) {
    res.json({ message: `Hello ${req.body.name}` })
  }
  
  profile(req, res) {
    res.json({ message: `Hello ${req.body.name}` })
  }
}

export default new Example()
