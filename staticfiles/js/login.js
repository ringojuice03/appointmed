/*for login page functionality*/
const userType = document.getElementById("user-type");
const logIn = document.getElementById("log-in");
const select = document.getElementById("select-role");
const logInMessage = document.getElementById("logInMessage")

/*check if role select should be displayed; 
role is stored in browser indefinitely*/
if (localStorage.getItem("savedUserType") == "patient" || localStorage.getItem("savedUserType") == "doctor")
{
    userType.value = localStorage.getItem("savedUserType");
    switchToLogIn();
}
else
{
    userType.value = "";
    switchToSelectRole();
}

function selectPatientRole()
{
    savedUserType = localStorage.setItem("savedUserType", "patient");
    userType.value = "patient";
    switchToLogIn();
}

function selectDoctorRole()
{
    savedUserType = localStorage.setItem("savedUserType", "doctor");
    userType.value = "doctor";
    switchToLogIn();
}

function switchToLogIn()
{
    if (localStorage.getItem("savedUserType") == "patient")
        logInMessage.innerHTML = "Log in as patient";
    else if (localStorage.getItem("savedUserType") == "doctor")
        logInMessage.innerHTML = "Log in as doctor";
    
    select.classList.add("hideMenu");
    logIn.classList.remove("hideMenu");
}

function switchToSelectRole()
{
    logIn.classList.add("hideMenu");
    select.classList.remove("hideMenu");
}

/*for styling buttons when hovered*/
const patientButtonContainer = document.getElementById("patient-button-container");
const patientButton = document.getElementById("patient-button");
const patientLabel = document.getElementById("patient-label");
const doctorButtonContainer = document.getElementById("doctor-button-container");
const doctorButton = document.getElementById("doctor-button");
const doctorLabel = document.getElementById("doctor-label");

patientButton.onmouseover = function()
{
    patientButtonContainer.style.backgroundColor = "#fff";
    patientButton.style.color = "#21769c"; /*change icon instead*/
    patientLabel.style.color = "#21769c";
};

patientButton.onmouseout = function()
{
    patientButtonContainer.style.backgroundColor = "transparent";
    patientButton.style.color = "black"; /*change icon instead*/
    patientLabel.style.color = "#fff";
};

doctorButton.onmouseover = function()
{
    doctorButtonContainer.style.backgroundColor = "#fff";
    doctorButton.style.color = "#21769c"; /*change icon instead*/
    doctorLabel.style.color = "#21769c";
};

doctorButton.onmouseout = function()
{
    doctorButtonContainer.style.backgroundColor = "transparent";
    doctorButton.style.color = "black"; /*change icon instead*/
    doctorLabel.style.color = "#fff";
};

//check selected role (onclick on login button)
/*
function check()
{
    if (userType.value == "patient")
        alert("login for patient");
    else if (userType.value == "doctor")
        alert("login for doctor");
    else
        alert("error");
}*/