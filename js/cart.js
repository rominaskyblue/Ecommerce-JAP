//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let productsCart = [];
let cantProduct = 2;
let subtotalElement = [];
let subtotal = 0;
let total = 0;
let deliveryPercentage = 0.15;
let deliveryCost = 0;
const dolarvalue = 40;

let myFunction = function (unitCost, index) {
    cantProduct
        = document.getElementById("cantProduct" + index).value;
    let subtotalItem = unitCost * cantProduct
        ;
    addSubtotal(index, subtotalItem);
    document.getElementById('subtotalItem' + index).innerHTML = "UYU " + subtotalItem;
    document.getElementById('subtotalCost').innerHTML = 'UYU ' + subtotal;
    updateTotal();
};

let addSubtotal = function (position, monto) {
    subtotalElement[position] = monto;
    subtotal = 0;
    for (let index = 0; index < subtotalElement.length; index++) {
        console.log(index, subtotal);
        subtotal += subtotalElement[index];
    }
    console.log('nuevo subtotal', subtotal);
};

let updateTotal = function () {
    deliveryCost = deliveryPercentage * subtotal;
    total = subtotal + deliveryCost;
    document.getElementById('deliveryCost').innerHTML = 'UYU ' + deliveryCost.toFixed(2);
    document.getElementById('total').innerHTML = 'UYU ' + total;
}



document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function (res) {
        let htmlContentToAppend = '';
        if (res.status === "ok") {
            const { articles } = res.data
            console.table(res.data);
            for (let index = 0; index < articles.length; index++) {
                const { src, name, currency, unitCost } = articles[index];
                let valueArt = unitCost;
                if (currency === "USD") {
                    valueArt = unitCost * dolarvalue;
                    console.log ("aca entro", valueArt, dolarvalue);
                }
                htmlContentToAppend += `<div class="list-group-item list-group-item-action" href="product-info.html">
                <div class="row">
              <div class="col-4">
                  <img style= "width: 100px" src="`+ src + `">
              </div>
              <div class="col">
                  <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">`+ name + `</h5> 
                  </div>
                  <br>
                  <div class="d-flex w-100 justify-content-between">
                    <h10 class="text-muted" > UYU ` + valueArt + `</h10>
                    <input type="number"  min="1" style="width: 60px;" value="2" id=cantProduct`+ index + ` onchange="myFunction(` + valueArt + `,` + index + `)">
                    <h10 class="text-muted" id="subtotalItem`+ index + `"> UYU ` + (cantProduct
                        * valueArt) + `</h10>

                  </div>
              </div>    
          </div>
          </div>
             `;
                addSubtotal(index, (cantProduct * valueArt));
            }
        };

        document.getElementById('subtotalCost').innerHTML = 'UYU ' + subtotal;
        document.getElementById("cartProduct").innerHTML = htmlContentToAppend;
        deliveryCost = deliveryPercentage * subtotal
        document.getElementById('deliveryCost').innerHTML = 'UYU ' + deliveryCost.toFixed(2);
        document.getElementById('total').innerHTML = 'UYU ' + (subtotal + deliveryCost);
    });

    document.getElementById('premiumRadio').addEventListener('change', function (e) {
        deliveryPercentage = 0.15;
        updateTotal();

    });

    document.getElementById('expressRadio').addEventListener('change', function (e) {
        deliveryPercentage = 0.07;
        updateTotal();
    });

    document.getElementById('standardradio').addEventListener('change', function (e) {
        deliveryPercentage = 0.05;
        updateTotal();
    });
});