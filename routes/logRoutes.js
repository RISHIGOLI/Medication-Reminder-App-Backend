const express = require('express')
const { logAcknowledgment, getLogAcknowledgements } = require('../controllers/logController')
const LogRouter = express.Router()

LogRouter.post('/', logAcknowledgment)
LogRouter.get('/', getLogAcknowledgements)

module.exports = {
    LogRouter
}