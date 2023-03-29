const baseURL="https://localhost:9168/user"
let signup= document.querySelector( ".signup-form form");
// const signup = document.getElementsByTagName("form:nth-child(2)")
signup.addEventListener("submit", async (event)=>{
    event.preventDefault();
    let name= document.querySelector('.signup-name').value;
    let mob_no= document.querySelector('.signup-number').value;
    let email= document.querySelector('.signup-email').value;
    let password= document.querySelector('.signup-password').value;
    // let confirm_password= document.querySelector(".confirm-password").value;
    // if(password!=confirm_password){
    //     return alert("Password not matching")
    //     // return passMissMatch()
    // }
    let obj={
        email: email,
    name: name,
    mob_no: mob_no,
    gender:"male",
    password: password,
    // role: String
    }
    let res= await fetch(`${baseURL}/register`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(obj)
    })
    // console.log(name,mob_no,email,password)
    res= await res.json()
    if(res.msg==="Email already registered"){
      return  alert("Email already registered")
    }
    if(res.message==="User Register Sucessfull"){
        return alert("Register Successfully")
    }
    if(res.msg!=="Email already registered"||res.message!=="User Register Sucessfull"){
        return alert("Try Again Later")
    }
})



let login=document.querySelector(".login-form form")
login.addEventListener("submit", loginFun)

async function loginFun(event){
    event.preventDefault();

    let name= document.querySelector('.login-email').value;
    let password= document.querySelector('.login-password').value;
    console.log(name,password)
    let obj={
        email,
        password
    }
    let res= await fetch(`${baseURL}/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(obj)
    })
    res=await res.json()
    if(res.message==="Login Sucessfull"){
        localStorage.setItem("login-token",res.token)
        alert(`Welcome Back ${name}`);
        window.location.href="index.html"
        return;
    }
    if(res.message==="Sign Up First"){
       return alert("Create Your Account First")
    }
    if(res.message!=="Login Sucessfull"||res.message!=="Sign Up First"){
        return alert("Try Again Later")
    }
}