logincheck()
  async function logincheck(){
  let LoginToken=localStorage.getItem("token")
console.log(LoginToken)
  if(LoginToken==null||undefined){
    // alert("Your log-in session has expired. Login Again");

    await swal("Your log-in session has expired. Login Again.", "", "error");
    // setTimeout( () => {
    //     window.location.href = "login_signup.html";
    //     // spinner.style.display = "none"; //!Spinner
    //   }, 12000);
    return window.location.href="login_signup.html";
    
  }
}


// Get the current date


// Set the minimum date for the input field
document.getElementById("book-date").setAttribute("min", nextDayFormatted);




// const appointmentForm = document.querySelector(".book-appointment form");
const appointmentForm = document.querySelector(".book-appointment form");

const baseURL="https://long-blue-pronghorn-hat.cyclic.app"

let rightDiv=document.getElementById("right-div");

appointmentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    var today = new Date();

// Add one day to the current date
var nextDay = new Date(today);
nextDay.setDate(today.getDate() );

// Format the date in yyyy-mm-dd format
var dd = nextDay.getDate();
var mm = nextDay.getMonth() + 1;
var yyyy = nextDay.getFullYear();
if (dd < 10) {
    dd = '0' + dd;
} 
if (mm < 10) {
    mm = '0' + mm;
} 
var nextDayFormatted = yyyy + '-' + mm + '-' + dd;
    const serviceType = document.querySelector("#service-type").value;
    const bookDate = document.querySelector("#book-date").value;
    const city = document.querySelector("#city").value;
    const slotsAvailable = document.querySelector("#slots").value;
    console.log(serviceType,bookDate,city,slotsAvailable)
    // bookAppointment(bookDate, city, slotsAvailable);
    let check=await  fetch(`${baseURL}/user/Check`,{
        method: "POST",
        headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token")
            },
            body: JSON.stringify({
                city:city,
                date:bookDate,
                slot:slotsAvailable
            })
    })
    let checkRes= await check.json();
    console.log(checkRes)
    if(checkRes.msg==="no slot avalibale"){
        return await swal("No slot avalibale.", "", "error");
    }else{
        console.log(checkRes[0])
        let bookDiv=document.querySelector(".book-appointment");
        rightDiv.innerHTML=""
        bookDiv.style.display="none"
        let allData=checkRes.map((item)=>{
            return `
            <div class="app-child-div" data-aos="fade-up" data-aos-duration="1000" data-id=${item._id}>
            <div class="app-child-details">
                <table>
                    <tr>
                      <th class="point">Styler Name:</th>
                      <td class="text">${item.Styler_name}</td>
                    </tr>
                    <tr>
                      <th class="point">City:</th>
                      <td class="text">${item.city}</td>
                    </tr>
                    <tr>
                      <th class="point">Email:</th>
                      <td class="text">${item.email}</td>
                    </tr>
                    <tr>
                      <th class="point">Mobile No:</th>
                      <td class="text">${item.mob_no}</td>
                    </tr>
                  </table>
                  
            </div>
            <div class="app-child-button">
                <button class="approve-btn" data-item=${JSON.stringify(item)} data-id=${item._id} style="display: block;" >Book</button>
            </div>
        </div>
            `
        })
        rightDiv.innerHTML=allData.join(" ")
        let booKbtn=document.querySelectorAll(".approve-btn");
        for (let brn of booKbtn){
            brn.addEventListener("click",async (event)=>{
                let item = JSON.parse(event.target.dataset.item)

                let obj={
                    UserID:1,
                    StylistID:1,
                    Stylistname:item.Styler_name,
                    date:bookDate,
                    slot:slotsAvailable,
                }
                console.log(obj)
                let book= await fetch(`${baseURL}/user/book`,{
                    method: "POST",
                    headers: {
                          "Content-Type": "application/json",
                          Authorization: localStorage.getItem("token")
                        },
                        body: JSON.stringify(obj)
                })
                let bookRes= await book.json()
                console.log(bookRes)
                if(bookRes.message==="Appointment booked"){
                    event.target.innerHTML = "Booked"
                     await swal("Appointment booked Successfully!", "You are now Registered!", "success");
                     window.location.href="index.html";
                     return;
                    }

            })
        }

     
    }
});


