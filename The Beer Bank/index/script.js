const endpoint = "https://api.punkapi.com/v2/beers";

// beers by strength

$.getJSON(endpoint, function(data) {
  // add to favourite
  // click of star
  // beers are added into favourite div
  // favourites can be viewed by clicking favourite
  console.log(data);

  // filter through data 
  let weakBeers = data.filter(beer => beer.abv <= 4.5);
  let medBeers = data.filter(beer => beer.abv > 4.5 && beer.abv <= 7.5);
  let strongBeers = data.filter(beer => beer.abv > 7.5 && beer.abv <= 50);
  // pass in filtered data  and class
  function Display(range, percent) {
    // build html with filted data
    let beerHtml = range.map(
      item =>
        `
                                    <div class = 'beer-wrapper'>
            <div class='card'>
                                      <div class='card-body'>
                                        <div class = "beer ${percent}">

                                          <i class="fa fa-star" aria-hidden="true"></i>

                                          <img class ="card-img-top" src = "${item.image_url}"/>  

                                          <h3 class="card-title" style=color:orange>${item.name}</h3>
                                          <h4 class ="beer__tagline">${item.tagline}</h4>

                                        </div>

                                      </div>  
            </div>


            <div class ="pop-up">
               
                 <i class="fa fa-window-close-o" aria-hidden="true"></i>
                  <h3 class ="title">${item.name}</h3>
                  <h4>${item.tagline}</h4>
                    
                  <div class="container">
                    <div class="row">
                      <div class="col-md-2">
                        <img class="beer_img" "rounded mx-auto d-block" src ="${item.image_url}">
                      </div>
                    <div class="col-md-9  ">
                          <span>
                              <h6 style=text-align:left>IBU: ${item.ibu} ABV: ${item.abv} EBC: ${item.ebc}</h6>
                          </span>  
                      <p style=text-align:justify>${item.description}</p>
                      <h6 style=text-align:left>Best served with:</h6>
                       <ul style=text-align:left>
                            ${item.food_pairing 
                            .map(ingredient => `<li>${ingredient}</li>`)
                            .join("")}
                       </ul>

                      <h4>You might also like</h4>

                      <img class='beer__img' src='${item.random}'>
                      
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>  
        </div>
       
            `
    );

    $(".beers").append(beerHtml);
  }
  // call filtered html with class names
  Display(weakBeers, "weak");
  Display(medBeers, "medium");
  Display(strongBeers, "strong");

  // get favourite info
  $(".beer").one("click", ".fa-star", function() {
    $(this).toggleClass("active-star");
    let favouriteImg = $(this)
      .closest(".beer-wrapper")
      .find(".beer_img")
      .attr("src");
    let favouriteName = $(this)
      .closest(".beer-wrapper")
      .find(".beer__name")
      .text();
    let favouriteTagline = $(this)
      .closest(".beer-wrapper")
      .find(".beer__tagline")
      .text();
    let index = $(".fa-star").index(this);
    let favouriteHTML = `
            <div class ='favourites__item' data-index-number = ${index}>
              <h4>${favouriteName}</h4>
              <img src = ${favouriteImg} />
              <h5>${favouriteTagline}</h5>
            </div>
      `;

    $(".favourites").append(favouriteHTML);
  });
  // favourite clicks
  $(".favourites").append(
    '<i class="fa fa-window-close-o favourites__close" aria-hidden="true"></i>'
  );

  $(".favourites").on("click", ".favourites__close", function() {
    $(".favourites").fadeOut();
  });

  $(".favourites__title").on("click", function() {
    $(".favourites").fadeIn();
  });

  // beer pop up - extra info from data
  $(".beer img").on("click", function() {
    $(this)
      .closest(".beer-wrapper")
      .find(".pop-up")
      .fadeIn();
    $(".bg").fadeIn();
  });

  $(".fa-window-close-o").on("click", function() {
    $(".pop-up").fadeOut();
    $(".bg").fadeOut();
  });
  // hide beers apart from medium range

  $(".beer").css("display", "none");

  $(".beers .medium").css("display", "block");
// filter beers using tabs
  $(".tab__item").on("click", function() {
    $(".tab__item").removeClass("active");
    $(this).addClass("active");
  });

  $(".tab__item.weak").on("click", function() {
    $(".beers .weak").show();

    $(".beers .medium").hide();
    $(".beers .strong").hide();
  });

  $(".tab__item.medium").on("click", function() {
    $(".beers .medium").show();

    $(".beers .weak").hide();
    $(".beers .strong").hide();
  });

  $(".tab__item.strong").on("click", function() {
    $(".beers .strong").show();

    $(".beers .weak").hide();
    $(".beers .medium").hide();
  });
});
