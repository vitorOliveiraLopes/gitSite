const request = new XMLHttpRequest();
request.open('GET', 'https://api.punkapi.com/v2/beers?page=2&per_page=80', true) // Pegando URL com o GET

// ---> CARREGANDO CERVEJAS <-- 
var listFav = new Array();
request.onload = function () {
    let data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {  // 200 = ok -  400 = erro 
        data.forEach(beer => {
            $(".card-deck").append(
                '<div class="row">' +
                '<div class="col-sm-3">' +
                '<div class="card">' +
                '<div class="card-body">' +
                '<i class="fa fa-star fa-star-style"   onclick="addFav(this, \'' + beer.name + '\')">' + '</i>' +
                '<img class="card-img-top beer_img img-fluid-sm rounded mx-auto d-block" data-target="beerInfo"  id="cardmodal" data-toggle="modal" data-target="#ExemploModalCentralizado"    src="' + beer.image_url + '">' +

                '<h5 class="card-title text-center">' + beer.name + '</h5>' +
                '<p class="card-subtitle mb-2 text-muted text-center">' + beer.tagline + '</p>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        });
    } else {
        console.log("erro")
    }
}

// ---> SEARCH BEER  BY  CEARÁ ! <---
function searchBeer() {
    var name = $("#search").val();
    $("#home").empty();
    $.get("https://api.punkapi.com/v2/beers?beer_name=" + name, function (data, status) {
        $.each(data, function (key, value) {
            var isFav = false;
            listFav.forEach((f) => {
                if (value.name == f.name) {
                    isFav = true;
                    return;
                }
            });

            if (!isFav) {
                $(".card-deck").append(
                    '<div class="row">' +
                    '<div class="col-sm-3">' +
                    '<div class="card">' +
                    '<div class="card-body">' +
                    '<i class="fa fa-star fa-star-style"   onclick="addFav(this, \'' + value.name + '\')">' + '</i>' +
                    '<img class="card-img-top beer_img img-fluid-sm rounded mx-auto d-block" data-target="beerInfo"  id="cardmodal" data-toggle="modal" data-target="#ExemploModalCentralizado"    src="' + value.image_url + '">' +
                    '<h5 class="card-title text-center">' + value.name + '</h5>' +
                    '<p class="card-subtitle mb-2 text-muted text-center">' + value.tagline + '</p>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                );
            }
        });
    });
}

// ------> LISTA FAVORITOS <---------

function addFav(x, name) {
    x.classList.toggle('fa-star');
    x.classList.toggle('fa-star-o');
    //Pegando API
    $.get("https://api.punkapi.com/v2/beers?beer_name=" + name, function (data, status) {
        // Adicionando aos favoritos
        $.each(data, function (key, value) {
            var isFav = false;
            listFav.forEach((f) => {
                if (value.name == f.name) {
                    console.log("REMOVE");
                    listFav.splice($.inArray(value, listFav), 1);
                    isFav = true;
                }
            });
            if (!isFav) {
                console.log("ADD");
                listFav.push(value);
            }
        });
    });
}

function listFavourite() {
    $("#home").empty();
    listFav.forEach((beer) => {
        $(".card-deck").append(
            '<div class="row">' +
            '<div class="col-sm-3">' +
            '<div class="card">' +
            '<div class="card-body">' +
            '<i class="fa fa-star fa-star-style"   onclick="addFav(this, \'' + beer.name + '\')">' + '</i>' +
            '<img class="card-img-top beer_img img-fluid-sm rounded mx-auto d-block"     data-target="beerInfo"  id="cardmodal" data-toggle="modal" data-target="#ExemploModalCentralizado"    src="' + beer.image_url + '">' +
            '<h5 class="card-title text-center">' + beer.name + '</h5>' +
            '<p class="card-subtitle mb-2 text-muted text-center">' + beer.tagline + '</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    });
}

// ---- FIM FAVORITOS --- //

function getBeers() {
    $("#home").empty();
    $.get("https://api.punkapi.com/v2/beers", function (data, status) {
        $.each(data, function (key, value) {
            var isFav = false;
            listFav.forEach((f) => {
                if (value.name == f.name) {
                    isFav = true;
                    $(".card-desk").append(
                        '<div class="row">' +
                        '<div class="col-sm-3">' +
                        '<div class="card">' +
                        '<div class="card-body">' +
                        '<i class="fa fa-star fa-star-style"   onclick="addFav(this, \'' + value.name + '\')">' + '</i>' +
                        '<img class="card-img-top beer_img img-fluid-sm rounded mx-auto d-block" data-target="beerInfo"  id="cardmodal" data-toggle="modal" data-target="#ExemploModalCentralizado"    src="' + value.image_url + '">' +
                        '<h5 class="card-title text-center">' + value.name + '</h5>' +
                        '<p class="card-subtitle mb-2 text-muted text-center">' + value.tagline + '</p>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                    );
                    return;
                }
            });
            if (!isFav) {
                $(".card-desk").append(
                    '<div class="row">' +
                    '<div class="col-sm-3">' +
                    '<div class="card">' +
                    '<div class="card-body">' +
                    '<i class="fa fa-star fa-star-style"   onclick="addFav(this, \'' + value.name + '\')">' + '</i>' +
                    '<img class="card-img-top beer_img img-fluid-sm rounded mx-auto d-block" data-target="beerInfo"  id="cardmodal" data-toggle="modal" data-target="#ExemploModalCentralizado"    src="' + value.image_url + '">' +
                    '<h5 class="card-title text-center">' + value.name + '</h5>' +
                    '<p class="card-subtitle mb-2 text-muted text-center">' + value.tagline + '</p>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                );
            }
        });
    });

}

request.send()

request.getBeers()

