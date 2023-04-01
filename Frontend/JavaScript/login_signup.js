// const baseURL="https://localhost:9168"
// let signup= document.querySelector( ".signup-form form");
// // const signup = document.getElementsByTagName("form:nth-child(2)")
// signup.addEventListener("submit", async (event)=>{
//     event.preventDefault();
//     let name= document.querySelector('.signup-name').value;
//     let mob_no= document.querySelector('.signup-number').value;
//     let email= document.querySelector('.signup-email').value;
//     let password= document.querySelector('.signup-password').value;
//     // let confirm_password= document.querySelector(".confirm-password").value;
//     // if(password!=confirm_password){
//     //     return alert("Password not matching")
//     //     // return passMissMatch()
//     // }
//     let obj={
//         email: email,
//     name: name,
//     mob_no: mob_no,
//     gender:"male",
//     password: password,
//     // role: String
//     }
//     let res= await fetch(`${baseURL}/user/register`,{
//         method:"POST",
//         headers:{
//             "Content-Type":"application/json"
//         },
//         body:JSON.stringify(obj)
//     })
//     // console.log(name,mob_no,email,password)
//     res= await res.json()
//     // if(res.msg==="Email already registered"){
//     //   return  alert("Email already registered")
//     // }
//     if(res.message==="User Register Sucessfull"){
//         return alert("Register Successfully")
//     }
//     // if(res.msg!=="Email already registered"||res.message!=="User Register Sucessfull"){
//     //     return alert("Try Again Later")
//     // }
// })

const baseURL = "http://localhost:9168";
let signupForm = document.querySelector(".signup-form form");
signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  let name = document.querySelector(".signup-name").value;
  let mob_no = document.querySelector(".signup-number").value;
  let email = document.querySelector(".signup-email").value;
  let password = document.querySelector(".signup-password").value;
  let obj = {
    email: email,
    name: name,
    mob_no: mob_no,
    gender: "male",
    password: password,
  };
  try {

    let otp=await fetch(`${baseURL}/user/OTP?email=${email}`)
    // ,{
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     // body: email,
    // })
    let otpRes= await otp.json();
    console.log(otpRes)
    if(otpRes.msg==="Email already registered") {
        return alert("You Are Already Registered")
    }else{
        document.getElementById("otpSubmit").addEventListener("click",async ()=>{
            let otpValue=document.getElementById("otpInput").value;
            if(otpValue==otpRes.OTP){
                // let res = await fetch(`${baseURL}/user/register`, {
                let res = await fetch(`${baseURL}/user/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(obj),
                    });
                    let data = await res.json();
                    if (data.message === "User Register Sucessfull") {
                        return alert("Register Successfully");
                    }else{
                        return alert("Try Again Later");
                    }
            }
            else{
              return  alert("Worng OTP")
            }
        })
        
        
    }

  } catch (error) {
    console.log(error);
    // alert("An error occurred. Please try again later.");
  }
});


let login=document.querySelector(".login-form form")
login.addEventListener("submit", loginFun)

async function loginFun(event){
    event.preventDefault();

    let name= document.querySelector('.login-email').value;
    let password= document.querySelector('.login-password').value;
    console.log(name,password)
    let obj={
        email:name,
        password
    }
    let res= await fetch(`${baseURL}/user/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(obj)
    })
    let datares=await res.json()
    if(datares.message==="Login Sucessfull"){
        console.log(datares.token)
        localStorage.setItem("login-token",datares.token)
        alert(`Welcome Back`);
        window.location.href="index.html"
        return;
    }
    if(datares.message==="Wrong Password"){
        return alert("Wrong Credentials")
    }
    if(datares.message==="Sign Up First"){
       return alert("Create Your Account First")
    }
    if(datares.message!=="Login Sucessfull"||datares.message!=="Sign Up First"||datares.message!=="Wrong Password"){
        return alert("Try Again Later")
    }
}