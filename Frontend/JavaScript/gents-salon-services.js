const appointmentForm = document.querySelector("form");
appointmentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const serviceType = document.querySelector("#service-type").value;
    const bookDate = document.querySelector("#book-date").value;
    const city = document.querySelector("#city").value;
    const slotsAvailable = document.querySelector("#slots").value;
    bookAppointment(bookDate, city, slotsAvailable);
});


// <------- Booking Appointment of Stylers --------> 

let bookAppointment = (date, city, slot) => {
    let token = localStorage.getItem("token");
    if (token) {
        let appointInfo = {
            city,
            date,
            slot
        }
        // console.log(appointInfo)
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
            "Content-Type": "application/json"
        },
        body: JSON.stringify(appointInfo)
    });
    let responseData = await response.json();
    // console.log((responseData));
    let bookAppoinmentDiv = document.querySelector(".book-appointment");
    if (responseData.msg == "no slot avalibale") {
        bookAppoinmentDiv.innerHTML = `<div style={width:50%; margin: auto; align-items: centre}>
            <h1>No Slots Available</h1>
            <img src="https://thumbs.dreamstime.com/b/vector-illustration-sad-face-emoticon-emoji-icon-isolated-white-background-121697371.jpg" width="300px"/>
        </div>`
    } else {
        let services = responseData.map((elem) => {
            // console.log(elem);
            return `<div class="slot-card" id=${elem._id}>
                        <div>
                            <h3>Styler Name: <span>${elem.Styler_name}</span></h3>
                            <h3>Mobile Number: <span>${elem.mob_no}</span></h3>
                            <h3>City: <span>${elem.city}</span></h3>
                            <h3>Salary: <span>Rs.${elem.salary}</span></h3>
                            <h3>Email: <span>${elem.email}</span></h3>
                        </div>
                        <div>
                            <button onclick="bookStyler()">Book Now</button>
                        </div>
                    </div>`
        })
        bookAppoinmentDiv.innerHTML = services;
    }
}


// <------- Booking Stylers For Hair Cut ---------> 

async function bookStyler(styler){
    let response = await fetch("http://localhost:9168/user/book", {
        method: "POST",
        headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type":"application/json"
        },
        body: JSON.stringify(styler)
    });
    let data = await response.json();
    console.log(data);
}
