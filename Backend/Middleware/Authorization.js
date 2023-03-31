const authorization=(role)=>{
    return (req,res,next)=>{
        if(role===req.body.role){
            next()
        }else{
            res.status(409).send({"msg":"Not autharizied"});
        }
    }
}
module.exports={
    authorization
}