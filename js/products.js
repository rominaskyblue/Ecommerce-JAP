//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const ORDER_ASC_BY_PRICE = "Mayor precio";
const ORDER_DESC_BY_PRICE = "Menor precio";
const ORDER_BY_RELEVANCE = "Relevancia";
let product = [];
let minCount = undefined;
let maxCount = undefined;

function orderProduct(criterion, array) {
    let result = [];
    if (criterion === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            return a.cost - b.cost

        });
    } else if (criterion === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            return b.cost - a.cost
        });
    } else if (criterion === ORDER_BY_RELEVANCE) {
        result = array.sort(function (a, b) {
            return b.soldCount - a.soldCount
        });
    };
    console.log(result);
    return result;
}

function showProductList(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        console.log(product);
        console.log('iteracion ' + i, 'min ' + minCount + '---- max ' + maxCount);
        console.log(product);
        if (((minCount === undefined) || (minCount !== undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount === undefined) || (maxCount !== undefined && parseInt(product.cost) <= maxCount))) {

            htmlContentToAppend += `
        <a class="list-group-item list-group-item-action" href="product-info.html">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name + `</h4> 
                        <small class= "text-muted" >` + product.cost + `</small>
                    </div>
                    <h10 class="text-muted" >`+ product.description + `</h10>
                    <div>
                        <small class= "text-muted"> Unidades vendidas: ` + product.soldCount + `</small>
                    </div>
                </div>
            </div>
        </a>
        `
        }

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (res) {
        if (res.status === "ok") {
            product = res.data;
            //console.log(product);
            showProductList(product);
        }
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        let orderProducts = orderProduct(ORDER_DESC_BY_PRICE,product);
        showProductList(orderProducts);
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        let orderProducts = orderProduct(ORDER_ASC_BY_PRICE,product);
        showProductList(orderProducts);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        let orderProducts = orderProduct(ORDER_BY_RELEVANCE,product);
        showProductList(orderProducts);
    });
 
    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductList(product);
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por precio.
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

        showProductList(product);
    });
});