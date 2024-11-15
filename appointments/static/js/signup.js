const doctorFields = document.getElementById("doctor-fields");
var roleCheckField = document.getElementById("role-checkbox");

function showDoctorFields()
{
    if (roleCheckField.checked == true)
    {
        doctorFields.style.display = "block";
        roleCheckField.value = 'doctor';
    }
    else
    {
        doctorFields.style.display = "none";
        roleCheckField.value = 'patient'; 
    }
}