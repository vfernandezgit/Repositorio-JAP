/*Declaración de variables y constantes*/
const ORDER_ASC_BY_NAME = "a";
const ORDER_DESC_BY_NAME = "b";
const ORDER_ASC_BY_COST = "$a";
const ORDER_DESC_BY_COST = "$b";
const ORDER_BY_PROD_COUNT = "Rel.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

/*Función que filtra los productos*/
function sortProducts(criteria, array) {
    /*defino variable result*/
    let result = [];
    /*verifica si el parámetro criteria contiene el valor de ORDER_ASC_BY_COST*/
    /*Ordena los costos de menor a mayor*/
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
        /*Ordena los costos de mayor a menor*/
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.name > b.name) { return -1; }
            if (a.name < b.name) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        });
        /*Ordena cantidad de vendidos de menor a mayor*/
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];


        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {

            htmlContentToAppend += `
        <a href="./product-info.html">
        <div class="col-lg-4 col-md-6 col-sm-6">
            <div class="product__item">
                <div class="product__item__pic set-bg">
                <img src="` + product.imgSrc + `" alt="">
                <ul class="product__item__text">
                <a href="#">+ Añadir al carrito</a>
                </ul>
                </div>
                <div class="product__item__text">
                <h6>`+ product.name + `</h6>
                <p>` + product.description + `</p>
                <div>
                <h5>`+ product.currency + " " + product.cost + `</h5>
                <p>`+ "Vendidos:" + " " + product.soldCount + `</p>
                </div>
            </div>
            </div>
        </div>
         </a>
        `
        }
        document.getElementById("products").innerHTML = htmlContentToAppend;
    }
}

/*Esta función usa los parámetros "sortCriteria y "productsArray"*/
function sortAndShowProducts(sortCriteria, productsArray) {
    /*Almacena el valor de "sortCriteria" en "currentSortCriteria" que se inicializa vacío*/
    currentSortCriteria = sortCriteria;

    /*Verifica si "productsArray" no está vacío*/
    if (productsArray != undefined) {
        /*Almacena "productsArray" en "currentProductsArray"*/
        currentProductsArray = productsArray;
    }

    /*Se almacena el resultado de la función "sortProducts" en "currentProductsArray"*/
    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    //Muestro los productos ordenados
    showProductsList();
}

document.addEventListener("DOMContentLoaded", function (e) {
    /*Obtiene la info del JSON*/
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        /*Si el status de la función resultObj es ok, se ejecuta la función "sortAndShowProducts" con los parámetros ORDER_ASC_BY_NAME y resultObj.data*/
        if (resultObj.status === "ok") {
            /*A sortCriteria se le pasa los valores de ORDER_ASC_BY_COST, a productsArray se le pasa la info del json guardada en resultObj.data*/
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
        }

    });

    document.getElementById("priceAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("priceDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("nameAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });

    document.getElementById("nameDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByRel").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showProductsList();
    });
});
