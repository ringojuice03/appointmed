const patient = document.getElementById("patient-sign-in");
const doctor = document.getElementById("doctor-sign-in");
const select = document.getElementById("select-role");
var patientRole = false;
var doctorRole = false;

function selectPatientRole()
{
    patientRole = true;
    doctorRole = false;
}

function selectDoctorRole()
{
    doctorRole = true;
    patientRole = false;
}

function continueRole()
{
    if (patientRole == true)
    {
        switchToPatientSignIn();
    }
    else if (doctorRole == true)
    {
        switchToDoctorSignIn();
    }
    else
    {
        patientRole = false;
        doctorRole = false;
        switchToSelectRole();
    }
}

function switchToPatientSignIn()
{
    select.classList.add("hideMenu");
    doctor.classList.add("hideMenu");
    patient.classList.remove("hideMenu");
}

function switchToDoctorSignIn()
{
    select.classList.add("hideMenu");
    patient.classList.add("hideMenu");
    doctor.classList.remove("hideMenu");
}

function switchToSelectRole()
{
    patientRole = false;
    doctorRole = false;

    patient.classList.add("hideMenu");
    doctor.classList.add("hideMenu");
    select.classList.remove("hideMenu");
}