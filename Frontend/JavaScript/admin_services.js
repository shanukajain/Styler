const data=[
    {_id:1,service_name:"Hair Cut",service_image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv7GDZpYPi3McAb2wJV7Mpov71flU_MJjp_g&usqp=CAU", service_price:300,styler_name:"Hari"},
    {_id:2,service_name:"Bread Triming",service_image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTSmjhMRTgyc0dFFb7p0Cr_wO0f_UJyuHzLR7AmV9Y9UamQJleL8FAxHYgo6mqYU0kNVc&usqp=CAU", service_price:300,styler_name:"Oman"},
    {_id:3,service_name:"Bread Shaving",service_image:"https://img.freepik.com/premium-photo/hairdresser-shaves-beard-man-with-razor-barbershop_72594-1749.jpg?w=2000", service_price:800,styler_name:"Bhavesh"},
    // {id:1,service_name:"Hair Cut",service_image:"", service_price:300,styler_name:"Oman"},
    // {id:1,service_name:"Hair Cut",service_image:"", service_price:300,styler_name:"Oman"},




]

let serviceDiv= document.getElementById("service-div")
function serviceData(){
    let allData=data.map((item)=>{
        return `<div class="service-child-div" data-id=${item._id}>
        <div class="service-img-div">
            <img src="${item.service_image}" alt="">
        </div>
        <div class="service-details-div">
            <div class="service-details-child-div" >

                <h1 class="edit-heading" data-id=${item._id} contenteditable="false">Beard Shaving</h1>
                <h2><span class="box">Price</span><span class="semi-colon">:</span>&#8377;<span data-id=${item._id} class="edit-price" contenteditable="false"> ${item.service_price}</span></h2>
                <h2><span class="box">Styler</span> <span class="semi-colon">:</span> <span class="edit-name" data-id=${item._id}  contenteditable="false">${item.styler_name}</span> </h2>
                <h2><span class="box">Currently</span> <span class="semi-colon">:</span> <span class="box"><i class="fa-solid fa-circle"></i>Available</span> </h2>
            </div>
            <div class="service-button-child-div">
                <button data-id=${item._id} class="edit-button" >Edit</button>
                <button data-id=${item._id} onclick="removeFun()">Remove</button>
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
}
serviceData()