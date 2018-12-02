window.onload = loadXMLDoc;

var productData = {};

function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            var myApp = document.getElementById("myApp");
           if (xmlhttp.status == 200) {
            productData = JSON.parse(xmlhttp.responseText);
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
           renderFromData(productData);
        }
    };

    xmlhttp.open("GET", "https://flipkart-mock-product.now.sh/", true);
    xmlhttp.send();
}

function renderFromData(data){
    if ('content' in document.createElement('template')) {

        // // Instantiate the table with the existing HTML tbody
        // // and the row with the template
        // var t = document.querySelector('#productrow');
    
        // // Clone the new row and insert it into the table
        // var tb = document.querySelector("tbody");
        // var clone = document.importNode(t.content, true);
        // td = clone.querySelectorAll("td");
        // td[0].textContent = "1235646565";
        // td[1].textContent = "Stuff";
    
        // tb.appendChild(clone);
    
        // // Clone the new row and insert it into the table
        // var clone2 = document.importNode(t.content, true);
        // td = clone2.querySelectorAll("td");
        // td[0].textContent = "0384928528";
        // td[1].textContent = "Acme Kidney Beans 2";
    
        // tb.appendChild(clone2);

        var groupRow = document.querySelector('#grouprow');
        var productRow = document.querySelector('#productrow');
        var headerRow = document.querySelector('#productrow');
        var tb = document.querySelector("tbody");

        data.products.featuresList.forEach((features)=>{
            var clone = document.importNode(groupRow.content, true);
            td = clone.querySelectorAll("td");
            td[1].textContent = features.title;
            td[2].textContent = features.title;
            tb.appendChild(clone);
            features.features.forEach((feature)=>{
                var productRowClone = document.importNode(productRow.content, true);
                tr = productRowClone.querySelectorAll("tr");
                tr[0].cells[1].textContent = feature.featureName;
                tr[1].cells[0].textContent = feature.featureName;
                Object.keys(feature.values).forEach((value)=>{
                    var td = document.createElement('td');
                    td.textContent = feature.values[value];
                    tr[1].appendChild(td);
                });
                tb.appendChild(productRowClone);
            });
        });

    } else {
      // Find another way to add the rows to the table because 
      // the HTML template element is not supported.
    }
}