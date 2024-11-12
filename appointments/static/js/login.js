const logIn = document.getElementById("log-in");
const userType = document.getElementById("user-type");
const select = document.getElementById("select-role");
const patientButton = document.getElementById("patient-button");
const doctorButton = document.getElementById("doctor-button");
const patientLabel = document.getElementById("patient-label");
const doctorLabel = document.getElementById("doctor-label");
var patientRole = false;
var doctorRole = false;

function selectPatientRole()
{
    if (patientButton.classList.contains("roleButtonClicked"))
    {
        patientRole = false;
        doctorRole = false;

        patientButton.classList.remove("roleButtonClicked");
        doctorButton.classList.remove("roleButtonClicked");
        patientLabel.style.color = "#ffffff";
        doctorLabel.style.color = "#ffffff";
    }
    else
    {
        patientRole = true;
        doctorRole = false;

        patientButton.classList.add("roleButtonClicked");
        doctorButton.classList.remove("roleButtonClicked");
        patientLabel.style.color = "#21769c";
        doctorLabel.style.color = "#ffffff";
    }
}

function selectDoctorRole()
{
    if (doctorButton.classList.contains("roleButtonClicked"))
    {
        doctorRole = false;
        patientRole = false;

        doctorButton.classList.remove("roleButtonClicked");
        patientButton.classList.remove("roleButtonClicked");
        doctorLabel.style.color = "#ffffff";
        patientLabel.style.color = "#ffffff";
    }
    else
    {
        doctorRole = true;
        patientRole = false;

        doctorButton.classList.add("roleButtonClicked");
        patientButton.classList.remove("roleButtonClicked");
        doctorLabel.style.color = "#21769c";
        patientLabel.style.color = "#ffffff";
    }
}

function continueRole()
{
    if (patientRole == true)
    {
        userType.value = "patient";
        switchToLogIn();
    }
    else if (doctorRole == true)
    {
        userType.value = "doctor";
        switchToLogIn();
    }
    else
    {
        patientRole = false;
        doctorRole = false;
        switchToSelectRole();
    }
}

function switchToLogIn()
{
    select.classList.add("hideMenu");
    logIn.classList.remove("hideMenu");

    doctorButton.classList.remove("roleButtonClicked");
    patientButton.classList.remove("roleButtonClicked");
    doctorLabel.style.color = "#ffffff";
    patientLabel.style.color = "#ffffff";

    //check();
}

function switchToSelectRole()
{
    patientRole = false;
    doctorRole = false;

    logIn.classList.add("hideMenu");
    select.classList.remove("hideMenu");
}

//check selected role

/*function check()
{
    if (userType.value == "patient")
        alert("login for patient");
    else if (userType.value == "doctor")
        alert("login for doctor");
    else
        alert("error");
}*/