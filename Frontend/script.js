// SHOW DETAILS + MOVE LEFT
function showDetails() {
  document.getElementById("details").classList.remove("hidden");
  document.getElementById("main").style.justifyContent = "flex-start";
}

// THEME
function setTheme(theme) {
  document.body.className = theme;
}

// POPUP
function openPopup() {
  document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

// CONTACT SEND
function submitForm() {
  const name = document.getElementById("name").value;
  const mobile = document.getElementById("mobile").value;
  const email = document.getElementById("email").value;

  fetch("http://localhost:5000/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, mobile, email })
  })
  .then(res => res.text())
  .then(data => {
    alert(data);
    closePopup();
  });
}

// SLOW TYPING EFFECT
const roles = ["Full Stack Developer ", "Web Designer ", "Learner 🚀"];
let i = 0, j = 0, current = "", deleting = false;

function typeEffect() {
  const text = roles[i];

  if (!deleting) {
    current = text.substring(0, j++);
  } else {
    current = text.substring(0, j--);
  }

  document.getElementById("role-text").innerText = current;

  if (!deleting && j === text.length) {
    deleting = true;
    setTimeout(typeEffect, 4000);
  } else if (deleting && j === 0) {
    deleting = false;
    i = (i + 1) % roles.length;
    setTimeout(typeEffect, 1000);
  } else {
    setTimeout(typeEffect, deleting ? 80 : 150);
  }
}

typeEffect();