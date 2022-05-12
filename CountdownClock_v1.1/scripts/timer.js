"use strict";

//set page containers
var headerSetTimer = document.getElementById('headerSetTimer');
var inputRow = document.getElementById('inputRow');
var btnStartContainer = document.getElementById('btnStartContainer');
var clockDisplayer = document.getElementById('clockDisplayer');

//run clock containers
var CountdownClock = document.getElementById('CountdownClock');
var btnResetPause = document.getElementById('btnReset-btnPause');

// values from input boxes
var selDay;
var selHour;
var selMin;
var selSec;

// variables used in main clock
var Days;
var Hours;
var Mins;
var Secs;

// audio
var sound = new Audio('sounds/alarm.mp3');

// bools
var isValid = new Boolean();
var valuesAreZero = new Boolean();
var ClockIsRunning = new Boolean();
var ClockIsFinished = new Boolean();
var isPaused = new Boolean()

function Start() {
    //get all values in input boxes
    GetValues();

    if (isValid != true) {
        window.alert("invalid values");
        location.reload();
    }
    else {
        HideMainContainers();
        SetClock();
        RunClock();
    }
}

function GetValues() {
    // take selected values from input boxes and parse to int
    selDay = parseInt(document.getElementById("daySelector").value);
    selHour = parseInt(document.getElementById("hourSelector").value);
    selMin = parseInt(document.getElementById("minSelector").value);
    selSec = parseInt(document.getElementById("secSelector").value);

    //parse empty fields to zero automatically
    if (document.getElementById("daySelector").value == '') { selDay = 0 }
    if (document.getElementById("hourSelector").value == '') { selHour = 0 }
    if (document.getElementById("minSelector").value == '') { selMin = 0 }
    if (document.getElementById("secSelector").value == '') { selSec = 0 }

    //if all values are 0, invalid
    if (selDay == 0 && selHour == 0 && selMin == 0 && selSec == 0) {
        isValid = false;
    }
    else { isValid = true; }

    // if any values are over their limit they are not valid
    if (selDay > 365 || selHour > 24 || selMin > 59 || selSec > 59) {
        isValid = false;
    }
}

function Reset() {
    location.reload();
}

// main clock interval
var timer = setInterval(RunClock, 1000);



function HideMainContainers() {
    headerSetTimer.style.display = "none";
    inputRow.style.display = "none";
    btnStartContainer.style.display = "none";
    clockDisplayer.style.display = "none";

    CountdownClock.style.display = "block";
    btnResetPause.style.display = "block";
}



function SetClock() {
    document.getElementById("Days").innerText = selDay + " : ";
    document.getElementById("Hours").innerText = selHour + " : ";
    document.getElementById("Mins").innerText = selMin + " : ";
    document.getElementById("Secs").innerText = selSec + " s";

    Days = parseInt(selDay);
    Hours = parseInt(selHour);
    Mins = parseInt(selMin);
    Secs = parseInt(selSec);
    Secs++;
}

function RunClock() {

    // checks if clock runs out
    if (Days == 0 && Hours == 0 && Mins == 0 && Secs == 0) {
        // Secs = 88;
        ClockIsFinished = true;
        sound.play();
    }
 
    if (Secs > -1) //  decrement second if sec is above -1
    {
        Secs--;

        if (Hours == 0 && Mins == 0 && Secs == -1) { //execute if it reaches end of day
            Days--;
            Secs = 59;
            Mins = 59;
            Hours = 23;
        }
        else if (Mins == 0 && Secs == -1) { //execute if it reaches end of hour
            Hours--;
            Secs = 59;
            Mins = 59;
        }
        else if (Secs == -1) { //execute if it reaches end of minute
            Mins--;
            Secs = 59;
        }
    }

    // refresh html text values while clock is running
    if (ClockIsFinished == false) {
        refreshValues();
    }
}

// toggle for pause/resume button
function Pause() {
    if (timer == null) {
        isPaused = !isPaused;
        timer = setInterval(RunClock, 1000);
        document.getElementById('PauseButton').innerText = 'Pause';
    }
    else {
        isPaused = !isPaused;
        clearInterval(timer);
        timer = null;
        document.getElementById('PauseButton').innerText = 'Resume';
    }
}

// refresh html text values
function refreshValues() {
    // Days
    if (Days < 10) {
        document.getElementById("Days").innerText = "0" + Days + " : ";
    } else {
        document.getElementById("Days").innerText = Days + " : ";
    }
    // Hours
    if (Hours < 10) {
        document.getElementById("Hours").innerText = "0" + Hours + " : ";
    } else {
        document.getElementById("Hours").innerText = Hours + " : ";
    }
    // Minutes
    if (Mins < 10) {
        document.getElementById("Mins").innerText = "0" + Mins + " : ";
    } else {
        document.getElementById("Mins").innerText = Mins + " : ";
    }
    // Seconds
    if (Secs < 10) {
        document.getElementById("Secs").innerText = "0" + Secs + " s";
    } else {
        document.getElementById("Secs").innerText = Secs + " s";
    }
}