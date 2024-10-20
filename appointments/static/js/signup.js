const medicalLicenseField = document.getElementById("medical-license-field-cluster");
const specialtyField = document.getElementById("specialty-field-cluster");
const clinicAddressField = document.getElementById("clinic-address-field");

var roleCheckField = document.getElementById("role-check-field");

function showDoctorFields()
{
    if (roleCheckField.checked == true)
    {
        medicalLicenseField.classList.remove("hideMenu");
        specialtyField.classList.remove("hideMenu");
        clinicAddressField.classList.remove("hideMenu");
    }
    else
    {
        medicalLicenseField.classList.add("hideMenu");
        specialtyField.classList.add("hideMenu");
        clinicAddressField.classList.add("hideMenu");
    }
}