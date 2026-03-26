document.body.addEventListener("click", (event) => {
  if (event.target.tagName === "DIV") {
    let original = event.target;
    let clone = original.cloneNode(true);

    clone.style.backgroundColor = generateRandomColor();
    document.body.appendChild(clone);
  }
});

function generateRandomColor() {
  let randomColor = "#";

  for (let i = 0; i < 6; i++) {
    let num = Math.floor(Math.random() * 16);

    switch (num) {
      case 10:
        num = "a";
        break;
      case 11:
        num = "b";
        break;
      case 12:
        num = "c";
        break;
      case 13:
        num = "d";
        break;
      case 14:
        num = "e";
        break;
      case 15:
        num = "f";
        break;
      default:
        num.toString();
    }

    randomColor += num;
  }

  return randomColor;
}
