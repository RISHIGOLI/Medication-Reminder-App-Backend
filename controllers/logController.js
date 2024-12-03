const { default: ApiResponse } = require("../config/ApiResponse");
const { addLog, getLogs } = require("../models/logModel");

async function logAcknowledgment(req,res){
    try {
        const {user_id, medicine_id, status} = req.body
        const result = await addLog(user_id,medicine_id,status)
        console.log(result);
        return ApiResponse(res, true, 201, 'log acknowledged successfully', result)
    } catch (error) {
        return ApiResponse(res, false, 500, error.message)
    }
}

async function getLogAcknowledgements(req,res){
    try {
        const result = await getLogs()
        return ApiResponse(res, true, 200, 'Query Successful', result)
    } catch (error) {
        return ApiResponse(res, false, 500, error.message)
    }
}

module.exports = {
    logAcknowledgment, getLogAcknowledgements
}