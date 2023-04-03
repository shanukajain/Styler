const baseURL = "https://long-blue-pronghorn-hat.cyclic.app";


// const data=[
//     {_id:1,service_name:"Hair Cut",service_image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv7GDZpYPi3McAb2wJV7Mpov71flU_MJjp_g&usqp=CAU", service_price:300,styler_name:"Hari"},
//     {_id:2,service_name:"Bread Triming",service_image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTSmjhMRTgyc0dFFb7p0Cr_wO0f_UJyuHzLR7AmV9Y9UamQJleL8FAxHYgo6mqYU0kNVc&usqp=CAU", service_price:300,styler_name:"Oman"},
//     {_id:3,service_name:"Bread Shaving",service_image:"https://img.freepik.com/premium-photo/hairdresser-shaves-beard-man-with-razor-barbershop_72594-1749.jpg?w=2000", service_price:800,styler_name:"Bhavesh"},
//     // {id:1,service_name:"Hair Cut",service_image:"", service_price:300,styler_name:"Oman"},
//     // {id:1,service_name:"Hair Cut",service_image:"", service_price:300,styler_name:"Oman"},




// ]
fetchServices()

const addStyler=document.querySelector("#add-details-div form");

addStyler.addEventListener("submit",addFun)
async function addFun(event){
    event.preventDefault()
    let name=document.getElementById("service-name").value;
    let img=document.getElementById("service-img").value;
    let category=document.getElementById("service-category").value;
    let price=document.getElementById("price").value;



    let obj={
        name:name,
        image:img,
        category:category,
        price:price,
        ForGender:"Male"
        // shift:[...arr]
    }
    console.log(obj)

    let add=await fetch(`${baseURL}/admin/styles/add`,{
        method: "POST",
            headers: {
                  "Content-Type": "application/json",
                  Authorization: localStorage.getItem("admin-login-token")
                },
                body: JSON.stringify(obj)

            },
            
    )
    let data=await add.json()
    if(data.msg==="New Style added"){
        fetchServices()
    }
}

async function fetchServices(){
    let res= await fetch(`${baseURL}/admin/styles`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("admin-login-token")
        }
    });

    let data=await res.json();
    console.log(data)
    serviceData(data)
}


let serviceDiv= document.getElementById("service-div")
function serviceData(data){
    serviceDiv.innerHTML="";
    let allData=data.map((item)=>{
        return `<div class="service-child-div" data-aos="fade-up" data-aos-duration="1000" data-id=${item._id}>
        <div class="service-img-div">
            <img src="${item.image}" alt="">
        </div>
        <div class="service-details-div">
            <div class="service-details-child-div" >

                <h1 class="edit-heading" data-id=${item._id} contenteditable="false">${item.name}</h1>
                <h2><span class="box">Price</span><span class="semi-colon">:</span>&#8377;<span data-id=${item._id} class="edit-price" contenteditable="false"> ${item.price}</span></h2>
                <h2><span class="box">Category</span> <span class="semi-colon">:</span> <span class="edit-name" data-id=${item._id}  contenteditable="false">${item.category}</span> </h2>
            </div>
            <div class="service-button-child-div">
                <button data-id=${item._id} class="edit-button" >Edit</button>
                <button data-id=${item._id} class="remove-button"  >Remove</button>
            </div>
        </div>
    </div>`
})
serviceDiv.innerHTML=allData.join(" ")

    let edit_btn= document.querySelectorAll(".edit-button");

    for( let btn of edit_btn){
        btn.addEventListener("click",(event)=>{
            let dataID=event.target.dataset.id;
            var parentDiv = event.target.parentElement.parentElement;
            var editableHeading = parentDiv.querySelector(".edit-heading");
            var editablePrice = parentDiv.querySelector(".edit-price");
            var editableName = parentDiv.querySelector(".edit-name");
            var editButton = parentDiv.querySelector(".edit-button");
          
            if (editButton.innerText === "Edit") {
              // Enable editing
              editableHeading.contentEditable = true;
              editablePrice.contentEditable = true;
              editableName.contentEditable = true;
              editableHeading.focus();
              editablePrice.focus();
              editableName.focus();
              editButton.innerText = "Save";
          } else {
              // Save changes and disable editing
              editableHeading.contentEditable = false;
              editablePrice.contentEditable = false;
              editableName.contentEditable = false;
              console.log(editableHeading.innerText,editableName.innerText,editablePrice.innerText)
          
              editButton.innerText = "Edit";
            }
        })
    }
    let remove_btn=document.querySelectorAll(".remove-button");

    for(let btn of remove_btn){
        btn.addEventListener("click",(event)=>{
            let data_id=event.target.dataset.id;
            console.log(data_id)
            removeFun(data_id)
        })
    }
}
// serviceData()

async function removeFun(data_id){
    try {
        let res= await fetch(`${baseURL}/admin/styles/delete/${data_id}`,{
            method: "DELETE",
            headers: {
                  "Content-Type": "application/json",
                  Authorization: localStorage.getItem("admin-login-token")
                },
                // body: JSON.stringify(obj)
        });
        let data= await res.json();
        console.log(data)
        if(data.msg==="New Style Delete"){
            fetchServices()
        }
    } catch (error) {
        alert(error)
    }
  
}