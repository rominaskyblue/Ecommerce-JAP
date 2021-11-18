/*********** | Definicion de variables |***************/

let cantProductValue = 2;
let subtotalElementsValue = [];
let subtotalValue = 0;
let totalValue = 0;
let deliveryPercentageValue = 0.15;
let deliveryCostValue = 0;
const dolarvalue = 40;
let products = [];
const CART_PRODUCTS_URL = 'https://japdevdep.github.io/ecommerce-api/cart/654.json';
const COUNTRY_URL = 'http://vocab.nic.in/rest.php/country/json';

/*************** | Elementos del DOM |*****************/

const buttonFinal = document.getElementById('finalizarCompra');
const buttonModal = document.getElementById('btnModal');
const tarjetaCredito = document.getElementById('tarjetacredito');
const cardNumber = document.getElementById('card-number');
const securityCode = document.getElementById('security-code');
const cardExpiration = document.getElementById("card-expiration");
const transferenciaBancaria = document.getElementById('transferencia-bancaria');
const accountNumber = document.getElementById('account-number');
const modalClose = document.getElementById('close-modal');
const payment = document.getElementById('payment');
const form = document.getElementById('sell-info');
const cartProducts = document.getElementById('cartProducts');
const subTotalCost = document.getElementById('subtotalCost');
const deliveryCost = document.getElementById('deliveryCost');
const total = document.getElementById('total');


/**********************************************| Funciones |***************************************************/

/* Funcion encargada de borrar un producto del arreglo de productos
@param index: indice que indica la posicion del producto a eliminar en el arreglo general de productos
en el carrito*/

function deleteProduct(index) {
	products.splice(index, 1); // borro el elemento en la posicion "index"
	subtotalElementsValue.splice(index, 1); // borro el subtotal del producto
	if (products.length === 0) { // si ya no hay articulos, se muestra un aviso al usuawrio
		cartProducts.innerHTML = `<p style="text-align: center;margin:30px;"> El carrito esta vacio :( </p>`;
		buttonFinal.disabled = true;
		updateSubtotal(0, -1); 
	} else {
		buttonFinal.disabled = false;
		showCart(products); // vuelvo a cargar la vista de productos
	}
}

/* Esta funcion se encarga de recorrer el array que recibe por parametro y por cada producto
armar el div de clase list-group-item.
@param array: El arreglo de productos.
*/
function showCart(array) {
	let htmlContentToAppend = "";
	for (let index = 0; index < array.length; index++) {
		const { src, name, currency, unitCost } = array[index];
		let valueArt = unitCost;
		if (currency === "USD") {
			valueArt = unitCost * dolarvalue; // Se pasa el valor en dolares a valor en pesos
		}
		htmlContentToAppend +=
			`<div class="list-group-item list-group-item-action" href="product-info.html">
					<div class="row">
						<div class="col-4">
							<img style= "width: 100px" src="`+ src + `">
						</div>
						<div class="col">
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1">`+ name + `</h5> <button type="button" onclick="deleteProduct(` + index + `)" class= btn id='deleted` + index + `'><i style="color: #ff7f7f " class="fas fa-trash-alt"></i></button>
							</div>
							<br>
							<div class="d-flex w-100 justify-content-between">
								<h10 class="text-muted" > UYU ` + valueArt + `</h10>
								<input type="number"  min="1" style="width: 60px;" value="2" id=cantProduct`+ index + ` onchange="updateSubtotal(` + valueArt + `,` + index + `)">
								<h10 class="text-muted" id="subtotalItem`+ index + `"> UYU ` + (cantProductValue
				* valueArt) + `</h10>
							</div>
						</div>
					</div>
				</div>`;
		cartProducts.innerHTML = htmlContentToAppend;
		updateSubtotal(valueArt, index);
	}
}

/* Funcion auxiliar para actualizar el valor del subtotal del articulo indicado, 
y a su vez reflejar ese cambio en el subtotal general, y en el total a pagar
@param unitCost: costo por unidad del articulo
@param index: indice del articulo en el arreglo de productos*/
function updateSubtotal(unitCost, index) {
	subtotalValue = 0; // dejo en 0 el valor del subtotal global
	if (index >= 0) { // si es un indice valido
		cantProductValue = document.getElementById('cantProduct' + index).value; //cantidad por articulo ingresado por el usuario
		let subtotalItem = unitCost * cantProductValue; // subtotal de un articulo = costo de unidad x la cantidad
		subtotalElementsValue[index] = subtotalItem; // agrego el subtotal del articulo al arreglo de subtotales 
		subtotalElementsValue.forEach(subTotalProduct => { //recorro todos los elementos del arreglo de subtotales
			subtotalValue += subTotalProduct //por cada subtotal lo sumo al subtotal general
		});
		document.getElementById('subtotalItem' + index).innerHTML = "UYU " + subtotalItem; //muestro el valor del subtotal por articulo
	}
	subTotalCost.innerHTML = 'UYU ' + subtotalValue; //muestro el subtotal general actualizado
	updateTotal(); // llamo a la funcion para actualizar el valor del total.
};

