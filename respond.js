function response(res,code,status,errormssg,mssg){
    res.status(code).json({status,errormssg,mssg})
}

module.exports=response