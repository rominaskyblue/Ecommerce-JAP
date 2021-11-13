//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const ORDER_ASC_BY_PRICE = "Mayor precio";
const ORDER_DESC_BY_PRICE = "Menor precio";
const ORDER_BY_RELEVANCE = "Relevancia";
let products = [];
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

function clickProduct() {
    location.href = "product-info.html"
}

function showProductList(array) {
    let htmlContentToAppend = "";
    if (array.length === 0) {
        document.getElementById("prod-list-container").innerHTML = 
        `<p style="text-align:center;margin:60px;font-size:large"> No hay resultados para esa busqueda</p>`;
    } else {
        for (let i = 0; i < array.length; i++) {
            let product = array[i];
            console.log(product);
            console.log('iteracion ' + i, 'min ' + minCount + 'max ' + maxCount);
            console.log(product);
            if (((minCount === undefined) || (minCount !== undefined && parseInt(product.cost) >= minCount)) &&
                ((maxCount === undefined) || (maxCount !== undefined && parseInt(product.cost) <= maxCount))) {
    
            htmlContentToAppend += 
           `
              <div class="col-md-3 col-sm-6" onclick="clickProduct()">
                <div class="card mb-4 shadow-sm" >
                <img class="bd-placeholder-img card-img-top" style = "width:100%"src="` + product.imgSrc + `" alt="` + product.description + `">
                <p style= "text-align:center">`+ product.name +`</p>
                  <div class="card-body">
                    <p class="card-text">`+ product.description +`</p>
                    <small class= "text-muted" > USD ` + product.cost + `</small>
                    <div class="d-flex justify-content-between align-items-center">
                      <small class="text-muted">Unidades vendidas: ` + product.soldCount + `</small>
                    </div>
                  </div>
                </div>
              </div>`
            }
            document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
        }
    }  
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (res) {
        if (res.status === "ok") {
            products = res.data;
            //console.log(product);
            showProductList(products);
        }
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        let orderProducts = orderProduct(ORDER_DESC_BY_PRICE, products);
        showProductList(orderProducts);
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        let orderProducts = orderProduct(ORDER_ASC_BY_PRICE, products);
        showProductList(orderProducts);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        let orderProducts = orderProduct(ORDER_BY_RELEVANCE, products);
        showProductList(orderProducts);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductList(products);
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

        showProductList(products);
    });


    let searchProduct = document.getElementById("searchProduct");
    searchProduct.addEventListener('keyup', (event)=>{
        const searchKey = searchProduct.value.toLowerCase();
        const filterProducts = products.filter(product => {
            return product.name.toLowerCase().includes(searchKey) || product.description.toLowerCase().includes(searchKey);
        });
        showProductList(filterProducts);
    });






});