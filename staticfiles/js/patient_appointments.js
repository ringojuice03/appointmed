const expandButtons = document.querySelectorAll('.expand-btn');

expandButtons.forEach((button) => {
    button.addEventListener('click', function () {
        const appointment = this.closest('.appointment'); // Get the closest appointment row
        const classList = Array.from(appointment.classList);
        const status = classList.find(e => e !== 'appointment');
        const isOpen = appointment.classList.contains('open');

        console.log(status);

        // Close all rows
        document.querySelectorAll('.appointment.open').forEach((openedAppointment) => {
            openedAppointment.classList.remove('open');
            openedAppointment.querySelector('.expand-btn').classList.remove('open');
            
            // Hide the cancel button upon closing
            if (status === 'pending') {
              const cancelButton = openedAppointment.querySelector('.cancel-btn');
              cancelButton.style.opacity = 0; 
              cancelButton.style.pointerEvents = 'none';
            }
        });

        // Toggle the open class only on the clicked row
        if (!isOpen) {
            appointment.classList.add('open');
            this.classList.add('open');
            
            // Show the cancel button after expansion
            if (status === 'pending' || status === 'scheduled') {
              const cancelButton = appointment.querySelector('.cancel-btn');
              cancelButton.style.opacity = 1;
              cancelButton.style.pointerEvents = 'auto';
            }
        }
    });
});


const filterButtons = document.querySelectorAll('.filter-button');
const appointmentList = document.querySelectorAll('.appointment');
const emptyMessage = document.querySelector('#empty-message');
var isAppointmentEmpty = true;
displayEmptyMessage(isAppointmentEmpty);

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    isAppointmentEmpty = true;
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    let filterID = button.id;
    console.log(filterID);

    appointmentList.forEach(item => item.style.display="none");
    appointmentList.forEach(item => {
      if (item.classList.contains(filterID)) {
        item.style.display = "block";
        isAppointmentEmpty = false;
      } 
      if (filterID === 'all' && appointmentList.length > 0) {
        item.style.display = "block";
        isAppointmentEmpty = false;
      } 
    });
    displayEmptyMessage(isAppointmentEmpty);
  }); 
});

appointmentList.forEach(item => {
  appointmentList.forEach(item => item.style.display="none");
  appointmentList.forEach(item => {
    if (item.classList.contains('pending')) {
      item.style.display = "block";
      isAppointmentEmpty = false;
    }
  });
  
  displayEmptyMessage(isAppointmentEmpty);
});

function displayEmptyMessage(isEmpty) {
  if (isEmpty) {
    emptyMessage.style.display = "block";
    console.log("Empty");
  } else {
    emptyMessage.style.display = "none";
    console.log("Not empty");
  }
}