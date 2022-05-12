"use strict";

// refresh the values as they are change in the input boxes
// called on 'oninput' function for each input element
function refreshDay() {
    document.getElementById("clockDays").innerText =
        document.getElementById("daySelector").value;
    GetValues();
}

function refreshHour() {
    document.getElementById("clockHours").innerText =
        document.getElementById("hourSelector").value;
    GetValues();
}

function refreshMin() {
    document.getElementById("clockMins").innerText =
        document.getElementById("minSelector").value;
    GetValues();
}

function refreshSec() {
    document.getElementById("clockSecs").innerText =
        document.getElementById("secSelector").value;
    GetValues();
}