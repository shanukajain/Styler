const baseURL="https://localhost:9168"

// async function fetchFun(){
//     let res= await fetch(`${baseURL}/`)
// }
let today = new Date();
// let options = { timeZone: 'Asia/Kolkata' }; // set the time zone to India (GMT+5:30)
// let todayFormatted = today.toLocaleString('en-IN', options); // format the date and time in Indian time
console.log(today); // logs today's date and time in the console
let search=document.getElementById("input");
search.addEventListener("keypress",(e)=>{
    if(e.key=="Enter"){
        let value=document.getElementById("input").value;
        let key="description"
        fetchProducts(key,value)
     console.log(value)   
    }
})