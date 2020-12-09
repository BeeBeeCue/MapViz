var advancedMenuIsOpen = false;
var basicMenuIsOpen = false;



document.getElementById("advancedButton").addEventListener("click", advancedMenu);
document.getElementById("hamburger").addEventListener("click", basicMenu);


/*
    ADVANCED MENU / DASHBOARD
*/
function advancedMenu() {
  if (advancedMenuIsOpen) {
    closeAdvancedMenu();
  } else {
    openAdvancedMenu();
  }
}

function openAdvancedMenu() {
  document.getElementById("nav").style.width = "100%";
  document.getElementById("advancedButton").innerText = "Basic";
  advancedMenuIsOpen = true;
}

function closeAdvancedMenu() {
  document.getElementById("nav").style.width = "500px";
  document.getElementById("advancedButton").innerText = "Advanced";
  advancedMenuIsOpen = false;
}

/*
    BASIC SIDE NAV MENU
*/

function basicMenu() {
if (basicMenuIsOpen) {
    closeBasicMenu();
  } else {
    openBasicMenu();
  }
}

function openBasicMenu() {
console.log("open");
document.getElementById("nav").style.transform = "translateX(0px)"
basicMenuIsOpen = true;
}

function closeBasicMenu() {
console.log("close");
document.getElementById("nav").style.transform = "translateX(-500px)"
basicMenuIsOpen = false;
}


/*
    NICE LOGGER YES
*/
function logger() {
  console.log("PEPE");
}
