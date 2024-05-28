// Variables
let isMenuOn = false;
const menu = document.querySelector(".menuButton");
const menuLink = document.querySelector("#myLinks");

// Sub functions
function menuFunction() {
  // If show then turn off
  if (isMenuOn) {
    isMenuOn = false;
    menuLink.style.display = "none"
  } else {
    // Else off then turn on
    isMenuOn = true;
    menuLink.style.display = "block"
  }
}

// Main Function
menu.addEventListener("click", menuFunction);
