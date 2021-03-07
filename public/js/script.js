const menuknop = document.querySelector('button'); //pen button
const menuknopimg = document.querySelector('img'); //pen image button
const submenuknop = document.querySelector('li'); // submenuknop merken
const submenuknop3 = document.querySelector('#submenuknop3'); //submenuknop categories
const menulijst = document.querySelector('ul'); //pen menu
const menulijst2 = document.querySelector('ol'); //merken menu
const menulijst3 = document.querySelector('#menulijst3'); // catergories menu

function toonMenu() {
menulijst.classList.toggle('toonMenu');
}


function toonMenu2() {
menulijst2.classList.toggle('toonMenu2');
}

function toonMenu3() {
menulijst3.classList.toggle('toonMenu3');
}

menuknop.addEventListener('click', toonMenu);
menuknopimg.addEventListener('click', toonMenu);
submenuknop.addEventListener('click', toonMenu2);
submenuknop3.addEventListener('click', toonMenu3);


