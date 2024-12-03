const express = require('express')
const { addMedicineSchedule, getMedicineScheduleByUserId } = require('../controllers/medicineController')
const MedicineRouter = express.Router()
require('dotenv').config()

MedicineRouter.post('/', addMedicineSchedule)
MedicineRouter.get('/:userId', getMedicineScheduleByUserId)
module.exports = {MedicineRouter}