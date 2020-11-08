/*Declaración de variables*/
var productsRelated = [];
var currentProductsArray = [];

/*Función para obtener los comentarios de PRODUCT_INFO_COMMENTS_URL y mostrarlas en product-info.html*/
function showProductComments(array) {
    let htmlContentToAppend = []

    for (let i = 0; i < array.length; i++) {
        let comment = array[i];

        let starsChecked = `<span class="fa fa-star checked"></span>`.repeat(comment.score)
        let starsUnchecked = `<span class="fa fa-star"></span>`.repeat(5 - comment.score)

        htmlContentToAppend +=
            `
         <div>
            <p>Calificación de ` + comment.user + '&nbsp;&nbsp;&nbsp;' + starsChecked + starsUnchecked + `</p>
            <div><i>`+ comment.description + `</i><br>` + comment.dateTime + `<hr> </div>
         </div>
        `

        document.getElementById("productComments").innerHTML = htmlContentToAppend;
    }
}

/*Función para mostrar los productos relacionados de PRODUCT_INFO_URL en product-info.html*/
function showRelatedProducts() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        for (let j = 0; j < productsRelated.length; j++) {
            if (i == j) {
                let relatedProducts = currentProductsArray[i];

                htmlContentToAppend +=
                    `
                <a href="product-info.html" class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3">
                            <img src="` + relatedProducts.imgSrc + `" alt="` + relatedProducts.description + `" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ relatedProducts.name + " - " + relatedProducts.currency + " " + relatedProducts.cost + `</h4>
                            </div>
                            <p class="mb-1">` + relatedProducts.description + `</p>
                        </div>
                    </div>
                </a>
                `
                document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
            }
        }
    }
}

/*Para obtener los datos de las URLS*/
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productPriceHTML = document.getElementById("productPrice");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productSoldHTML = document.getElementById("productSold")
            let productCriteriaHTML = document.getElementById("productCriteria");

            productNameHTML.innerHTML = product.name;
            productPriceHTML.innerHTML = product.currency + " " + product.cost;
            productDescriptionHTML.innerHTML = product.description;
            productSoldHTML.innerHTML = product.soldCount;
            productCriteriaHTML.innerHTML = product.category;
            productsRelated = product.relatedProducts;

            showRelatedProducts();
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comment = resultObj.data;

            showProductComments(comment);
        }
    });
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {

            currentProductsArray = resultObj.data;
            showRelatedProducts();

        }
    });

});









