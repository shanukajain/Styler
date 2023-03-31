const redis=require("redis");
const client=redis.createClient();
client.on("error",(err)=>{
    console.log("error",err);
})
client.connect();
module.exports=client