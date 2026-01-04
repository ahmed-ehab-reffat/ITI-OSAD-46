var nameRegex = /^[a-zA-Z]+( [a-zA-Z])*$/;
var phoneRegex = /^[0-9]{11}$/;
var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

var userName = prompt("Enter your full name (letters only):");
while (!nameRegex.test(userName)) {
  userName = prompt("Invalid name. Try again:");
}

var userPhone = prompt("Enter your phone number (11 digits):");
while (!phoneRegex.test(userPhone)) {
  userPhone = prompt(
    "Invalid phone. Please enter a valid numeric phone number:"
  );
}

var userEmail = prompt("Enter your email address:");
while (!emailRegex.test(userEmail)) {
  userEmail = prompt("Invalid email format. Please try again:");
}

var welcomeMessage = `
    <p>Welcome, ${userName}!</p>
    <p>- Phone: ${userPhone}</p>
    <p>- Email: ${userEmail}</p>

`;

document.write(welcomeMessage);
