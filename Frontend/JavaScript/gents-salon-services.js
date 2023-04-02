const appointmentForm = document.querySelector("form");
appointmentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const serviceType = document.querySelector("#service-type").value;
    const bookDate = document.querySelector("#book-date").value;
    const city = document.querySelector("#city").value;
    const slotsAvailable = document.querySelector("#slots").value;
    bookAppointment( bookDate, city, slotsAvailable);
});


// <------- Booking Appointment of Stylers --------> 

let bookAppointment = ( date, city, slot) => {
    let token = localStorage.getItem("token");
    if (token) {
        let appointInfo = {
                city,
                date,
                slot
        }
        console.log(appointInfo)
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
            Authorization: localStorage.getItem("token"),
            "Content-Type":"application/json"
        },
        body: JSON.stringify(appointInfo)
    });
    let responseData = await response.json();
    console.log((responseData));
    let bookAppoinmentDiv = document.querySelector(".book-appointment");
    if(responseData.msg=="no slot avalibale"){
        bookAppoinmentDiv.innerHTML = `<div style={width:50%; margin: auto; align-items: centre}>
            <h1>No Slots Available</h1>
            <img src="https://www.pngmart.com/files/15/Empty-Cardboard-Box-PNG-Transparent-Image.png" width="300px"/>
        </div>`
    }
} 

 