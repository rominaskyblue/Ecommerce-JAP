const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";



var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}
var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var logOut = function(){
  window.sessionStorage.removeItem("session");
  window.location.href = "index.html";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
document.addEventListener("DOMContentLoaded", function (e) {

  let miPerfil = document.getElementById("user");
  let userJSON = window.sessionStorage.getItem("session");

  if( userJSON !== null) {
    let user = JSON.parse(userJSON);
    let username = user.email.split("@")[0];
    window.sessionStorage.setItem("username",username);
    // miPerfil.innerHTML = user.email + " " + user.lastAccess;
    miPerfil.innerHTML = `<div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">`
    + username + " Último acceso: " + user.lastAccess +
      `</button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" href="my-profile.html"><i class="fas fa-user"></i> Mi perfil</a>
      <a class="dropdown-item" onclick="logOut()"><i class="fas fa-sign-out-alt"></i> Logout</a>
    </div>
  </div> `

    console.log(user.lastAccess);
  } else {
    miPerfil.href = "index.html";
    miPerfil.innerHTML = `<i class="fas fa-sign-in-alt icon-login"></i> `
  }
})
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML prese  ntes.