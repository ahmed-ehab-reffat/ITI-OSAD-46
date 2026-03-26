var nav = document.getElementById("nav");

nav.style.listStyle = "circle";
nav.style.display = "inline-block";

var topImage = document.querySelector("img");

topImage.style.display = "block";
topImage.style.marginLeft = "auto";

var bottomImage = topImage.cloneNode(true);
bottomImage.style.marginLeft = "0";
bottomImage.style.marginRight = "auto";

document.body.appendChild(bottomImage);
