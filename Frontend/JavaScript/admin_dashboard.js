const baseURL = "http://localhost:9168";

// async function fetchFun(){
//     let res= await fetch(`${baseURL}/`)
// }
let today = new Date();
let day = String(today.getDate()).padStart(2, '0');
let month = String(today.getMonth() + 1).padStart(2, '0');
let year = today.getFullYear();

let formattedDate = `${day}-${month}-${year}`;

console.log(formattedDate);
// let options = { timeZone: 'Asia/Kolkata' }; // set the time zone to India (GMT+5:30)
// let todayFormatted = today.toLocaleString('en-IN', options); // format the date and time in Indian time
console.log(today); // logs today's date and time in the console
// let search=document.getElementById("input");
// search.addEventListener("keypress",(e)=>{
//     if(e.key=="Enter"){
//         let value=document.getElementById("input").value;
//         let key="description"
//         fetchProducts(key,value)
//      console.log(value)   
//     }
// })
fetchApps()
async function fetchApps(){
    let apps=await fetch(`${baseURL}/admin/All_appoints?status=Pendding&status=Apporved&date=${formattedDate}`);
    let data= await apps.json();

    let dashRes=await  fetch(`${baseURL}/admin/All_appoints?date=${formattedDate}`);
    let dashData= await dashRes.json()
    let penddingData=dashData.filter((item)=>item.status==="Pendding")
    let completedData=dashData.filter((item)=>item.status==="Complete")
    let approvedData=dashData.filter((item)=>item.status==="Apporved")
    let cancledData=dashData.filter((item)=>item.status==="Cancel")

    let totalApps= dashData.length;
    let complete=completedData.length;
    let pendding=penddingData.length;
    let aprove=approvedData.length;
    let cancled=cancledData.length; 
    console.log(totalApps,pendding,aprove,complete,cancled) 
    dashFun(totalApps,pendding,aprove,complete,cancled)
    appsFun(data)
}

function dashFun(totalApps,pendding,aprove,complete,cancled){
  document.getElementById("total-apps").innerText=totalApps||0
  document.getElementById("pendding").innerText=pendding||0
  document.getElementById("approve").innerText=aprove||0
  document.getElementById("complete").innerText=complete||0
  document.getElementById("cancle").innerText=cancled||0
}

let mainDiv=document.getElementById("appointments-div")
function appsFun(data){
  mainDiv.innerHTML=""
    let allData=data.map((item)=>{
        if(item.status==="Pendding"){
            return `
            <div class="app-child-div" style="background: #ff9913;" data-aos="fade-up" data-aos-duration="1000" data-id=${item._id}>
                <div class="app-child-details">
                    <table>
                        <tr>
                          <th class="point">Client Email:</th>
                          <td class="text">${item.UserEmail}</td>
                        </tr>
                        <tr>
                          <th class="point">Time Slot:</th>
                          <td class="text">${item.slot}</td>
                        </tr>
                        <tr>
                          <th class="point">Date:</th>
                          <td class="text">${item.date}</td>
                        </tr>
                        <tr>
                          <th class="point">Styler Name:</th>
                          <td class="text">${item.Stylistname}</td>
                        </tr>
                      </table>
                      
                </div>
                <div class="app-child-button">
                    <button class="approve-btn" data-id=${item._id} style="display: block;" >Approved</button>
                    <button class="complete-tbn" data-id=${item._id} style="display: none;">Complete</button>
                    <button class="cancle-btn" data-id=${item._id} style="display: block;">Cancel</button>
                    <button class="completed" data-id=${item._id} style="display: none;">Completed</button>
                    <button class="canceled" data-id=${item._id} style="display: none;">Canceled</button>
                </div>
            </div>
            `
        }
       else if(item.status==="Apporved"){
            return `
            <div class="app-child-div" style="background: #ea7345;" data-aos="fade-up" data-aos-duration="1000" data-id=${item._id}>
                <div class="app-child-details">
                    <table>
                        <tr>
                          <th class="point">Client Email:</th>
                          <td class="text">${item.UserEmail}</td>
                        </tr>
                        <tr>
                          <th class="point">Time Slot:</th>
                          <td class="text">${item.slot}</td>
                        </tr>
                        <tr>
                          <th class="point">Date:</th>
                          <td class="text">${item.date}</td>
                        </tr>
                        <tr>
                          <th class="point">Styler Name:</th>
                          <td class="text">${item.Stylistname}</td>
                        </tr>
                      </table>
                      
                </div>
                <div class="app-child-button">
                    <button class="approve-btn" data-id=${item._id} style="display: none;" >Approved</button>
                    <button class="complete-tbn" data-id=${item._id} style="display: block;"">Complete</button>
                    <button class="cancle-btn" data-id=${item._id} style="display: block;">Cancel</button>
                    <button class="completed" data-id=${item._id} style="display: none;">Completed</button>
                    <button class="canceled" data-id=${item._id} style="display: none;">Canceled</button>
                </div>
            </div>
            `
        }
    })
    mainDiv.innerHTML=allData.join(" ")

    let apvBtn=document.querySelectorAll(".approve-btn");

    for(let btn of apvBtn){
      btn.addEventListener("click", (event)=>{
        let data_id=event.target.dataset.id;
        let status="Apporved";
        statusFun(data_id,status)
      })
    }

    let completeBtn=document.querySelectorAll(".complete-tbn");

    for(let btn of completeBtn){
      btn.addEventListener("click", (event)=>{
        let data_id=event.target.dataset.id;
        let status="Complete";
        statusFun(data_id,status)
      })
    }
    let cancleteBtn=document.querySelectorAll(".cancle-btn");

    for(let btn of cancleteBtn){
      btn.addEventListener("click", (event)=>{
        let data_id=event.target.dataset.id;
        let status="Cancel";
        statusFun(data_id,status)
      })
    }
}

async function statusFun(data_id,status){
  let statusRes=await fetch(`${baseURL}/admin/update/appointment/${data_id}`,{
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({status:status}),
  })
  let data= await statusRes.json();
  if(data.msg==="done"){
    fetchApps()
  }
}