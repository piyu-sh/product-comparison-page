window.onload = loadXMLDoc;

var productData = {};

function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            var myApp = document.getElementById("myApp");
           if (xmlhttp.status == 200) {
            productData = xmlhttp.responseText;
           }
           else if (xmlhttp.status == 400) {
            productData = {
                'error': 'There was an error 400'
            }
           }
           else {
            productData = {
                'error':'something else other than 200 was returned'
            }
           }
        }
    };

    xmlhttp.open("GET", "https://flipkart-mock-product.now.sh/", true);
    xmlhttp.send();
}

function renderFromData(data){

}