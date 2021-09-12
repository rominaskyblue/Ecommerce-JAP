//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let product = {};
let comments = [];
let score = 0;

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (res) {
        if (res.status === "ok") {
            product = res.data;
            console.log(product);
            document.getElementById("productName").innerHTML = product.name;
            document.getElementById("productDescription").innerHTML = product.description;
            document.getElementById("productCost").innerHTML = product.cost + " " + product.currency;
            document.getElementById("soldCount").innerHTML = product.category + " | " + product.soldCount + " unidades vendidas.";

            //Muestro las imagenes en forma de galería
            showImages(product.images);

        }
    });

    function showImages(array) {

        let htmlContentToAppend = "";

        for (let i = 0; i < array.length; i++) {
            let imageSrc = array[i];

            // let imagen = document.getElementById("imagen"+i);
            // imagen.src = imageSrc;
            if (i === 0) {
                htmlContentToAppend += `
            <div class="carousel-item active" data-interval="5000">
              <img class="d-block w-100" src="`+ imageSrc + `" alt="imagen">
            </div>
            `
            } else {
                htmlContentToAppend += `
            <div class="carousel-item" data-interval="5000">
              <img class="d-block w-100" src="`+ imageSrc + `" alt="imagen">
            </div>
            `
            }

            document.getElementById("productImages").innerHTML = htmlContentToAppend;
        }
    }

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (res) {
        if (res.status === "ok") {
            comments = res.data;
            console.log(comments);
            viewComments(comments);
        }
    });

    function viewComments(array) {
        let htmlContentToAppend = "";

        for (let i = 0; i < array.length; i++) {
            let comment = array[i];
            let dateComment = new Date(comment.dateTime)
            let fecha = dateComment.getDate() + '/' + (dateComment.getMonth() + 1) + '/' + dateComment.getFullYear();
            let hora = dateComment.getHours() + ':' + dateComment.getMinutes() + ':' + dateComment.getSeconds();
            let fechaYHora = fecha + ' ' + hora;
            htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
        ` + showStars(comment.score) + `
            <div class="d-flex w-100 justify-content-end">
                <small>` + fechaYHora + `</small>
            </div>
            <p class="mb-1">`+ comment.description + `</p>
            <small>`+ comment.user + `</small>
        </div>
        `
            document.getElementById("comment-list-container").innerHTML = htmlContentToAppend;
        };
    }

    function showStars(score) {
        let ret = "";
        for (let i = 0; i < 5; i++) {
            if (i < score) {
                ret += `<span class="fa fa-star checked"></span>`
            } else {
                ret += `<span class="fa fa-star"></span>`;
            }
        }
        return ret;
    }

    document.getElementById("buttonAddComment").addEventListener("click", function (e) {
        addComment();
    });


    let star1 = document.getElementById("star1");
    star1.addEventListener("click", function (e) {
        addScore(1);
    });

    let star2 = document.getElementById("star2");
    star2.addEventListener("click", function (e) {
        addScore(2);
    });

    let star3 = document.getElementById("star3");
    star3.addEventListener("click", function (e) {
        addScore(3);
    });

    let star4 = document.getElementById("star4");
    star4.addEventListener("click", function (e) {
        addScore(4);
    });

    let star5 = document.getElementById("star5");
    star5.addEventListener("click", function (e) {
        addScore(5);
    });


    function addComment() {
        let description = document.getElementById("newComment");
        let dateTime = new Date();
        let user = window.sessionStorage.getItem("username");
        let comment = { description: description.value, dateTime: dateTime.toString(), user: user, score: score };
        comments.push(comment);
        viewComments(comments);
        description.value = "";
        addScore(0);
    };

    function addScore(stars) {
        score = stars;
        for (let i = 0; i < 5; i++) {
            let starElement = document.getElementById("star" + (i + 1))
            if (i < stars) {
                starElement.className = "fa fa-star checked";
            } else {
                starElement.className = "fa fa-star";
            }
        }
    };
});