// ==UserScript==
// @name         Add PC name to Tab
// @version      1.0
// @description  Show PC name in the browser tab
// @author       Troy Ward
// @include      https://*:9440/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==
var PCNameToTabCookie = window.location.host;
var PCNameToTabCookie_Name;
var change_PCtitle;

// Verify this is PC
function isThisPC() {
    var title = document.getElementsByTagName("title")[0].innerHTML;
    if (title==="Prism Central") {
        return title;
    } else {
        return false;
    }
}

// Helper functions to get/set cookie
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }

    return false;
  }

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  var ctemp = cname + "=" + cvalue + ";" + expires + ";path=/";

  document.cookie=ctemp;
}

// Function to add PC Name to Tab Title
function addPCNameToTab(PCNameToTabCookie, PCNameToTabCookie_Name) {
    // Add to menu, if it hasn't already been added
    if(!document.getElementById("change_PCtitle")) {
        console.log("[PCTab] Adding Menu Item");
        var addToMenu = document.getElementsByClassName("n-nav-col col1")[2];
        var addToMenuHTML = document.createElement("li");
        addToMenuHTML.innerHTML = '<li class="n-nav-menu-item"><a href="#" id="change_PCtitle">Change PC Title</a></li>';
        addToMenu.prepend(addToMenuHTML);
    }

    // A name already exists, set it
    if(PCNameToTabCookie_Name) {
        console.log("[PCTab] Setting PC title to " + getCookie("PCNameToTabCookie_Name"));
        document.title = getCookie("PCNameToTabCookie_Name");

    // A name has not been set yet, so we need to set it (if the user wants to)
    } else {
        console.log("[PCTab] PCNameToTabCookie_Name needs to be created");
        setTitle
    }
}

function setTitle (zEvent) {
    var currentTitle = document.title;
    var myPCName = window.prompt("Please enter PC Name",currentTitle);

    if (myPCName === null) {
        myPCName = currentTitle;
    }

    document.title = myPCName;

    // Set cookies
    setCookie("PCNameToTabCookie_Name",myPCName,5);
    setCookie("PCNameToTabCookie",window.location.host,5);
}

// On page load, add Privacy Mode button so we can add the styles
setTimeout(() => {
    // Make sure we're in a PC instance
    if(isThisPC()) {
        console.log("[PCTab] This is a PC instance, starting script");

        addPCNameToTab(getCookie("PCNameToTabCookie"), getCookie("PCNameToTabCookie_Name"));

        var myDiv = document.querySelector ("#change_PCtitle");
        if (myDiv) {
            myDiv.addEventListener ("click", setTitle , false);
        }
    }
}, 10000);