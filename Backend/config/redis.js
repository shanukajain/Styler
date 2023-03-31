// const redis=require("redis");
// const client=redis.createClient();
// client.on("error",(err)=>{
//     console.log("error",err);
// })
// client.connect();
const redis=require("redis");

 const client = redis.createClient({ url: 'redis://redis:6379' });
 client.on("error",err=>console.log(err))
 client.connect();
module.exports=client