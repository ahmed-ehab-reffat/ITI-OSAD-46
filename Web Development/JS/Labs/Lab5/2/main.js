const regForm = document.getElementById("regForm");
const regArea = document.getElementById("registrationArea");
const welcomeArea = document.getElementById("welcomeArea");

const inactivityTimeout = setTimeout(() => {
  alert("Timeout: You haven't entered any data!");
  location.reload();
}, 30000);

regForm.addEventListener(
  "input",
  () => {
    clearTimeout(inactivityTimeout);
  },
  { once: true }
);

regForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("userName").value,
    email: document.getElementById("email").value,
    mobile: document.getElementById("mobile").value,
    address: document.getElementById("address").value,
    gender: document.getElementById("gender").value,
  };

  document.getElementById("greeting").innerText = `Welcome, ${data.name}!`;

  document.getElementById("dispEmail").innerText = data.email;
  document.getElementById("dispMobile").innerText = data.mobile;
  document.getElementById("dispAddress").innerText = data.address;
  document.getElementById("dispGender").innerText = data.gender;

  regArea.classList.add("hidden");
  welcomeArea.classList.remove("hidden");
});
