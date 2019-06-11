// ==UserScript==
// @name         Sizer: Simulate Failure
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  One Click Node Failure
// @author       Troy Ward, Brad Faas, Dwayne Harvey, Damien Iweins
// @match        https://sizer.nutanix.com/
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @run-at 	 document-idle
// @grant        GM_addStyle
// @downloadURL  https://raw.githubusercontent.com/steak-sauce/se-tools/master/sizer/Sizer-SimulateFailure.js
// @updateURL    https://raw.githubusercontent.com/steak-sauce/se-tools/master/sizer/Sizer-SimulateFailure.js
// ==/UserScript==

function failNodes(){
	var nodeCount, tableRow;
	var cpuUtil, cpuFail, cpuTresh;
	var memUtil, memFail, memTresh;
	var storUtil, storFail, storTresh;
	var ssdUtil, ssdFail, ssdTresh;
	var failedNodes = 0;

	failedNodes = document.getElementById("failedNodes").value;
    tableRow = document.getElementsByClassName("ant-table-row  ant-table-row-level-0")[0];
	nodeCount = parseInt(tableRow.getElementsByTagName("td")[2].textContent, 10);


	//Cpu Stats:
	cpuUtil = parseInt(document.getElementsByClassName("src-components-presentational-SizingSummary-___sizing-summary__progress-percentage___2pY65")[0].getAttribute('id'), 10);
	//memUtil:
	memUtil = parseInt(document.getElementsByClassName("src-components-presentational-SizingSummary-___sizing-summary__progress-percentage___2pY65")[1].getAttribute('id'), 10);
	//SotrUtil
	storUtil = parseInt(document.getElementsByClassName("src-components-presentational-SizingSummary-___sizing-summary__progress-percentage___2pY65")[2].getAttribute('id'), 10);
	//ssdUtil
	ssdUtil = parseInt(document.getElementsByClassName("src-components-presentational-SizingSummary-___sizing-summary__progress-percentage___2pY65")[3].getAttribute('id'), 10);

    if(failedNodes != 0){
        cpuFail = parseInt((cpuUtil*100)/(100-(failedNodes*(100/nodeCount))),10);
        memFail = parseInt((memUtil*100)/(100-(failedNodes*(100/nodeCount))),10);
        storFail = parseInt((storUtil*100)/(100-(failedNodes*(100/nodeCount))),10);
        ssdFail = parseInt((ssdUtil*100)/(100-(failedNodes*(100/nodeCount))),10);
    }else{
        cpuFail = cpuUtil;
        memFail = memUtil;
        storFail = storUtil;
        ssdFail = ssdUtil;
    }

    //Print Valus for Confirmation
    //console.log(cpuFail);
    //console.log(memFail);
    //console.log(storFail);
    //console.log(ssdFail);

	//Set CPU
	document.getElementsByClassName("src-components-presentational-SizingSummary-___sizing-summary__sizing-summary-table-value___TRGHV")[0].innerText = nodeCount - failedNodes;
	document.getElementsByClassName("src-components-presentational-SizingSummary-___sizing-summary__progress-percentage___2pY65")[0].textContent = cpuFail + "%";
	if(cpuFail>=95){
		document.getElementsByClassName("ant-progress-circle-path")[0].setAttribute('style', 'stroke-dasharray: ' + 295.31*(cpuFail/100) + 'px, 295.31px; stroke-dashoffset: 0px; transition: stroke-dasharray 1000ms ease 0s, stroke 0s ease 0s; stroke: rgb(242, 98, 98);');
	} else if (cpuFail >=90){
		document.getElementsByClassName("ant-progress-circle-path")[0].setAttribute('style', 'stroke-dasharray: ' + 295.31*(cpuFail/100) + 'px, 295.31px; stroke-dashoffset: 0px; transition: stroke-dasharray 1000ms ease 0s, stroke 0s ease 0s; stroke: rgb(255, 188, 11);');
	}else{
        document.getElementsByClassName("ant-progress-circle-path")[0].setAttribute('style', 'stroke-dasharray: ' + 295.31*(cpuFail/100) + 'px, 295.31px; stroke-dashoffset: 0px; transition: stroke-dasharray 1000ms ease 0s, stroke 0s ease 0s; stroke: rgb(54, 208, 104);');
    }

	//Set Memory
    document.getElementsByClassName("src-components-presentational-SizingSummary-___sizing-summary__progress-percentage___2pY65")[1].textContent = memFail + "%";
	if(memFail>=95){
		document.getElementsByClassName("ant-progress-circle-path")[1].setAttribute('style', 'stroke-dasharray: ' + 295.31*(memFail/100) + 'px, 295.31px; stroke-dashoffset: 0px; transition: stroke-dasharray 1000ms ease 0s, stroke 0s ease 0s; stroke: rgb(242, 98, 98);');
	}else if(memFail >= 90){
		document.getElementsByClassName("ant-progress-circle-path")[1].setAttribute('style', 'stroke-dasharray: ' + 295.31*(memFail/100) + 'px, 295.31px; stroke-dashoffset: 0px; transition: stroke-dasharray 1000ms ease 0s, stroke 0s ease 0s; stroke: rgb(255, 188, 11);');
	}else {
        document.getElementsByClassName("ant-progress-circle-path")[1].setAttribute('style', 'stroke-dasharray: ' + 295.31*(memFail/100) + 'px, 295.31px; stroke-dashoffset: 0px; transition: stroke-dasharray 1000ms ease 0s, stroke 0s ease 0s; stroke: rgb(54, 208, 104);');
    }

	//Set Storage
	document.getElementsByClassName("src-components-presentational-SizingSummary-___sizing-summary__progress-percentage___2pY65")[2].textContent = storFail + "%";
	if(storFail>=90){
		document.getElementsByClassName("ant-progress-circle-path")[2].setAttribute('style', 'stroke-dasharray: ' + 295.31*(storFail/100) + 'px, 295.31px; stroke-dashoffset: 0px; transition: stroke-dasharray 1000ms ease 0s, stroke 0s ease 0s; stroke: rgb(242, 98, 98);');
	}else if (storFail >=85){
		document.getElementsByClassName("ant-progress-circle-path")[2].setAttribute('style', 'stroke-dasharray: ' + 295.31*(storFail/100) + 'px, 295.31px; stroke-dashoffset: 0px; transition: stroke-dasharray 1000ms ease 0s, stroke 0s ease 0s; stroke: rgb(255, 188, 11);');
	}else{
    	document.getElementsByClassName("ant-progress-circle-path")[2].setAttribute('style', 'stroke-dasharray: ' + 295.31*(storFail/100) + 'px, 295.31px; stroke-dashoffset: 0px; transition: stroke-dasharray 1000ms ease 0s, stroke 0s ease 0s; stroke: rgb(54, 208, 104);');
    }

    //Set SSDs
	document.getElementsByClassName("src-components-presentational-SizingSummary-___sizing-summary__progress-percentage___2pY65")[3].textContent = ssdFail + "%";
	if(ssdFail>=98){
		document.getElementsByClassName("ant-progress-circle-path")[3].setAttribute('style', 'stroke-dasharray: ' + 295.31*(ssdFail/100) + 'px, 295.31px; stroke-dashoffset: 0px; transition: stroke-dasharray 1000ms ease 0s, stroke 0s ease 0s; stroke: rgb(242, 98, 98);');
	}else if(ssdFail>=90){
		document.getElementsByClassName("ant-progress-circle-path")[3].setAttribute('style', 'stroke-dasharray: ' + 295.31*(ssdFail/100) + 'px, 295.31px; stroke-dashoffset: 0px; transition: stroke-dasharray 1000ms ease 0s, stroke 0s ease 0s; stroke: rgb(255, 188, 11);');
	}else{
		document.getElementsByClassName("ant-progress-circle-path")[3].setAttribute('style', 'stroke-dasharray: ' + 295.31*(ssdFail/100) + 'px, 295.31px; stroke-dashoffset: 0px; transition: stroke-dasharray 1000ms ease 0s, stroke 0s ease 0s; stroke: rgb(54, 208, 104);');
	}
}

