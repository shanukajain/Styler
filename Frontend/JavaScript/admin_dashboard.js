const baseURL = "https://long-blue-pronghorn-hat.cyclic.app";
async function logincheck(){
  let adminLoginToken=localStorage.getItem("admin-login-token")

  if(adminLoginToken===null){
    await swal("Your log-in session has expired. Login Again.", "", "error");
    window.location.href="admin_login.html";
    return;
  }
}

logincheck()




fetchApps()
async function fetchApps(){
  let today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate();

if (month < 10) {
  month = "0" + month;
}

if (day < 10) {
  day = "0" + day;
}

let formattedDate = year + "-" + month + "-" + day;
console.log(formattedDate)
    // let apps=await fetch(`${baseURL}/admin/All_appoints?status=Pendding&status=Apporved&date=${formattedDate}`,{
    //   method: "GET",
    //   headers: {
    //         "Content-Type": "application/json",
    //         Authorization: localStorage.getItem("admin-login-token")
    //       },
    // });
    // let data= await apps.json();

    let dashRes=await  fetch(`${baseURL}/admin/All_appoints?date=${formattedDate}`,{
      method: "GET",
      headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("admin-login-token")
          },
    });
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
    appsFun(dashData)
}

function dashFun(totalApps,pendding,aprove,complete,cancled){
  document.getElementById("total-apps").innerText=totalApps||0
  document.getElementById("pendding").innerText=pendding||0
  document.getElementById("approve").innerText=aprove||0
  document.getElementById("complete").innerText=complete||0
  document.getElementById("cancle").innerText=cancled||0
}

let mainDiv=document.getElementById("appointments-div")
function appsFun(dashData){
  mainDiv.innerHTML=""
    let allData=dashData.map((item)=>{
        if(item.status==="Pendding"){
            return `
            <div class="app-child-div" style="background: #ff9913;" data-aos="fade-up" data-aos-duration="1000" data-id=${item._id}>
                <div class="app-child-details">
                    <table>
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
       else if(item.status==="Complete"){
            return `
            <div class="app-child-div" style="background: #0f6e02;" data-aos="fade-up" data-aos-duration="1000" data-id=${item._id}>
                <div class="app-child-details">
                    <table>
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
                    <button class="complete-tbn" data-id=${item._id} style="display: none;">Complete</button>
                    <button class="cancle-btn" data-id=${item._id} style="display: none;">Cancel</button>
                    <button class="completed" data-id=${item._id} style="display: block;">Completed</button>
                    <button class="canceled" data-id=${item._id} style="display: none;">Canceled</button>
                </div>
            </div>
            `
        }
       else if(item.status==="Cancel"){
            return `
            <div class="app-child-div" style="background: #fc4828;" data-aos="fade-up" data-aos-duration="1000" data-id=${item._id}>
                <div class="app-child-details">
                    <table>
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
                    <button class="complete-tbn" data-id=${item._id} style="display: none;">Complete</button>
                    <button class="cancle-btn" data-id=${item._id} style="display: none;">Cancel</button>
                    <button class="completed" data-id=${item._id} style="display: none;">Completed</button>
                    <button class="canceled" data-id=${item._id} style="display: block;">Canceled</button>
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
        Authorization: localStorage.getItem("admin-login-token")
    },
    body: JSON.stringify({status:status}),
  })
  let data= await statusRes.json();
  if(data.msg==="done"){
    fetchApps()
  }
}