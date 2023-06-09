const express = require('express')
const {httpPostMyMeassageHandler} = require('../ContactUs/contactUsControler')

const contactUsRouter = express.Router()

contactUsRouter.post('/postMymeassage',httpPostMyMeassageHandler)


module.exports = contactUsRouter