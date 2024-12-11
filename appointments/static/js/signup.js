/*show additional doctor options*/
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

/*display filename and change button when file uploaded*/
const medicalLicenseButton = document.getElementById("medical-license-button");
const medicalLicenseField = document.getElementById("medical-license-field");
const fileUpload = document.getElementById("file-upload");
const changeButton = document.getElementById("change-button");
const attachFileIcon = document.getElementById("attach-file-icon");

medicalLicenseField.addEventListener('change', function()
{
    fileUpload.textContent = this.files[0].name;
    showChangeButton();
})

function showChangeButton()
{
    changeButton.classList.remove("hideMenu");
    medicalLicenseButton.style.cursor = "default";
    medicalLicenseButton.style.fontWeight = "500";

    attachFileIcon.src = "/static/images/file_attached_icon.png";
    attachFileIcon.style.backgroundColor = "#003249";
}