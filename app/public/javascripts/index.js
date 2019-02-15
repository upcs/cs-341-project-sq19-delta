"use strict";
function search() {
    var name = "";
    var streetNameInput = document.getElementById("street-name");
    if (streetNameInput) {
        name = streetNameInput.value;
    }
    if (name == "") {
        console.log("Nothing as input");
        return;
    }
    if (name !== null) {
        var url = "http://localhost:3000/roads?search=" + name;
        console.log("getting road from name: " + name);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.send();
        xhr.onload = function (response) {
            console.log(response);
            // document.getElementById('information').innerHTML = this.responseText;
            var data = JSON.parse(this.responseText);
            var list = document.createElement("ul");
            list.setAttribute("style", "margin: 0; padding: 0;");
            if (data.length == 0) {
                var emptyStr = "<p>Sorry, we found no search results</p>";
                var emptyRoad = document.createElement("li");
                emptyRoad.setAttribute("style", "list-style-type: none;");
                emptyRoad.classList.add("empty-road");
                emptyRoad.innerHTML = emptyStr;
                list.appendChild(emptyRoad);
            }
            for (var i = 0; i < data.length; i++) {
                var road = document.createElement("li");
                if (i == data.length - 1)
                    road.setAttribute("style", "list-style-type: none; margin: 0; padding: 0;");
                else
                    road.setAttribute("style", "list-style-type: none; margin: 0; padding: 0; margin-bottom: 1vh;");
                road.classList.add("road-list");
                var str = "\n\t\t\t\t<div class=\"card bg-light mb-3\" style=\"width: 100%;\">\n\t\t\t\t<div class=\"card-header\">" + (Math.random() * (i + 5)).toFixed(1) + " miles away</div>\n\t\t\t\t\t<div class=\"card-body\">\n\t\t\t\t\t\t<h5 class=\"card-title\">" + data[i]["FULL_NAME"] + " " + data[i]["LEFTZIP"] + "\n\t\t\t\t\t\t\t<a href= \"/dataReviews.html\" class=\"btn btn-primary float-right\" >Rate Road</a>\n\t\t\t\t\t\t</h5>\n\t\t\t\t\t</div>\n\t\t\t  \t</div>";
                road.innerHTML = str;
                list.appendChild(road);
            }
            var information = document.getElementById("information");
            if (information) {
                information.innerHTML = "";
                information.appendChild(list);
                information.setAttribute("style", "display: inherit");
            }
            var resultsCard = document.getElementById("results-card");
            if (resultsCard) {
                resultsCard.setAttribute("style", "display: inherit;");
            }
            var resultsTitle = document.getElementById("results-title");
            if (resultsTitle) {
                resultsTitle.innerHTML = "Showing " + data.length + " of " + data.length + " results.";
            }
            return response;
        };
    }
    else {
        return null;
    }
}
