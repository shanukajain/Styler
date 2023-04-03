function hamFun(){
    let navbar= document.querySelector(".nav-bar");
    navbar.classList.toggle("active")
}
// liFun()

// function liFun(){
//     let email=localStorage.getItem("email")
//     let token=localStorage.getItem("token");
//     console.log(email,token)
//     let myprofile= document.getElementById("my-pro")
//     let login_signup= document.getElementById("log-sign")

//     if(email===null ||token===null ){
//         login_signup.style.display="block"
//         myprofile.style.display="none"

//     }
//     else if(email!==null &&token!==null ){
//         login_signup.style.display="none"
//         myprofile.style.display="block"

//     }
// }