let divs = Array.from(document.getElementsByTagName("div"));

let current = 0;
let interval;

function startInterval() {
  interval = setInterval(() => {
    divs[current].classList.remove("active");
    current = (current + 1) % divs.length;
    divs[current].classList.add("active");
  }, 1000);
}

divs.forEach((el) => {
  el.addEventListener("mouseenter", () => clearInterval(interval));
});

divs.forEach((el) => {
  el.addEventListener("mouseleave", startInterval);
});

startInterval();
