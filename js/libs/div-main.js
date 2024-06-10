
import { logout } from '../login.js';

/**
* This file starts all the Javascript functionality
*/

function showDivHome(){
    libs_general_hideAllDivsInDivExceptOne("div-main", "div-home") 
}
function showDivMap(){
    libs_general_hideAllDivsInDivExceptOne("div-main", "div-map") 
}
function showDivF3(){
    libs_general_hideAllDivsInDivExceptOne("div-main", "div-f3") 
}
function showDivHelp(){
    libs_general_hideAllDivsInDivExceptOne("div-main", "div-help") 
}
function showDivAbout(){
    libs_general_hideAllDivsInDivExceptOne("div-main", "div-about") 
}
function showDivLogin(){
    libs_general_hideAllDivsInDivExceptOne("div-main", "div-login") 
}
function showDivLogout(){
    libs_general_hideAllDivsInDivExceptOne("div-main", "div-logout");
    logout();

}

function linkMenuEvents(){
    document.getElementById("menu-home").addEventListener("click", showDivHome);
    document.getElementById("menu-map").addEventListener("click", showDivMap);
    document.getElementById("menu-f3").addEventListener("click", showDivF3);
    document.getElementById("menu-help").addEventListener("click", showDivHelp);
    document.getElementById("menu-about").addEventListener("click", showDivAbout);
    document.getElementById("menu-login").addEventListener("click", showDivLogin);
    document.getElementById("menu-logout").addEventListener("click", showDivLogout);
}



function mainInit(){
    //alert("I am loaded and ready to work");
    linkMenuEvents();
    showDivHome();
}

window.onload = function () {
    mainInit();
};