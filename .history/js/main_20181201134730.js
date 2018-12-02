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

        var headercolumn = document.querySelector('#headercolumn');
        var groupRow = document.querySelector('#grouprow');
        var productRow = document.querySelector('#productrow');
        var tb = document.querySelector("tbody");
        var th = document.querySelector("thead");

        // Object.keys(data.products.compareSummary.titles).forEach((id)=>{
        //     var clone = document.importNode(headercolumn.content, true);
        //     img = clone.querySelector('img');
        //     img.src = data.products.compareSummary.images[id];
        //     div = clone.querySelector('div');
        //     div.textContent = data.products.compareSummary.titles[id].title;
        //     spans = clone.querySelectorAll('span');
        //     spans[0].textContent = data.products.compareSummary.productPricingSummary[id].finalPrice;
        //     spans[1].textContent = data.products.compareSummary.productPricingSummary[id].price;
        //     spans[2].textContent = data.products.compareSummary.productPricingSummary[id].totalDiscount+'%';
        //     th.rows[0].appendChild(clone);

        // });
        // data.products.featuresList.forEach((features)=>{
        //     var clone = document.importNode(groupRow.content, true);
        //     td = clone.querySelectorAll("td");
        //     td[1].textContent = features.title;
        //     td[2].textContent = features.title;
        //     tb.appendChild(clone);
        //     features.features.forEach((feature)=>{
        //         var productRowClone = document.importNode(productRow.content, true);
        //         tr = productRowClone.querySelectorAll("tr");
        //         tr[0].cells[1].textContent = feature.featureName;
        //         tr[1].cells[0].textContent = feature.featureName;
        //         Object.keys(feature.values).forEach((value)=>{
        //             var td = document.createElement('td');
        //             td.textContent = feature.values[value];
        //             tr[1].appendChild(td);
        //         });
        //         tb.appendChild(productRowClone);
        //     });
        // });


        var tdObject = {};
        Object.keys(data.products.compareSummary.titles).forEach((id)=>{
            var clone = document.importNode(headercolumn.content, true);
            img = clone.querySelector('img');
            img.src = data.products.compareSummary.images[id];
            div = clone.querySelector('div');
            div.textContent = data.products.compareSummary.titles[id].title;
            spans = clone.querySelectorAll('span');
            spans[0].textContent = data.products.compareSummary.productPricingSummary[id].finalPrice;
            spans[1].textContent = data.products.compareSummary.productPricingSummary[id].price;
            spans[2].textContent = data.products.compareSummary.productPricingSummary[id].totalDiscount+'%';
            th.rows[0].appendChild(clone);
            var td = document.createElement('td');
            td.textContent = feature.values[value];
            tdObject[id] = td;

        });
        data.products.featuresList.forEach((features)=>{
            var clone2 = document.importNode(groupRow.content, true);
            td = clone2.querySelectorAll("td");
            td[1].textContent = features.title;
            td[2].textContent = features.title;
            tb.appendChild(clone2);
            features.features.forEach((feature)=>{
                var productRowClone = document.importNode(productRow.content, true);
                tr = productRowClone.querySelectorAll("tr");
                tr[0].cells[1].textContent = feature.featureName;
                tr[1].cells[0].textContent = feature.featureName;
                Object.keys(feature.values).forEach((value)=>{
                    // var td = document.createElement('td');
                    // td.textContent = feature.values[value];
                    tr[1].appendChild(tdObject[value]);
                });
                tb.appendChild(productRowClone);
            });
        });

    } else {
      // Find another way to add the rows to the table because 
      // the HTML template element is not supported.
    }
}