require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mailgun = require('mailgun-js')
const {check, validationResult} = require('express-validator')

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(morgan('dev'))

const validationChecks = [
  check('name', 'name is required').not().isEmpty().trim().escape(),
  check('email', 'valid email is required').isEmail().normalizeEmail(),
  check('subject').optional().trim().escape(),
  check('message', 'message is required').not().isEmpty().isLength({max: 2000}).trim().escape()
]

const indexRouter = express.Router()

indexRouter.route('/apis')
  .get((req, res) => res.json({status: 200}))

app.use(indexRouter)

app.listen(4200, () => console.log('local server listening on port 4200'))