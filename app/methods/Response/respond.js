function Response(res,code,status=null,mssg=null,errormssg=null){
    res.status(code).json({status,errormssg,mssg})
}

module.exports=Response