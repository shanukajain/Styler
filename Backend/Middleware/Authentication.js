const jwt=require("jsonwebtoken")
const client=require("../config/redis");

const authenticate=async(req,res,next)=>{
const token=req.headers.authorization;

console.log(token);

if(token){
   const decoded=jwt.verify(token,"9168");
   if(decoded){
    console.log(decoded);
   let t= await client.get(`${token}`);
    if(t){
        res.status(404).send({"msg":"login again"})
    }else {
        const userID=decoded.userID;
        req.body.userID=userID;
        req.body.role=decoded.role
        next();
  }
   
   }else {
    res.status(404).send({"msg":"please login first........."})
   }
}else {
    res.status(404).send({"msg":"please login first........."})
}
}
module.exports={
    authenticate
}