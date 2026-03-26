const input = document.getElementById("customNumber");

input.addEventListener("keydown", (event) => {
  const functionalKeys = ["Backspace", "ArrowLeft", "ArrowRight"];

  if (functionalKeys.includes(event.key)) {
    return;
  }

  if (!/^[0-9]$/.test(event.key)) {
    event.preventDefault();
  }
});
