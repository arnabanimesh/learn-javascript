const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

let myLeads = [];

if (localStorage.hasOwnProperty("myLeads")) {
    myLeads = JSON.parse(localStorage.getItem("myLeads"));
    if (Object.prototype.toString.call(myLeads) != '[object Array]') {
        myLeads = [];
    } else {
        render(myLeads);
    }
}

inputBtn.addEventListener("click", function () {
    if (inputEl.value !== "") {
        myLeads[myLeads.length] = inputEl.value;
        render(myLeads);
        inputEl.value = "";
    }
});

//on pressing enter save entry
inputEl.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        inputBtn.click();
    }
});

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        if(/^(ftp|https?):\/\//.test(tabs[0].url)){myLeads[myLeads.length] = tabs[0].url.substring(tabs[0].url.search(/:/)+3);
        render(myLeads);}
        else {console.log("Local system resource links e.g. about:, chrome:// can not be loaded by extensions.")};
    });
});

deleteBtn.addEventListener("dblclick", function () {
    localStorage.removeItem("myLeads");
    myLeads = [];
    render(myLeads);
});

document.querySelector('body').addEventListener('mousedown', function (event) {
    if (event.target.className.toLowerCase() === 'close-btn') {
        let closeBtns = document.getElementsByClassName("close-btn");
        Array.from(closeBtns).forEach(function (closeBtn) {
            closeBtn.addEventListener("click", function () {
                myLeads.splice(closeBtn.id.substring(6), 1);
                render(myLeads);
            });
        });
    }
});

function render(leads) {
    ulEl.textContent = "";
    const frag = document.createDocumentFragment();
    for (let i = 0; i < leads.length; i++) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        const span = document.createElement("span");
        let aText = document.createTextNode(leads[i]);
        const spanText = document.createTextNode("X");
        let aTextStr = aText.wholeText;
        if (aTextStr.length > 53) {
            aText = document.createTextNode(aText.wholeText.substring(0, 50) + "...");
        }
        if (!(/:\/\//.test(aTextStr))) { aTextStr = "https://" + aTextStr; }
        a.setAttribute('href', aTextStr);
        a.setAttribute('target', '_blank');
        a.appendChild(aText);
        span.setAttribute('class', 'close-btn');
        span.setAttribute('id', 'close-' + i);
        span.appendChild(spanText);
        li.append(a, span);
        frag.appendChild(li);
    }
    ulEl.appendChild(frag);
    localStorage.setItem("myLeads", JSON.stringify(leads));
}