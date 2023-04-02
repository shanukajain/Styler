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

        let res = await fetch(`${baseURL}/admin/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
                });
                let data = await res.json();
                if(data.msg==="Email already registered"){
                    return alert("Email already registered")
                }
                if (data.message === "Admin Register Sucessfull") {
                    return alert("Register Successfully");
                }else{
                    return alert("Try Again Later");
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
    let res= await fetch(`${baseURL}/admin/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(obj)
    })
    let datares=await res.json()
    if(datares.message==="Login Sucessfull"){
        console.log(datares.token)
        localStorage.setItem("admin-login-token",datares.token)
        alert(`Welcome Back`);
        window.location.href="admin_dashboard.html"
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