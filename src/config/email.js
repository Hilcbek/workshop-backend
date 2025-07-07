import nodemailer from 'nodemailer'
import { APP_PASSWORD, USER_EMAIL } from './enviromental'

const transporter = nodemailer.createTransport({
  port: 587,
  host: 'smtp.gmail.com',
  auth: {
    user: USER_EMAIL,
    pass: APP_PASSWORD,
  },
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
  logger: true,
  debug: true,
})

export { transporter }
