const { default: ApiResponse } = require("../config/ApiResponse");
const { addMedicine, getMedicineByUserId } = require("../models/medicineModel");

async function addMedicineSchedule(req, res) {
    try {
        const { user_id, name, dosage, schedule_time } = req.body
        const result = await addMedicine(user_id, name, dosage, schedule_time)
        console.log(result);
        return ApiResponse(res, true, 201, 'medicine added successfully', result)
    } catch (error) {
        return ApiResponse(res, false, 500, error.message)
    }
}

async function getMedicineScheduleByUserId(req, res) {
    try {
        console.log(req.params);
        const {userId} = req.params
        const result = await getMedicineByUserId(userId)
        return ApiResponse(res,true, 200, 'query successful', result)
    } catch (error) {
        return ApiResponse(res, false, 500, error.message)
    }
}

module.exports = {
    addMedicineSchedule, getMedicineScheduleByUserId
}