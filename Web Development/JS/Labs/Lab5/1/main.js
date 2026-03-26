function openWindow() {
  const childWindow = window.open(
    "",
    "ChildWindow",
    "width=400,height=300,left=200,top=200"
  );

  childWindow.document.write("<h1>I am the child window</h1>");

  setTimeout(() => {
    if (childWindow && !childWindow.closed) {
      childWindow.close();
      alert("The child window has been closed.");
    }
  }, 5000);
}
