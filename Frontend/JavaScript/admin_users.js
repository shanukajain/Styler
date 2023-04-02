const baseURL="https://long-blue-pronghorn-hat.cyclic.app"


let search=document.getElementById("input");
search.addEventListener("keypress",(e)=>{
    if(e.key=="Enter"){
        let value=document.getElementById("input").value;
        let key="email"
        fetchUsers(key,value)
    //  console.log(value)   
    }
})


async function fetchUsers(key,value){
    let res;
    if(key&&value){
    res= await fetch(`${baseURL}/admin/allusers?${key}=${value}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("admin-login-token")
        }
    });

    }else{
        res= await fetch(`${baseURL}/admin/allusers`,{
            method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("admin-login-token")
        }
        });

    }
    res=await res.json();
// console.log(res)
    userFun(res)
}
fetchUsers()

let mainUser=document.getElementById("user-main")
function userFun(res){
    console.log(res)
    mainUser.innerHTML="";

    let allusers= res.map((item)=>{
        // console.log(item)
       return `<div class="user-div" data-aos="fade-up" data-aos-duration="1000">
        <div>
            <img src="./Image/male-avatar-icon-flat.jpg" alt="user-avtar">
        </div>
        <div>
            <h1>${item.name}</h1>
                <h3><span class="point">Mobile Number :</span>+91 ${item.mob_no}</h3>
                <h3><span class="point">Email :</span>${item.email}</h3>
                <h3><span class="point">Gender :</span>${item.gender}</h3>
                <h3><span class="point">Gender :</span>${item.city}</h3>

            <button class="clock-btn">Block</button>
        </div>
    </div>`
    })

    mainUser.innerHTML=allusers.join(" ");
    let block_btn=document.querySelectorAll(".clock-btn");
    for(let btn of block_btn){
        btn.addEventListener("click",(event)=>{
            let data_id=event.target.dataset.id;
            console.log(data_id)
            blockFun(data_id)
        })
    }
}
async function blockFun(data_id){
    let res=await fetch(`${baseURL}/admin/Block/`,{
        method: "DELETE",
            headers: {
                  "Content-Type": "application/json",
                  Authorization: localStorage.getItem("token")
                },
            },
    )
}