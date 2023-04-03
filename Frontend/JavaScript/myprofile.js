
const baseURL = "https://long-blue-pronghorn-hat.cyclic.app";

let profileDiv=document.getElementById("profile-div");
async function myProfileFun(){

    let res= await fetch(`${baseURL}/user/userInfo?email=${localStorage.getItem("email")}`)
    let data= await res.json();

    console.log(data[0])
    let item=data[0]
    let render=`<div class="container">
    <div class="main-body">
    <div class="row">
    <div class="col-lg-4">
    <div class="card">
    <div class="card-body">
    <div class="d-flex flex-column align-items-center text-center">
    <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Admin" class="rounded-circle p-1 bg-primary" width="110">
    <div class="mt-3">
    <h4>${item.name}</h4>
    </div>
    </div>
    <hr class="my-4">
    
    </div>
    </div>
    </div>
    <div class="col-lg-8">
    <div class="card">
    <div class="card-body">
    <div class="row mb-3">
    <div class="col-sm-3">
    <h6 class="mb-0">Full Name</h6>
    </div>
    <div class="col-sm-9 text-secondary">
    <input type="text" class="form-control" value="${item.name}">
    </div>
    </div>
    <div class="row mb-3">
    <div class="col-sm-3">
    <h6 class="mb-0">Email</h6>
    </div>
    <div class="col-sm-9 text-secondary">
    <input type="text" class="form-control" value="${item.email}">
    </div>
    </div>
    <div class="row mb-3">
    <div class="col-sm-3">
    <h6 class="mb-0">Mobile</h6>
    </div>
    <div class="col-sm-9 text-secondary">
    <input type="text" class="form-control" value="+91 ${item.mob_no}">
    </div>
    </div>
    <div class="row">
    <div class="col-sm-3"></div>
    <div class="col-sm-9 text-secondary">
    <input type="button" style="background: #7e0814;" id="logout" class="btn btn-primary px-4" value="Logout">
    </div>
    </div>
    </div>
    </div>
    <div class="row">
    <div class="col-sm-12">
    <div class="card">`

    profileDiv.innerHTML=render;

    let logout=document.getElementById("logout");
    logout.addEventListener("click",async ()=>{
        console.log("Ho gaya")
        swal({
            title: "Are you sure?",
            // text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("You Are Logging Out", {
                icon: "success",
              });
              localStorage.removeItem("email");
              localStorage.removeItem("token");
              window.location.href="index.html"
            } else {
              swal("Thanks for staying with us!");
            }
          });
    })
}
myProfileFun()