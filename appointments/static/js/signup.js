const doctorFields = document.getElementById("doctor-fields");
const checkbox = document.getElementById("role-checkbox");
var roleCheckField = document.getElementById("role-checkbox");

function showDoctorFields(checkbox)
{
    if (roleCheckField.checked == true)
    {
        doctorFields.style.display = "block";
        checkbox.value = 'doctor'
    }
    else
    {
        doctorFields.style.display = "none";
        checkbox.value = 'patient'
    }
}