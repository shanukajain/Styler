
const baseURL="http://localhost:9168"
fetchStylers()

const addStyler=document.querySelector("#add-details-div form");

addStyler.addEventListener("submit",addFun)
async function addFun(event){
    event.preventDefault()
    let arr=[]
    let name=document.getElementById("name").value;
    let shift1=document.getElementById("shift_1").value;
    let shift2=document.getElementById("shift_2").value;
    let shift3=document.getElementById("shift_3").value;
    let city=document.getElementById("city").value;
    let email=document.getElementById("email").value;
    let mob_no=document.getElementById("mobile_no").value;
    let salary=document.getElementById("salary").value;
    if(mob_no.length!==10){
        return alert("Mobile Number Should be 10 Digits")
    }
    if(shift1!="not"){
        arr.push(shift1)
    }
    if(shift2!="not"){
        arr.push(shift2)
    }
    if(shift3!="not"){
        arr.push(shift3)
    }

    let obj={
        Styler_name: name,
        mob_no: mob_no,
        city:city,
        email:email,
        salary:salary,
        shift:[...arr]
    }
    console.log(obj)

    let add=await fetch(`${baseURL}/admin/create/styler`,{
        method: "POST",
            headers: {
                  "Content-Type": "application/json",
                //   Authorization: localStorage.getItem("token")
                },
                body: JSON.stringify(obj)

            },
            
    )
    add=await add.json()
    if(add.msg==="Style Added"){
        fetchStylers()
    }
}









// =============================search styler==========================================================  
let search=document.getElementById("input");
search.addEventListener("keypress",(e)=>{
    if(e.key=="Enter"){
        let value=document.getElementById("input").value;
        let key="Styler_name"
        fetchStylers(key,value)
    //  console.log(value)   
    }
})
// =============================fetch==========================================================  

async function fetchStylers(key,value){
    let res;
    if(key&&value){
    res= await fetch(`${baseURL}/admin/All_Stylers?${key}=${value}`);

    }else{
         res= await fetch(`${baseURL}/admin/All_Stylers`);

    }
    res=await res.json();
console.log(res)
    stylerFun(res)
}
let stylerDiv=document.getElementById("styler");

// =============================map styler==========================================================  

function stylerFun(res){
    stylerDiv.innerHTML="";
    let allStylers=res.map((item)=>{
        return `
        <div class="user-div" data-id=${item._id}>
                <div>
                    <img src="./Image/male-avatar-icon-flat.jpg" alt="user-avtar">
                </div>
                <div>
                    <h1 class="heading">${item.Styler_name}</h1>
                    <h3><span class="point">Shift 1:</span> <span class="shift_1">${item.shift[0]||"Not Avaliable"}</span></h3>
                    <h3><span class="point">Shift 2:</span> <span class="shift_2">${item.shift[1]||"Not Avaliable"}</span></h3>
                    <h3><span class="point">Shift 3:</span> <span class="shift_3">${item.shift[2]||"Not Avaliable"}</span></h3>
                        <h3><span class="point">Mobile No :</span> <span class="mobile">+91 ${item.mob_no}</span></h3>
                        <h3><span class="point">Salary :</span> <span class="salary">&#8377;${item.salary}</span></h3>
                        <button data-id=${item._id} class="edit-btn">Edit</button>
                        <button data data-id=${item._id} class="clock-btn">Remove</button>
                        <br>
                    </div>
            </div>
        `
    })
                    // <h3><span class="point">Email : </span> <span class="email">${item.email}</span></h3>

    stylerDiv.innerHTML=allStylers.join(" ")
    let edit_btn=document.querySelectorAll(".edit-btn")
    for( let btn of edit_btn){
        btn.addEventListener("click",(event)=>{
            let dataID=event.target.dataset.id;
            var parentDiv = event.target.parentElement.parentElement;
            var editableHeading = parentDiv.querySelector(".heading");
            var editableShift1=parentDiv.querySelector(".shift_1");
            var editableShift2=parentDiv.querySelector(".shift_2");
            var editableShift3=parentDiv.querySelector(".shift_3");
            var editableMobile = parentDiv.querySelector(".mobile");
            var editableSalary = parentDiv.querySelector(".salary");
            var editableEmail = parentDiv.querySelector(".email");
            var editButton = parentDiv.querySelector(".edit-btn");
          
            if (editButton.innerText === "Edit") {
              // Enable editing
              editableHeading.contentEditable = true;
              editableShift1.contentEditable=true;
              editableShift2.contentEditable=true;
              editableShift3.contentEditable=true;
              editableMobile.contentEditable=true;
              editableSalary.contentEditable = true;
              editableEmail.contentEditable = true;

              editableHeading.focus();
              editableShift1.focus();
              editableShift2.focus();
              editableShift3.focus();
              editableMobile.focus();
              editableSalary.focus();
              editableEmail.focus();
              editableMobile.addEventListener('input', restrictToNumbers);
              editableSalary.addEventListener('input', restrictToNumbers);

              editButton.innerText = "Save";
          } else {
              // Save changes and disable editing
              editableHeading.contentEditable = false;
              editableShift1.contentEditable = false;
              editableShift2.contentEditable = false;
              editableShift3.contentEditable = false;
              editableSalary.contentEditable = false;
              editableEmail.contentEditable = false;
              console.log(editableHeading.innerText,editableShift1.innerText,editableShift2.innerText,editableShift3.innerText)
          

              editableMobile.setAttribute('type', 'text');
              editableSalary.setAttribute('type', 'text');

              editButton.innerText = "Edit";
            }
        })
    }
    function restrictToNumbers(event) {
        // Get the entered value and remove any non-numeric characters
        const value = event.target.value.replace(/[^0-9]/g, '');
        
        // If the entered value is not a valid number, prevent the default behavior of the "input" event
        if (isNaN(value)) {
            event.preventDefault();
            return false;
        }
        
        // Update the field value with the restricted input
        event.target.value = value;
    }
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
    let res=await fetch(`${baseURL}/admin/delete/styler/${data_id}`,{
        method: "DELETE",
            headers: {
                  "Content-Type": "application/json",
                //   Authorization: localStorage.getItem("token")
                },
            },
    )
    res=await res.json()
    if(res.msg==="Style Deleted"){
     return fetchStylers()
    }
}