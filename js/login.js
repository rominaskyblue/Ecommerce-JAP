//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

document.getElementById("signIn").onclick = function(e){
    console.log("entre")
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    if(email === ""){
        alert("Email must be filled out");
        return false;
    }
    if(password === ""){
        alert("Password must be filled out");
        return false;
    }
    location.href = "landing.html";
  };
});