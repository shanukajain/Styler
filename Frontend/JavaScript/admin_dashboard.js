const baseURL = "http://localhost:9168";

// async function fetchFun(){
//     let res= await fetch(`${baseURL}/`)
// }
let today = new Date();
// let options = { timeZone: 'Asia/Kolkata' }; // set the time zone to India (GMT+5:30)
// let todayFormatted = today.toLocaleString('en-IN', options); // format the date and time in Indian time
console.log(today); // logs today's date and time in the console
let search=document.getElementById("input");
search.addEventListener("keypress",(e)=>{
    if(e.key=="Enter"){
        let value=document.getElementById("input").value;
        let key="description"
        fetchProducts(key,value)
     console.log(value)   
    }
})

async function fetchApps(){
    let apps=await fetch(`${baseURL}/admin/All_appoints?status=Pendding`);
    let data= await apps.json();

    appsFun(data)
}

function appsFun(data){
    let allData=data.map((item)=>{
        if(item.status){
            return `
            <div class="app-child-div">
                <div class="app-child-details">
                    <table>
                        <tr>
                          <th class="point">Client Email:</th>
                          <td class="text">${item.UserEmail}</td>
                        </tr>
                        <tr>
                          <th class="point">Time Slot:</th>
                          <td class="text">${item.slot}/td>
                        </tr>
                        <tr>
                          <th class="point">Date:</th>
                          <td class="text">${item}</td>
                        </tr>
                        <tr>
                          <th class="point">Styler Name:</th>
                          <td class="text">Harish</td>
                        </tr>
                        <tr>
                          <th class="point">City :</th>
                          <td class="text">Kolkata</td>
                        </tr>
                      </table>
                      
                </div>
                <div class="app-child-button">
                    <button class="approve-btn">Approved</button>
                    <button class="complete-tbn">Complete</button>
                    <button class="cancle-btn">Cancel</button>
                    <button class="completed">Completed</button>
                    <button class="canceled">Canceled</button>
                </div>

            </div>
            `
        }
    })
}