const jwt=require("jsonwebtoken")
const redis=require("redis");
// const client=redis.createClient();
// client.on("error",(err)=>{
//     console.log("error",err);
// })
// client.connect();

const authenticate=async(req,res,next)=>{
const token=req.headers.authorization;

console.log(token);

if(token){
   const decoded=jwt.verify(token,"9168");
   if(decoded){
   let t= await client.GET(`${token}`);
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