/* Funcion auxiliar para actualizar el valor total y el costo de envio*/
function updateTotal() {
	deliveryCostValue = deliveryPercentageValue * subtotalValue;
	totalValue = subtotalValue + deliveryCostValue;
	deliveryCost.innerHTML = 'UYU ' + deliveryCostValue.toFixed(2);
	total.innerHTML = 'UYU ' + totalValue;
}

/* Funcion axuliar para validar los campos de la tarjeta de credito */
function validateCard() {
	if (cardNumber.value.length == 16 &&
		securityCode.value.length == 3 &&
		cardExpiration.value.length == 5) {
		buttonModal.disabled = false;
	} else {
		buttonModal.disabled = true;
	}
}

/* Funcion axuliar para validar el largo del numero ingresado 
en el input "Numero de cuenta" del modal */
function validateAccount() {
	if (accountNumber.value.length == 12) {
		buttonModal.disabled = false;
	} else {
		buttonModal.disabled = true;
	}
}

/* Funcion auxiliar para mostrar un mensaje debajo de los input
@param imputElement: Recibe por parametro el elemento html donde se debe mostrar un mensaje debajo
@param message: Recibe como parametro el mensaje string que debera mostrar 
*/
function showMessage(inputElement, message) {
	if (document.getElementById(inputElement.id + 'p') === null) { // Si no existe el elemento
		const p = document.createElement('p'); // creo un elemento html p
		p.id = inputElement.id + 'p'; // le asigno una id en base a la id del input recibido por parametro
		p.style.cssText = 'font-size: x-small;color: rgb(211, 30, 30);'; // se le asigna el estilo
		p.innerText = message; // se le agrega el mensaje recibido por paramtro
		inputElement.parentNode.appendChild(p); // se agrega el elemento p creado como hijo del elemento padre del input recibido por parametro
	}
}

/* Funcion auxiliar para eliminar el mensaje debajo del input 
@param inputElement: Recibe por parametro el elemento html donde se debe eliminar el mensaje debajo*/
function removeMessage(inputElement) {
	const p = document.getElementById(inputElement.id + 'p');
		if (p != null) {
			inputElement.parentNode.removeChild(p);
		}
}

/**********************************************| Eventos |***************************************************/

document.addEventListener("DOMContentLoaded", () => {
	getJSONData(CART_PRODUCTS_URL).then(res => {
		if (res.status === "ok") {
			products = res.data.articles;
			showCart(products);
		};
	});

	document.getElementById('premiumRadio').addEventListener('change', () => {
		deliveryPercentageValue = 0.15;
		updateTotal();

	});

	document.getElementById('expressRadio').addEventListener('change', () => {
		deliveryPercentageValue = 0.07;
		updateTotal();
	});

	document.getElementById('standardradio').addEventListener('change', () => {
		deliveryPercentageValue = 0.05;
		updateTotal();
	});

	fetch(COUNTRY_URL).then( res => {
		if (res.ok) {
			res.json().then(data => {
				let options = '';
				data.countries.forEach( country => {
					options += `
                   <option>`+ country.country.country_name + `</option>`
				});
				document.getElementById("country").innerHTML = options;
			})
		}
	})
});

tarjetaCredito.addEventListener('click', () => {
	cardNumber.disabled = false;
	securityCode.disabled = false;
	cardExpiration.disabled = false;
	accountNumber.disabled = true
	validateCard();
})

transferenciaBancaria.addEventListener('click', () => {
	cardNumber.disabled = true;
	securityCode.disabled = true;
	cardExpiration.disabled = true;
	accountNumber.disabled = false
	validateAccount();
})

cardNumber.addEventListener('keyup', () => {
	if (cardNumber.value.length != 16) {
		showMessage(cardNumber, 'Debe ingresar un número de tarjeta válido.');
	} else {
		removeMessage(cardNumber);
	}
	validateCard();
});

securityCode.addEventListener('keyup', () => {
	if (securityCode.value.length != 3) {
		showMessage(securityCode, 'Debe ingresar un código de seguridad válido.');
	} else {
		removeMessage(securityCode);
	}
	validateCard();
});

cardExpiration.addEventListener('keyup', () => {
	if (cardExpiration.value.length != 5) {
		showMessage(cardExpiration, 'Debe ingresar el vencimiento en el formato MM/AA.');
	} else {
		removeMessage(cardExpiration);
	}
	validateCard();
});

accountNumber.addEventListener('keyup', () => {
	if (accountNumber.value.length != 12) {
		showMessage(accountNumber, 'Debe ingresar un número de cuenta válido.');
	} else {
		removeMessage(accountNumber);
	}
	validateAccount();
});

/* Cuando se hace click sobre el boton guardar del modal,
se verifica el medio de pago seleccionado y se cambia el valor del input medio de pago */
buttonModal.addEventListener('click', () => {
	if (tarjetaCredito.checked) {
		payment.value = 'Tarjeta de Credito';
	} else {
		payment.value = 'Cuenta bancaria';
	}
});

/* Se modifica el comportamiento natural del submit del formulario
para mostrar una alerta, la cual si se confirma se redirije a la landing page*/
form.addEventListener('submit', event => {
	event.preventDefault();
	Swal.fire({
		icon: 'success',
		title: 'Compra finalizada',
		confirmButtonText: 'Cerrar',
	}).then(isConfirm => {
		if (isConfirm) {
			window.location.href = 'landing.html';
		}
	});
});
