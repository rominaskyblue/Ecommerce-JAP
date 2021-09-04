//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var redirect = function () {
  window.location.href = "landing.html";
  return false;
}

document.addEventListener("DOMContentLoaded", function (e) {

  if(window.sessionStorage.getItem("session") !== null) {
    redirect();
  }

  document.getElementById('my-form').addEventListener("submit", function (e) {
    e.preventDefault(); // esto cancela el evento en cuestion (si es cancelable) 
    let email = document.getElementById("email").value;
    let hoy = new Date();
  var fecha = hoy.getDate() + '/' + (hoy.getMonth() + 1) + '/' + hoy.getFullYear();
  var hora = hoy.getHours()+ ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
  var fechaYHora = fecha + ' ' + hora;
  
  let user = JSON.stringify({email: email, lastAccess: fechaYHora});
    window.sessionStorage.setItem("session", user); 
  return redirect();
  }, false);
});