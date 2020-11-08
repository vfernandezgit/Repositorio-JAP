
document.addEventListener("DOMContentLoaded", function (e) {
  /*Obtener los arrays que está en el JSON*/
  getJSONData(CART_INFO_URL_2P).then(function (resultObj) {

    /*Guardar los arrays en una variable*/
    arrayArticles = resultObj.data.articles;
    /*Función donde se van a mostrar los elementos del array*/
    showArticles(arrayArticles);
  }
  );

}
);


function showArticles(articles) {
  let cart_products_list = "";
  let order_details = "";

  /*Recorrer los elementos de array*/
  for (let i = 0; i < articles.length; i++) {

    /*Mostrar los elementos del JSON en el HTML*/
    cart_products_list
      += ` 
            <tr>
              <td class="product__cart__item">
                <div class="product__cart__item__pic">
                  <img src="`+ articles[i].src + `" width="90" height="90" alt="">
                </div>
                <div class="product__cart__item__text">
                 <h6>`+ articles[i].name + `</h6>
                 <h5><span class="currency">`+ articles[i].currency + `</span><span id="price" class="unit_cost">` + articles[i].unitCost + `<span></h5>
                </div>
              </td>
              <td class="quantity__item">
                <div class="quantity">
                  <div class="pro-qty-2">
                    <input type="number" value="` + articles[i].count + `" min="1" class="countArticle">
                  </div>
                </div>
              </td>
                <span style="display: none;" id="productSubtotal-${i}"<span>
              <td class="cart__close">
                <i class="fa fa-close" id="delete_button"></i>
              </td>
            </tr>
         
          `

  }
  /*Obtener el ID del elemento HTML donde se van a mostrar los elementos*/
  document.getElementById("table").innerHTML = cart_products_list;
  addEventCount();
  updateAllSubTotal();
  calcTotal();
}


/*Calcula subtotal*/
function calcSubTotal(count, index) {
  let sub = 0;
  /*Chequea si el precio está dólares, multiplica el precio por 40 y luego por la cantidad. Guarda el resultado en "sub"*/
  if (arrayArticles[index].currency === "USD") {
    sub = arrayArticles[index].unitCost * count * 40;

  } else {
    /*Si el precio no está dólares, multiplica precio por cantidad y guarda el resultado en "sub"*/
    sub = arrayArticles[index].unitCost * count;
  }
  /*Devuelve sub*/
  return sub;
}

/*Muestra la suma de todos los productos y actualiza el monto en base a la cantidad*/
function updateAllSubTotal() {
  /*Guarda cantidad de artículos en "subtotalArray"*/
  let subtotalArray = document.getElementsByClassName("countArticle");
  let subtotal = 0;
  /*Recorre el array de cantidad de artículos*/
  for (let i = 0; i < subtotalArray.length; i++) {
    subtotal += calcSubTotal(subtotalArray[i].value, i);
  }
  /*Muestra subtotal y moneda en el HTML*/
  document.getElementById("subtotalText").innerHTML = "UYU " + subtotal;
  /*Guarda el subtotal en "subtotaltotal"*/
  subtotaltotal = subtotal;
}

function calcTotal() {
  let total = subtotaltotal;
  /*Verifica si se seleccionó envío standard*/
  if (document.getElementById("id_standard").checked) {
    /*Calcula el 5% del subtotal*/
    var standard = subtotaltotal * 0.05;
    /*Guarda en "total" la suma del subtotal y su 5%*/
    total = subtotaltotal + standard;
    /*Muestra el costo de envío standard*/
    document.getElementById("shipping_standard").style = "display: block; color: rgb(128, 128, 125);"
  }
  else {
    /*Si no se selecciona envío standard, no muestra el costo*/
    document.getElementById("shipping_standard").style = "display: none;"
  }
  if (document.getElementById("id_express").checked) {
    var express = subtotaltotal * 0.07;
    total = subtotaltotal + express;
    document.getElementById("shipping_express").style = "display: block; color: rgb(128, 128, 125);"
  }
  else {
    document.getElementById("shipping_express").style = "display: none;"
  }
  if (document.getElementById("id_premium").checked) {
    var premium = subtotaltotal * 0.15;
    total = subtotaltotal + premium;
    document.getElementById("shipping_premium").style = "display: block; color: rgb(128, 128, 125);"
  }
  else {
    document.getElementById("shipping_premium").style = "display: none;"
  }
  /*Muestra los costos de envío y el total en el HTML*/
  document.getElementById("resumenTotalCostText").innerHTML = "UYU " + total;
  document.getElementById("totalCostText").innerHTML = "UYU " + total;
  document.getElementById("profile_totalCostText").innerHTML = "UYU " + total;
  document.getElementById("shipping_standard").innerHTML = "UYU " + standard;
  document.getElementById("shipping_express").innerHTML = "UYU " + express;
  document.getElementById("shipping_premium").innerHTML = "UYU " + premium;
}

function addEventCount() {
  /*Guarda cantidad de artículos en "subtotalArray"*/
  let subtotalArray = document.getElementsByClassName("countArticle");
  /*Recorre el array de cantidad de artículos*/
  for (let i = 0; i < subtotalArray.length; i++) {
    /*Verifica si cambia la cantidad*/
    subtotalArray[i].addEventListener("change", function () {
      /*Muestra moneda y costo en el HTML*/
      document.getElementById("productSubtotal-" + i).innerHTML = arrayArticles[i].currency + " " + subtotalArray[i].value * arrayArticles[i].unitCost;
      updateAllSubTotal();
      calcTotal();
    });
  }
}

/*Validaciones en Información de envío*/

function verification() {
  /*Guarda el valor contenido en los campos*/
  let name = document.getElementById("name").value;
  let last_name = document.getElementById("last_name").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;

  /*Verifica si los campos están vacíos y que haya un método de pago seleccionado*/
  if (name == "" || last_name == "" || address == "" || city == "" || phone == "" || email == "") {
    alert("Se deben completar todos los campos obligatorios en Información de envío.");
  } else if (document.getElementById("credit_card_method").checked || document.getElementById("transfer_method").checked) {
    alert("Compra realizada con éxito.");
  } else {
    alert("Seleccione un método de pago.");
  }
}

function card_validation() {

  /*Guarda el valor contenido en los campos*/
  let owner_name = document.getElementById("owner_name").value;
  let card_number = document.getElementById("card_number").value;
  let due_date = document.getElementById("due_date").value;
  let security_code = document.getElementById("security_code").value;

  /*Verifica si los campos están vacíos*/
  if (owner_name == "" || card_number == "" || due_date == "" || security_code == "")
    alert("Se deben completar todos los campos de Tarjeta de Crédito");
  else {
    /*Si ha datos en los campos se cierra el modal*/
    $("#cardModal").modal("hide");
  }
}

function transfer_validation() {

  /*Guarda el valor contenido en los campos*/
  let account_number = document.getElementById("account_number").value;
  let name = document.getElementById("fullname").value;

  /*Verifica si los campos están vacíos*/
  if (account_number == "" || name == "") {
    alert("Los campos de transferencia bancaria no pueden estar vacíos");
  }
  else {
    /*Si ha datos en los campos se cierra el modal*/
    $("#transferModal").modal("hide");
  }
}


