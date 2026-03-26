var numbers = [];

for (let i = 1; i <= 5; i++) {
  var number = Number(prompt(`Enter number ${i} of 5:`));

  while (typeof number !== "number" || isNaN(number)) {
    var number = Number(
      prompt(`Invalid inputr, try again to enter number ${i} of 5:`)
    );
  }

  numbers.push(number);
}

var p1 = document.createElement("p");
var span1 = document.createElement("span");
span1.textContent = "u've entered the values of ";
var operation1 = document.createTextNode(numbers);
p1.appendChild(span1);
p1.appendChild(operation1);
document.body.appendChild(p1);

numbers.sort((a, b) => a - b);

var p2 = document.createElement("p");
var span2 = document.createElement("span");
span2.textContent = "ur values after being sorted descending ";
var operation2 = document.createTextNode(numbers);
p2.appendChild(span2);
p2.appendChild(operation2);
document.body.appendChild(p2);

numbers.reverse();

var p3 = document.createElement("p");
var span3 = document.createElement("span");
span3.textContent = "ur values after being sorted ascending ";
var operation3 = document.createTextNode(numbers);
p3.appendChild(span3);
p3.appendChild(operation3);
document.body.appendChild(p3);

var spans = document.querySelectorAll("span");
spans.forEach((span) => {
  span.style.color = "red";
});
