document.addEventListener('DOMContentLoaded', function () {
  const expandButtons = document.querySelectorAll('.expand-btn');

  expandButtons.forEach((button) => {
      button.addEventListener('click', function () {
          const appointment = this.closest('.appointment'); // Get the closest appointment row
          const isOpen = appointment.classList.contains('open');

          // Close all rows
          document.querySelectorAll('.appointment.open').forEach((openedAppointment) => {
              openedAppointment.classList.remove('open');
              openedAppointment.querySelector('.expand-btn').classList.remove('open'); // Reset expand button rotation
              
              // Hide the cancel button during collapse animation
              const cancelButton = openedAppointment.querySelector('.cancel-btn');
              cancelButton.style.opacity = 0; // Make cancel button invisible
              cancelButton.style.pointerEvents = 'none'; // Disable interaction with the cancel button
          });

          // Toggle the open class only on the clicked row
          if (!isOpen) {
              appointment.classList.add('open');
              this.classList.add('open'); // Rotate the expand button
              
              // Show the cancel button after expansion
              const cancelButton = appointment.querySelector('.cancel-btn');
              cancelButton.style.opacity = 1; // Make cancel button visible
              cancelButton.style.pointerEvents = 'auto'; // Enable interaction with the cancel button
          }
      });
  });
});


// Select all filter buttons
const filterButtons = document.querySelectorAll('.filter-button');

// Add event listeners to each button
filterButtons.forEach(button => {
button.addEventListener('click', () => {
  // Remove 'active' class from all buttons
  filterButtons.forEach(btn => btn.classList.remove('active'));
  // Add 'active' class to the clicked button
  button.classList.add('active');
});
});
