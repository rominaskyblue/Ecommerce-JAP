//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let firstname, secondname, secondsurname, surname, teléfono, email;
document.addEventListener("DOMContentLoaded", function (e) {
    firstname = document.getElementById("firstname");
    surname = document.getElementById("surname");
    secondsurname = document.getElementById("secondsurname");
    secondname = document.getElementById("secondname");
    teléfono = document.getElementById("teléfono");
    email = document.getElementById("email");
    recuperarValores();




    document.getElementById("guardarCambios").addEventListener("click", saveProfile);
});

function recuperarValores() {
    let storageData = window.localStorage.getItem("datauser");
    if (storageData !== null) {

        let dataProfile = JSON.parse(storageData);
        firstname.value = dataProfile.firstname;
        secondname.value = dataProfile.secondname;
        surname.value = dataProfile.surname;
        secondsurname.value = dataProfile.secondsurname;
        email.value = dataProfile.email;
        teléfono.value = dataProfile.teléfono;
    }

}
function saveProfile() {
    const newUser = {
        firstname: firstname.value,
        secondname: secondname.value,
        surname: surname.value,
        secondsurname: secondsurname.value,
        email: email.value,
        teléfono: teléfono.value
    }

    let profileuser = JSON.stringify(newUser);
    window.localStorage.setItem("datauser", profileuser);
    alert('Datos guardaros correctamente!');
}