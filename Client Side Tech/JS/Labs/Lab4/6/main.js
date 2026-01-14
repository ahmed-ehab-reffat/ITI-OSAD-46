window.addEventListener("keydown", (event) => {
  let message = `ASCII Code: ${event.keyCode}\n`;
  if (event.altKey) {
    message += `Alt Key`;
  } else if (event.ctrlKey) {
    message += `Ctrl Key`;
  } else if (event.shiftKey) {
    message += `Shift Key`;
  } else {
    message += `Regular Key`;
  }

  alert(message);
});
