const baseURL = "https://long-blue-pronghorn-hat.cyclic.app";






let date=document.querySelector("#form-div form");
date.addEventListener("submit", dateFun);
function dateFun(event){
    event.preventDefault()
    let dateVal=document.getElementById("datetime").value;
    let status=document.getElementById("select-status").value;

    if (status !== "null") {
        // Parse the date input value and format it as "01-01-2023"
        
        fetchApps(status,dateVal)
      }
}


fetchApps()
async function fetchApps(status,formattedDate){
try {
    let res;
    if(status && formattedDate){
        res= await fetch(`${baseURL}/admin/All_appoints?date=${formattedDate}&status=${status}`,{
          method: "GET",
          headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("admin-login-token")
              },
        });

    }else{
        res= await fetch(`${baseURL}/admin/All_appoints`,{
          method: "GET",
          headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("admin-login-token")
              },
        });

    }
    let data=await res.json();
    console.log(data)
    appsFun(data)
} catch (error) {
    console.log(error)
}
}
{/* <tr>
<th class="point">Client Email:</th>
<td class="text">${item.UserEmail}</td>
</tr> */}
let appsDiv=document.getElementById("appointments-div");
function appsFun(data){
    appsDiv.innerHTML=""
    let allApps=data.map((item)=>{
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
            <div class="app-child-div" data-aos="fade-up" data-aos-duration="1000" data-id=${item._id}>
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
                    <button class="complete-tbn" data-id=${item._id} style="display: block;">Complete</button>
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
    appsDiv.innerHTML=allApps.join(" ");

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