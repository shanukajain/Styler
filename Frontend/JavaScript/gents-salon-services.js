const appointmentForm = document.querySelector("form");
appointmentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const serviceType = document.querySelector("#service-type").value;
    const bookDate = document.querySelector("#book-date").value;
    const city = document.querySelector("#city").value;
    const slotsAvailable = document.querySelector("#slots").value;
    bookAppointment(serviceType, bookDate, city, slotsAvailable);
});


let bookAppointment = async (serviceType, bookDate, city, slotsAvailable) => {
    let token = sessionStorage.getItem("token");
    if(token){
        console.log("Logged In")
    }else{
        let bookButton = document.querySelector("#book-button");
        bookButton.value = "Login First To Book Appointment";
        bookButton.style.backgroundColor="red";
    }
}