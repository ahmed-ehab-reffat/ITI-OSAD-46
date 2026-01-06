var count = Number(prompt("Enter number of users:"));
while (isNaN(count) || count <= 0) {
  count = Number(prompt("Invalid input, try again to enter number of users:"));
}

var users = [];

for (var i = 1; i <= count; i++) {
  var userName = prompt(`Enter user ${i} name (3 < length < 10):`);
  while (!userName || userName.length <= 3 || userName.length >= 10) {
    userName = prompt(
      `Invalid input, try again to enter user ${i} name (3 < length < 10):`
    );
  }

  var age = Number(prompt(`Enter user ${i} age (10 < age < 60):`));
  while (isNaN(age) || age <= 10 || age >= 60) {
    age = Number(
      prompt(`Invalid input, try again to enter user ${i} age (10 < age < 60):`)
    );
  }

  users.push({ userName, age });
}

var table = "<table><tr><th>Name</th><th>Age</th></tr>";

for (var i = 0; i < users.length; i++) {
  table += `<tr><td>${users[i].userName}</td><td>${users[i].age}</td></tr>`;
}

table += "</table>";

document.body.innerHTML = table;
