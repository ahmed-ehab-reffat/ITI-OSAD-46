var numberRegex = /^[0-9]+$/;
var arr = [];

var labels = ["first", "second", "third"];
while (arr.length < 3) {
  var value = prompt(`Enter the ${labels[arr.length]} number`);
  while (!numberRegex.test(value)) {
    value = prompt("Invalid number. Please enter a valid numeric number:");
  }
  value = Number(value);
  arr.push(value);
}

var sum = arr[0] + arr[1] + arr[2];
var mul = arr[0] * arr[1] * arr[2];
var divid = arr[0] / arr[1] / arr[2];

var p1 = document.createElement("p");
var span1 = document.createElement("span");
span1.textContent = "Sum of the 3 values ";
var operation1 = document.createTextNode(
  `${arr[0]} + ${arr[1]} + ${arr[2]} = ${sum}`
);
p1.appendChild(span1);
p1.appendChild(operation1);
document.body.appendChild(p1);

var p2 = document.createElement("p");
var span2 = document.createElement("span");
span2.textContent = "Sum of the 3 values ";
var operation2 = document.createTextNode(
  `${arr[0]} * ${arr[1]} * ${arr[2]} = ${mul}`
);
p2.appendChild(span2);
p2.appendChild(operation2);
document.body.appendChild(p2);

var p3 = document.createElement("p");
var span3 = document.createElement("span");
span3.textContent = "Sum of the 3 values ";
var operation3 = document.createTextNode(
  `${arr[0]} / ${arr[1]} / ${arr[2]} = ${divid}`
);
p3.appendChild(span3);
p3.appendChild(operation3);
document.body.appendChild(p3);

var spans = document.querySelectorAll("span");
spans.forEach((span) => {
  span.style.color = "red";
});
