const appointmentForm = document.querySelector("form");
appointmentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const serviceType = document.querySelector("#service-type").value;
    const bookDate = document.querySelector("#book-date").value;
    const city = document.querySelector("#city").value;
    const slotsAvailable = document.querySelector("#slots").value;
    bookAppointment(serviceType, bookDate, city, slotsAvailable);
});


// <------- Booking Appointment of Stylers --------> 

let bookAppointment = (serviceType, bookDate, city, slotsAvailable) => {
    let token = localStorage.getItem("token");
    if (token) {
        let appointInfo = {
            serviceType,
            bookDate,
            city,
            slotsAvailable
        }
        checkAvailability(appointInfo);
    } else {
        let bookButton = document.querySelector("#book-button");
        bookButton.value = "Login First To Book Appointment";
        bookButton.style.backgroundColor = "red";
    }
}

// <----- Checking Availabilty of Stylers ---------> 

let checkAvailability = async (appointInfo) => {
    let response = await fetch("http://localhost:9168/user/Check", {
        method: "POST",
        headers: {
            Authorization: localStorage.getItem("token")
        },
        body: JSON.stringify(appointInfo)
    });
    let responseData = await response.json();
    let bookAppoinmentDiv = document.querySelector(".book-appointment");
    bookAppoinmentDiv.innerHTML = responseData.msg;
} 

 