function addFailHTML() {
    // Are we already there?
    var fn = document.getElementById("failedNodes");
    if(fn) {
       // console.log("Not adding, we're already there");
        return;
    }

    //console.log("Add Fail HTML");
    var HWSums, setCpuUtil, setMemUtil, setStorUtil, setSsdUtil;
	var htmlCode = "Hardware Summary <span style='float:right; padding-right:25px;'> Fail Node <select id='failedNodes'> <option value='0'>Normal</option> <option value='1'>Fail One </option></span></table>";

	HWSums=document.getElementsByClassName("src-components-container-sizing-right-container-hardware-summary-___hardware-summary__hardware-summary-header-text___3kpl-")[0];
    HWSums.innerHTML = htmlCode;

    //Sets the default values
    setCpuUtil = document.getElementsByClassName("src-components-presentational-SizingSummary-___sizing-summary__progress-percentage___2pY65")[0].textContent;
    document.getElementsByClassName("src-components-presentational-SizingSummary-___sizing-summary__progress-percentage___2pY65")[0].setAttribute('id', setCpuUtil);
    setMemUtil = document.getElementsByClassName("src-components-presentational-SizingSummary-___sizing-summary__progress-percentage___2pY65")[1].textContent;
    document.getElementsByClassName("src-components-presentational-SizingSummary-___sizing-summary__progress-percentage___2pY65")[1].setAttribute('id', setMemUtil);
    setStorUtil = document.getElementsByClassName("src-components-presentational-SizingSummary-___sizing-summary__progress-percentage___2pY65")[2].textContent;
    document.getElementsByClassName("src-components-presentational-SizingSummary-___sizing-summary__progress-percentage___2pY65")[2].setAttribute('id', setStorUtil);
    setSsdUtil = document.getElementsByClassName("src-components-presentational-SizingSummary-___sizing-summary__progress-percentage___2pY65")[3].textContent;
    document.getElementsByClassName("src-components-presentational-SizingSummary-___sizing-summary__progress-percentage___2pY65")[3].setAttribute('id', setSsdUtil);

    var domselect_nodes = document.querySelector ("#failedNodes");
    var SummaryTableRow = document.getElementsByClassName("ant-table-row  ant-table-row-level-0")[0];
	var nodeCount = parseInt(SummaryTableRow.getElementsByTagName("td")[2].textContent, 10);

    if(nodeCount >=5) {
        var opt = document.createElement('option');
        opt.value = 2;
        opt.innerHTML = 'Fail Two';
        domselect_nodes.appendChild(opt);

    }


    if(domselect_nodes) {
        domselect_nodes.addEventListener ("change", failNodes, false);
    }
}

