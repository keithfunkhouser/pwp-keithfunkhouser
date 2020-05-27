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
  .post(validationChecks, (req, res) => {
    //DELETE ACCESS-CONTROL-ALLOW-ORIGIN BEFORE HOSTING SITE
    res.append('Access-Control-Allow-Origin', ['*'])
    res.append('Content-Type', 'text/html')

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const currentError = errors.array()[0]
      return res.send(Buffer.from(`<div class="error">${currentError.msg}</div>`))
    }

    const {name, email, subject, message} = req.body
    const domain = process.env.MAILGUN_DOMAIN
    const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: domain})
    const data = {
      from: `Mailgun Sandbox <postmaster@${domain}>`,
      to: process.env.MAIL_RECIPIENT,
      subject: `${name} | ${subject}`,
      text: `${message}\n\n${email}`
    }

    mg.messages().send(data, (error) => {
      if (error) {
        return res.send(Buffer.from(`<div class="error">Unable to send email at this time. Please try again later.</div>`))
      }
      res.send(Buffer.from(`<div class="success">Email successfully sent. Thank You!</div>`))
    })
  })

app.use(indexRouter)

app.listen(4200, () => console.log('local server listening on port 4200'))
