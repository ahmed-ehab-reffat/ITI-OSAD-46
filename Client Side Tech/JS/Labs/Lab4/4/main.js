let nextButton = document.getElementById("next");
let slideShowButton = document.getElementById("slideShow");
let stopButton = document.getElementById("stop");
let previousButton = document.getElementById("previous");

let images = Array.from(document.getElementsByTagName("img"));

let currentImage = 0;

function nextImage() {
  images[currentImage].style.display = "none";
  currentImage = (currentImage + 1) % images.length;
  images[currentImage].style.display = "inline";
}

function previousImage() {
  images[currentImage].style.display = "none";
  currentImage = (currentImage + images.length - 1) % images.length;
  images[currentImage].style.display = "inline";
}

nextButton.addEventListener("click", nextImage);

previousButton.addEventListener("click", previousImage);

let slideSohwInterval;

slideShowButton.addEventListener("click", () => {
  nextImage();
  slideSohwInterval = setInterval(nextImage, 500);
});

stopButton.addEventListener("click", () => clearInterval(slideSohwInterval));
