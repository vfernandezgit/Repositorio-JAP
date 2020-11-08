const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_INFO_URL_2P = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

document.addEventListener("DOMContentLoaded", function (e){
  const userEmail = localStorage.getItem('email');
  /*const userName = document.getElementById('username');*/
  /*const logoutButton = document.getElementById('logout');*/

  /*userName.innerText = userEmail;*/

  /*if (userEmail === null) {
    window.location.href = "index.html";
  }*/
  
  if(userEmail === null){
    document.getElementById("username").style = "display: none;";
    document.getElementById("login_text").style = "display: block;";
    document.getElementById("register_text").style = "display: block;";
   

  }
  else{
  document.getElementById("username").innerHTML = userEmail + "▾";
  document.getElementById("login_text").style = "display: none;";
  document.getElementById("register_text").style = "display: none;";
  }
});

function end_session() {
  localStorage.removeItem('email');
  localStorage.removeItem('name');
  localStorage.removeItem('last_name');
  localStorage.removeItem('age');
  localStorage.removeItem('phone');
  localStorage.removeItem('user_uploaded_image');

  window.location.href = "index.html";
};        



