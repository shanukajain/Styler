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

    let otpRes= await otp.json();
    console.log(otpRes)


    if(otpRes.msg==="Email already registered") {
        return alert("You Are Already Registered")
    }
     if (otpRes.msg !== "Email already registered"){

        $("#otpModal").modal("show");
        document.getElementById("otpSubmit").addEventListener("click",async ()=>{
            let otpValue=document.getElementById("otpInput").value;
            if(otpValue==otpRes.OTP){
                let res = await fetch(`${baseURL}/user/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(obj),
                    });
                    let data = await res.json();
                    if (data.message === "User Register Sucessfull") {
                         alert("Register Successfully");
                        window.location.href="login_signup.html"
                        return;
                    }else{
                        return alert("Try Again Later");
                    }
            }
            else{
                alert("Worng OTP")
                window.location.href="login_signup.html"
                return;
            }
        })
        
        
    }

  } catch (error) {
    console.log(error);
    alert("An error occurred. Please try again later.");
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
        localStorage.setItem("token",datares.token)
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