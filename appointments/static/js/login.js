const patient = document.getElementById("patient-log-in");
const doctor = document.getElementById("doctor-log-in");
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
        switchToPatientLogIn();
    }
    else if (doctorRole == true)
    {
        switchToDoctorLogIn();
    }
    else
    {
        patientRole = false;
        doctorRole = false;
        switchToSelectRole();
    }
}

function switchToPatientLogIn()
{
    select.classList.add("hideMenu");
    doctor.classList.add("hideMenu");
    patient.classList.remove("hideMenu");
}

function switchToDoctorLogIn()
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