let date=document.querySelector("#form-div form");
date.addEventListener("submit", dateFun);
function dateFun(event){
    event.preventDefault()
    let dateVal=document.getElementById("datetime").value;
    console.log(dateVal)
}

function statusFun(){
    let status=document.getElementById("select-status").value;
    if(status!=="null"){

        console.log(status)
    }
}