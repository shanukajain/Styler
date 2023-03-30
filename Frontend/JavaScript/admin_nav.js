 let humbarger=document.querySelector(".hamburger");
humbarger.addEventListener("click",hamFun)
function hamFun(){
    let navbar= document.querySelector(".nav-bar");
    navbar.classList.toggle("active")
}
