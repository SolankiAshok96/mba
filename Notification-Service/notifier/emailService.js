const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
  service: 'gmail',
  debug: true,
  auth: {
    user: 'solankiashok667@gmail.com',
    pass: 'qkmvmbwoxvbnymbd',
  },
})