function clearWaitTimer() {
    clearInterval(waitForSizerScreen);
    waitForSizerScreen=null;
}

function WaitForSizerScreen() {
    var WaitForSizerScreenVar = document.getElementsByClassName("src-components-presentational-sizing-options-launcher-___sizingOptions__sizing-option-label___2mSWJ");
    //var WaitForSizerScreenVar = document.getElementsByClassName("src-components-container-sizing-right-container-hardware-summary-___hardware-summary__hardware-summary-header-text___3kpl-");
//    console.log("Watch = " + WaitForSizerScreenVar)
    if(WaitForSizerScreenVar) {
        if(typeof WaitForSizerScreenVar[0] !== 'undefined') {
            clearWaitTimer();
            //console.log("Ok, done watching, setting timeout");
            setTimeout(()=>{addFailHTML()},1000);

        }
    }

}
  // Listen for clicks, so we can add Privacy Mode text back in after a refresh
    document.addEventListener('click', function (event) {
        //console.log("Got click");

        if(!waitForSizerScreen) {
            //console.log("Not currently running a timer, starting one");
            waitForSizerScreen = setInterval(()=>{WaitForSizerScreen()}, 2000);
        }
    });
console.log("Starting Sizer Failure Simulator");
var waitForSizerScreen = setInterval(()=>{WaitForSizerScreen()}, 2000);
