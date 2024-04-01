

function get_price(name) {

    return fetch(`item/${name}`)
        .then(response => response.text())
        .then(price => {
            return price;

        });

}

function getData() {

    // update Product price
    let productName = document.querySelector("#recipeName").innerHTML;
    get_price(productName)
        .then(productPrice => {
            console.log(productPrice);
            document.querySelector("#recipePrice").innerHTML = productPrice;
        })
        .catch(error => {
            console.error("Error fetching price:", error);
        });


    //update ingredients price:

    // document.querySelectorAll("")






}







document.addEventListener("DOMContentLoaded", function () {

    document.querySelector("#refresh_button").onclick = getData;


}
)








