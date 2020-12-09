var advancedMenuIsOpen = false;
var basicMenuIsOpen = false;

document.getElementById("advancedButton").addEventListener("click", advancedMenu);
document.getElementById("hamburger").addEventListener("click", basicMenu);

function setNav() {
  document.getElementById("nav").style.transform = "translateX(-500px)"
  //document.getElementById("nav").style.width = 0;
}

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
  //document.getElementById("nav").style.width = "100%";
  document.getElementById("nav").style.transform = "translateX(0)"
  document.getElementById("advancedButton").innerText = "Basic";
  advancedMenuIsOpen = true;
}

function closeAdvancedMenu() {
  document.getElementById("nav").style.transform = "translateX(-70%)"
  document.getElementById("advancedButton").innerText = "Advanced";
  advancedMenuIsOpen = false;
}

/*
    BASIC SIDE NAV MENU
*/

function basicMenu() {
if (advancedMenuIsOpen)
{closeAdvancedMenu()}
else {
  if (basicMenuIsOpen) {
    closeBasicMenu();
  } else {
    openBasicMenu();
  }
}
}

function openBasicMenu() {
console.log("open");
//document.getElementById("nav").style.width = "30%";
document.getElementById("nav").style.transform = "translateX(-70%)"
basicMenuIsOpen = true;
}

function closeBasicMenu() {
console.log("close");
//document.getElementById("nav").style.width = "0";
document.getElementById("nav").style.transform = "translateX(-100%)"
basicMenuIsOpen = false;
}

/*
    NICE LOGGER YES
*/
function logger() {
  console.log("PEPE");
}
