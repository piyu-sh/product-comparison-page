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
    if ('content' in document.createElement('template')) {

        // Instantiate the table with the existing HTML tbody
        // and the row with the template
        var t = document.querySelector('#productrow');
    
        // Clone the new row and insert it into the table
        var tb = document.querySelector("tbody");
        var clone = document.importNode(t.content, true);
        td = clone.querySelectorAll("td");
        td[0].textContent = "1235646565";
        td[1].textContent = "Stuff";
    
        tb.appendChild(clone);
    
        // Clone the new row and insert it into the table
        var clone2 = document.importNode(t.content, true);
        td = clone2.querySelectorAll("td");
        td[0].textContent = "0384928528";
        td[1].textContent = "Acme Kidney Beans 2";
    
        tb.appendChild(clone2);
    
    } else {
      // Find another way to add the rows to the table because 
      // the HTML template element is not supported.
    }
}