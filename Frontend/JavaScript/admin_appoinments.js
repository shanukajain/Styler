const baseURL="http://localhost:9168"

let date=document.querySelector("#form-div form");
date.addEventListener("submit", dateFun);
function dateFun(event){
    event.preventDefault()
    let dateVal=document.getElementById("datetime").value;
    console.log(dateVal)
}

function statusFun(){
    let status=document.getElementById("select-status").value;
    if(status!=="null"){

        console.log(status)
    }
}
fetchApps()
async function fetchApps(key,value){
try {
    let res;
    if(key && value){
        res= await fetch(`${baseURL}/admin/All_appoints?${key}=${value}`);

    }else{
        res= await fetch(`${baseURL}/admin/All_appoints`);

    }
    res=res.json();
    console.log(res)
    // appsFun(res)
} catch (error) {
    console.log(error)
}
}
let appsDiv=document.getElementById("appointments-div");
function appsFun(res){
    appsDiv.innerHTML=""
    let allApps=res.map((item)=>{
        if(item.status==="pendding"){
            document.querySelector(".complete-tbn").style.display = 'block'
            document.querySelector(".cancle-btn").style.display = 'block'
            document.querySelector(".status-complete").style.display = 'none'
            document.querySelector(".status-cancled").style.display = 'none'
        }else if(item.status==="completed"){
            document.querySelector(".complete-tbn").style.display = 'none'
            document.querySelector(".cancle-btn").style.display = 'none'
            document.querySelector(".status-complete").style.display = 'block'
            document.querySelector(".status-cancled").style.display = 'none'
        }else if(item.status==="cancled"){
            document.querySelector(".complete-tbn").style.display = 'none'
            document.querySelector(".cancle-btn").style.display = 'none'
            document.querySelector(".status-complete").style.display = 'none'
            document.querySelector(".status-cancled").style.display = 'block'
        }
        return `
        <div class="app-child-div">
                <div class="app-child-details">
                    <h2><span class="point">Client Name</span> : <span class="text">${item.client}</span></h2>
                    <h2><span class="point">Time Slot</span> : <span class="text">${item.sfhift} </span></h2>
                    <h2><span class="point">Date</span> : <span class="text">${item.date}</span></h2>
                    <h2><span class="point">Styler Name</span> : <span class="text">${item.styler}</span></h2>
                </div>
                <div class="app-child-button">
                    <button class="complete-tbn">Complete</button>
                    <button class="cancle-btn">Cancel</button>
                    <button class="status-complete">Completed</button>
                    <button class="status-cancled">Cancled</button>
                </div>
            </div>
        `
    })
    appsDiv.innerHTML=allApps.join(" ");
}