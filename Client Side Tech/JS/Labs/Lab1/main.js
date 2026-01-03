function Q1() {
  var y;
  console.log(y); // undefined

  console.log(y); // undefined

  var x = 10;
  var y = 20;
  console.log(y * x - 2); // 198

  var y;
  console.log(typeof y); // number

  var x = "1";
  var y = 2;
  console.log(x + y); // 12

  var x = 1;
  var y = true;
  console.log(x + y); // 2
}

function Q2() {
  const userMessage = prompt("Please enter a message:");

  if (userMessage === null || userMessage.trim() === "") {
    alert("You didn't enter a message!");
  } else {
    for (var i = 1; i <= 6; i++) {
      // var heading = document.createElement("h" + i);
      // heading.append(userMessage);
      // document.body.appendChild(heading);

      var outputHTML = `<h${i}>${userMessage}</h${i}>`;
      document.write(outputHTML);
    }
  }
}
function Q3() {
  var sum = 0;

  while (sum < 100) {
    var number = +prompt(
      "Enter values for summition - Enter 0 to stop or when sum exceeds 100"
    );

    if (isNaN(number)) {
      alert("You didn't enter a number!");
      continue;
    }

    if (number === 0) {
      break;
    }

    sum += number;
  }

  console.log(sum);
}

function Q4() {
  var userName;
  while (true) {
    userName = prompt("Please enter your name:");

    if (userName && isNaN(userName)) {
      break;
    }

    alert("Invalid name! Please enter a valid string (letters only).");
  }

  var birthYear;

  while (true) {
    var input = prompt("Please enter your birth year (must be before 2010):");
    birthYear = Number(input);

    if (
      input !== "" &&
      !isNaN(birthYear) &&
      birthYear < 2010 &&
      birthYear > 1950
    ) {
      break;
    }
    alert("Invalid year! Please enter a valid birth year.");
  }

  var age = 2026 - birthYear;

  document.write("<p><span>Name:</span> " + userName + "</p>");
  document.write("<p><span>Birth year:</span> " + birthYear + "</p>");
  document.write("<p><span>Age:</span> " + age + "</p>");
  var spans = Array.from(document.getElementsByTagName("span"));
  spans.map((s) => {
    s.style.fontWeight = "800";
    s.style.textDecoration = "underline";
  });
}

// Q1();
// Q2();
// Q3();
Q4();
