
const express = require('express')
const bodyParser = require("body-parser");
import examples from './controllers/Examples'
import userData from './controllers/userData'


const router = express.Router()
const app = express()

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.urlencoded({ extended: true }));

router.get('/example/hello', examples.hello)
router.get('/example/profile', examples.profile)
router.post('/example/hello-name', examples.helloName)
router.post("/user-data", userData.bulkCreate);
router.get("/user-data", userData.findAll);

export default router
