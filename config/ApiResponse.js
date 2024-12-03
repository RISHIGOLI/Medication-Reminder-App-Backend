export default function ApiResponse(response,status,statusCode,message,data=null){
    if(data){
        return response.status(statusCode).json({
            status,statusCode,message,data
        })
    }else{
        return response.status(statusCode).json({
            status,statusCode,message
        })
    }
    
}