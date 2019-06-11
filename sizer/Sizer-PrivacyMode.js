// ==UserScript==
// @name         Sizer: PrivacyMode
// @namespace    http://tampermonkey.net/
// @version      1.1.2
// @description  Hide stuff in sizer
// @author       Troy Ward, Brad Faas, Dwayne Harvey, Damien Iweins
// @match        https://sizer.nutanix.com/
// @grant        GM_addStyle
// @downloadURL  https://raw.githubusercontent.com/steak-sauce/se-tools/master/sizer/Sizer-PrivacyMode.js
// @updateURL    https://raw.githubusercontent.com/steak-sauce/se-tools/master/sizer/Sizer-PrivacyMode.js
// ==/UserScript==

var PrivacyMode = "false";
var incognito;

// Helper functions to get/set cookie
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  var ctemp = cname + "=" + cvalue + ";" + expires + ";path=/";

  document.cookie=ctemp;
}

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

// Function to add PrivacyMode selection to Sizer
function addPrivacyMode(firstLoad) {

    // Make sure we're in Sizer and not another tool on services.nutanix.com
    // Make sure it's not already added
    //var sizerMode = document.getElementById("nx.sizer");
    var sizerModeMy = document.getElementsByClassName("src-components-container-my-scenarios-___my-scenarios__dashboard-container___1Fuib");
    var sizerModeShared = document.getElementsByClassName("src-components-container-shared-scenarios-___shared-scenarios__shared-scenario-count-container___8q0L-");
    var sizerModeSearch = document.getElementsByClassName("src-components-container-search-page-___search__search-filter-wrapper___2bK5o");
    if(typeof sizerModeMy[0] === 'undefined' && typeof sizerModeShared[0] === 'undefined' && typeof sizerModeSearch[0] === 'undefined' ) { return; }

    if(firstLoad) {
        PrivacyMode = getCookie("PrivacyMode");
    }

    // Make sure it's not already added
    var currentButton = document.getElementById("btn_privacymode");
    if(!currentButton) {

        var HeaderSpan = document.getElementsByClassName("src-components-presentational-Header-___header__right-content___3VY2_")[1];
        var PrivacyModeHTML = document.createElement("span");
        PrivacyModeHTML.innerHTML = '<span><span class=""><button name="NxButton" wrapclassname="" type="button" class="ant-btn src-components-presentational-Header-___header__search-link___2QaZj" id="btn_privacymode"><span id="incognito_text" class="src-components-presentational-Header-___header__search-text___1PzQk">Privacy</span></button></span></span>';
        HeaderSpan.prepend(PrivacyModeHTML);

        // Make it red if we're on
        if(PrivacyMode==="true") {
            document.getElementById("incognito_text").style.color = "red";
        }

        var dombtn_privacymode = document.querySelector ("#btn_privacymode");
        if (dombtn_privacymode) {
            dombtn_privacymode.addEventListener ("click", TogglePrivacyMode, false);
        }

        // If first load and PrivacyMode is true, we retrieved that from the cookie value
        // This means PrivacyMode was set to true in a previous session, so we need to immediately blur everything
        // So set PrivacyMode to 'false' and then call the Toggle
        if(PrivacyMode==="true" && firstLoad) {
            PrivacyMode="false";
            TogglePrivacyMode();
        }
    }
}

// Function to add style to head
function addGlobalStyle(css) {
   var head, style;
   head = document.getElementsByTagName('head')[0];
   if (!head) { return; }
   style = document.createElement('style');
   style.type = 'text/css';
   style.innerHTML = css;
   style.setAttribute("class", "privacy-mode");
   head.appendChild(style);
}

// On button click, add styles to hide sizer info
function TogglePrivacyMode() {
  if(PrivacyMode==="false") {
    incognito = true;
    addGlobalStyle('.src-components-presentational-MyScenariosListRow-___my-scenarios-list-row__text-ellipsis___32Hir { -webkit-filter: blur(4px); -moz-filter: blur(4px); -o-filter: blur(4px); -ms-filter: blur(4px); filter: blur(4px); background-color: #fff;}');
    addGlobalStyle('.src-components-presentational-GenericDashboardListRow-___generic-dashboard-list-row__text-ellipsis___1XrbP { -webkit-filter: blur(4px); -moz-filter: blur(4px); -o-filter: blur(4px); -ms-filter: blur(4px); filter: blur(4px); background-color: #fff;}');
    addGlobalStyle('.ant-tooltip { display: none; }');
    addGlobalStyle('.src-components-presentational-DashboardCard-___dashboard-card__trim-text___X_Bor { -webkit-filter: blur(4px); -moz-filter: blur(4px); -o-filter: blur(4px); -ms-filter: blur(4px); filter: blur(4px); background-color: #fff;}');
    //document.getElementsByClassName("src-components-presentational-Header-___header__search-text___1PzQk")[0].style.color = "red";
    document.getElementById("incognito_text").style.color = "red";
    PrivacyMode = "true";

  }
  else {
    document.getElementsByClassName("src-components-presentational-Header-___header__search-text___1PzQk")[0].removeAttribute("style");
    var incognito = document.getElementsByClassName("privacy-mode");
    for(var i=incognito.length; i--;) {
      incognito[i].remove();
    }
    PrivacyMode = "false";
  }
    setCookie("PrivacyMode",PrivacyMode,5);
}

console.log("Starting Sizer Privacy Mode");

// On page load, add Privacy Mode button so we can add the styles
setTimeout(() => {
    addPrivacyMode(1);
    // Listen for clicks, so we can add Privacy Mode text back in after a refresh
    document.addEventListener('click', function (event) {
        // Log the clicked element in the console
        // Add Privacy Mode button

        setTimeout(()=>{addPrivacyMode();},1000);
    }, false);

}, 1000);
