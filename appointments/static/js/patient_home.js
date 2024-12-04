/*user menu*/
const notificationMenu = document.getElementById("notification-menu");
const userMenu = document.getElementById("user-menu");

function showNotificationMenu()
{
  if (notificationMenu.classList.contains('hideMenu'))
  {
    notificationMenu.classList.remove('hideMenu');
    userMenu.classList.add('hideMenu');
  }
  else
    notificationMenu.classList.add('hideMenu');
}

function showUserMenu()
{
  if (userMenu.classList.contains('hideMenu'))
  {
    userMenu.classList.remove('hideMenu');
    notificationMenu.classList.add('hideMenu');
  }
  else
    userMenu.classList.add('hideMenu');
}

/*doctor card expansion*/
var previousDoctor = -1;
let previousDoctorID = null;

function cardExpansion(doctorId)
{
    const doctor = document.getElementsByName(doctorId)[0];

    if (doctor.children[0].classList.contains("hidden"))
    {
        doctor.classList.remove("expanded");
        doctor.children[1].classList.add("hidden");
        doctor.children[0].classList.remove("hidden");
    }
    else
    {
        /*unexpand previously expanded card when expanding another*/
        if (previousDoctor >= 0)
        {
          const previousCard = document.getElementsByName(previousDoctor)[0];
          previousCard.classList.remove("expanded");
          previousCard.children[1].classList.add("hidden");
          previousCard.children[0].classList.remove("hidden");
        }

        doctor.classList.add("expanded");
        doctor.children[0].classList.add("hidden");
        doctor.children[1].classList.remove("hidden");
        initializeCalendar(doctorId);
        previousDoctor = doctorId;
    }
}


/*----------calendar js----------*/
var weekView = null;
csrfToken = document.querySelector("meta[name='csrf-token']").content;
var has_selected = false;
// const schedule_btn = document.getElementById("set-schedule-btn");

function initializeCalendar(doctor_id)
{   
    has_selected = false;
    let selectedDate = document.querySelector('h1[id="selected-date' + doctor_id + '"]');
    let selectedTime = document.querySelector('h1[id="selected-time' + doctor_id + '"]');
    let bookButton = document.querySelector('button[id="bookButton' + doctor_id + '"]');

    bookButton.addEventListener("click", handleBookButton);

    if (weekView) {
        weekView.dispose();

        previousSelectedDate = document.querySelector('h1[id="selected-date' + previousDoctor + '"]');
        previousSelectedTime = document.querySelector('h1[id="selected-time' + previousDoctor + '"]');
        previousBookBtn = document.querySelector('button[id="bookButton' + previousDoctor + '"]');

        previousSelectedDate.innerHTML = "Select date";
        previousSelectedTime.innerHTML = "Select time";

        previousBookBtn.classList.remove('active');
        previousBookBtn.removeEventListener("click", handleBookButton);
    }

    weekView = new DayPilot.Calendar(String(doctor_id), { 
        viewType: "Week",
        startDate: getStartOfWeek(new Date()),
    });
    console.log("Minji so yeppuda");
    
    console.log(doctor_id);

    fetch(patientCalendarAPI, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ doctorID: doctor_id }),
    })
    .then(response => response.json())
    .then(taken_slot => {
        past_slot = [];
        const now = new DayPilot.Date();
        const startOfWeek = DayPilot.Date(weekView.startDate);
        current = startOfWeek;

        while (current < now) {
            past_slot.push({
                start: current.toString(),
                end: current.addMinutes(30).toString(),
                backColor: "#808080",       
                barHidden: true,           
                borderColor: "#808080",     
                toolTip: "Past time slot.",
            });
            current = current.addMinutes(30);
        } 

        unavailable_slot = taken_slot.map(event => ({
            ...event,
            backColor: "#f8d7da",       
            barHidden: true,           
            borderColor: "#f5c6cb",     
            toolTip: "Unavailable time slot.",
        }));
        
        unavailable_slot = [...unavailable_slot, ...past_slot];

        weekView.events.list = unavailable_slot;

        weekView.width = "100%";
        weekView.cellHeight = 50;
        weekView.headerHeight = 25;

        weekView.init();
    });

    function getStartOfWeek(date) {
        const startOfWeek = new Date(date);
        const day = startOfWeek.getDay(); 
    
        startOfWeek.setDate(startOfWeek.getDate() - day);
        startOfWeek.setHours(0, 0, 0, 0); 
        startOfWeek.setHours(startOfWeek.getHours() + 8);
    
        return new DayPilot.Date(startOfWeek);
    }
    
    function handleBookButton() {
        if (has_selected) {
            alert("Booking successful.");
            window.location.href = patientBookingAPI;
        } else {
            alert("You haven't selected a time slot yet.");
        }
    };

    weekView.onEventMove = function (args) {
        args.preventDefault();
    };
    
    weekView.onEventClicked = function (args) {
        if (args.e.data.id !== "temp-selected") {
            console.log(args.e.data.id);
            alert('You cannot select unavailable time slots');  
        }
    };
    
    weekView.onTimeRangeSelected = function (args) {
        has_selected = true;
        weekView.events.list = weekView.events.list.filter(e => e.id !== "temp-selected");
        //selected time slot is green
        weekView.events.add({
            id: "temp-selected",
            start: args.start,
            end: args.end,
            backColor: "#d4edda",
            barHidden: true,
            borderColor: "#c3e6cb",
        });
        weekView.update();
        console.log("Args start: ", args.start);
        console.log("Type of Args start: ", typeof args.start);

        let nativeDate = (args.start).toDate();
        nativeDate.setHours(nativeDate.getHours() - 8);

        const formattedDate = Intl.DateTimeFormat('en-US', {
            month: "long",
            day: "numeric",
            year: "numeric",
        }).format(nativeDate);


        let nativeHour = nativeDate.getHours() % 12 || 12;
        let nativeMinute = nativeDate.getMinutes().toString().padStart(2, "0");
        
        console.log("Type of native hour: ", typeof nativeHour);
        
        nativeDate.setMinutes(nativeDate.getMinutes() + 30);
        const endTime = Intl.DateTimeFormat('en-US', {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        }).format(nativeDate);
        
        const formattedTime = `${nativeHour}:${nativeMinute} - ${endTime}`;

        selectedDate.innerHTML = formattedDate;
        selectedTime.innerHTML = formattedTime;

        bookButton.classList.add('active');

        console.log("Args start: ", args.start);
        console.log("Args end: ", args.end);
    };

}



/*----------specialty sidebar----------*/
const specialtyList = document.querySelectorAll("#specialization-list li a");
const doctorList = document.querySelectorAll(".doctor-link");

if (specialtyList.length > 0) {
  specialtyList[0].classList.add("selected");
  displaySpecialty(specialtyList[0].textContent.trim());
}

specialtyList.forEach(specialty => {
  specialty.addEventListener("click", function(event) {
      event.preventDefault();
      
      specialtyList.forEach(item => item.classList.remove("selected"));
      this.classList.add("selected");

      displaySpecialty(this.textContent.trim());

      console.log(this.textContent);
  });
});

function displaySpecialty(selected_specialty) {
  doctorList.forEach(card => {
      const specialty = card.getAttribute("doctor-specialty");
      if (specialty === selected_specialty) {
          card.style.display = 'block';
      } else {
          card.style.display = 'none';
      }
  });
}