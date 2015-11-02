/*

JavaScript for index.html. 

*/

/* Global target and ticks to be accessible. */
var COUNT_TARGET = 0; 		/* Target seconds for both stopwatches. */
var COUNTDOWN_TICK;			/* Current tick countdown stopwatch is at. */
var COUNTUP_TICK;			/* Current tick countup stopwatch is at. */

/* Holds elements that signify the current state of the countdown timer. */
var countdownTimerState = {
	name: "countdown",		/* Name of timer. */
	countdownTarget: 0, 	/* Count down will ALWAYS count down to 0. */
	curSeconds: 0, 			/* The current num of seconds timer is counting down at. */
	ready: 0, 				/* Set to 1 if ready to start timer, else 0. */
	paused: 3 				/* Set to 1 if timer is paused, 0 if running, 3 if disabled. */
};
var countupTimerState = {
	name: "countup", 		/* Name of timer. */
	countupTarget: 0, 		/* What number of seconds the timer counts up to. */
	curSeconds: 0, 			/* The current num of seconds timer is counting up at. */
	ready: 0, 				/* Set to 1 if ready to start timer, else 0. */
	paused: 3 				/* Set to 1 if timer is paused, 0 if running, 3 if disabled. */
};

/* Checks if seconds inputted is a valid positive integer. */
function checkValidInput() {
	return !isNaN(COUNT_TARGET) && (COUNT_TARGET % 1 == 0) && (COUNT_TARGET > 0);
}

/* Enables or disables set timers button depending on input. */
function inputChanged() {
	COUNT_TARGET = document.getElementById("input-seconds").value;
	if (COUNT_TARGET != "" && checkValidInput()) {
		$("#set-timers").addClass("set-timers-color");
		$("#set-timers").removeClass("button-disabled");
	} else {
		$("#set-timers").removeClass("set-timers-color");
		$("#set-timers").addClass("button-disabled");
	}
}

/* Function to change display of the respective timer. */
function updateDisplay(timer, seconds, minutes, hours, days) {
	var secText, minText, hourText, dayText;
	if (seconds > 1 || seconds == 0) { 
		secText = " seconds "; 
	} else { secText = " second " }
	if (minutes > 1 || minutes == 0) { 
		minText = " minutes "; 
	} else { minText = " minute " }
	if (hours > 1 || hours == 0) { 
		hourText = " hours "; 
	} else { hourText = " hour " }
	if (days > 1 || days == 0) { 
		dayText = " days "; 
	} else { dayText = " day " }
	if (timer.name == "countdown") {
		$("#countdown-display").html(days + dayText + hours + hourText + 
			minutes + minText + seconds + secText);
	} else {
		$("#countup-display").html(days + dayText + hours + hourText + 
			minutes + minText + seconds + secText);
	}
}

/* Function to calculate respective timer's day, hours, minutes, seconds. */
function calcDisplay(timer) {
	var seconds = timer.curSeconds % 60;
	var minutes = Math.floor(timer.curSeconds / 60);
	var hours = Math.floor(minutes / 60);
	minutes = minutes % 60;
	var days = Math.floor(hours / 24);
	hours = hours % 24;
	updateDisplay(timer, seconds, minutes, hours, days);
}

/* Updates visual display/controls of countdown timer based on state. */
function updateCountdown() {
	if (countdownTimerState.ready) {
		if (countdownTimerState.paused) {
			$("#countdown-start").removeClass("button-disabled");
			$("#countdown-start").removeClass("pause-button");
			$("#countdown-start").addClass("start-button");
			$("#countdown-start-text").html("Start");
			calcDisplay(countdownTimerState);
		} 
		if (countdownTimerState.paused == 0) {
			$("#countdown-start").removeClass("button-disabled");
			$("#countdown-start").removeClass("start-button");
			$("#countdown-start").addClass("pause-button");
			$("#countdown-start-text").html("Pause");
		}
		$("#countdown-reset").removeClass("button-disabled");
		$("#countdown-reset").addClass("reset-button");
	} else {
		$("#countdown-start").removeClass("start-button");
		$("#countdown-start").removeClass("pause-button");
		$("#countdown-start").addClass("button-disabled");
		$("#countdown-start-text").html("Start");
		$("#countdown-reset").removeClass("reset-button");
		$("#countdown-reset").addClass("button-disabled");
	}
}

/* Updates visual display/controls of countup timer based on state. */
function updateCountup() {
	if (countupTimerState.ready) {
		if (countupTimerState.paused) {
			$("#countup-start").removeClass("button-disabled");
			$("#countup-start").removeClass("pause-button");
			$("#countup-start").addClass("start-button");
			$("#countup-start-text").html("Start");
			calcDisplay(countupTimerState);
		}
		if (countupTimerState.paused == 0) {
			$("#countup-start").removeClass("button-disabled");
			$("#countup-start").removeClass("start-button");
			$("#countup-start").addClass("pause-button");
			$("#countup-start-text").html("Pause");
		}
		$("#countup-reset").removeClass("button-disabled");
		$("#countup-reset").addClass("reset-button");

	} else {
		$("#countup-start").removeClass("start-button");
		$("#countup-start").removeClass("pause-button");
		$("#countup-start").addClass("button-disabled");
		$("#countup-start-text").html("Start");
		$("#countup-reset").removeClass("reset-button");
		$("#countup-reset").addClass("button-disabled");
	}
}

/* Function to set countdown timer to ready state. */
function setUpCountdown() {
	countdownTimerState.curSeconds = COUNT_TARGET;
	countdownTimerState.ready = 1;
	countdownTimerState.paused = 1;
}

/* Function to set countup timer to ready state. */
function setUpCountup() {
	countupTimerState.countupTarget = COUNT_TARGET;
	countupTimerState.curSeconds = 0;
	countupTimerState.ready = 1;
	countupTimerState.paused = 1;
}

/* Sets up both stopwatches into ready state based on inputted seconds. */
function setUp() {
	COUNT_TARGET = document.getElementById("input-seconds").value;
	if (COUNT_TARGET != "" && checkValidInput()) {
		clearInterval(COUNTDOWN_TICK);
		setUpCountdown();
		updateCountdown();
		clearInterval(COUNTUP_TICK);
		setUpCountup();
		updateCountup();
	} else {
		countdownTimerState.ready = 0;
		updateCountdown();
		countupTimerState.ready = 0;
		updateCountup();
	}
}

/* Increments or decrements curSeconds of the respective timer. */
function tick(timer) {
	if (timer.name == "countdown") {
		if (timer.curSeconds == timer.countdownTarget) {
			timer.ready = 0;
			timer.paused = 3;
			clearInterval(COUNTDOWN_TICK);
		} else {
			timer.curSeconds -= 1;
		}
		calcDisplay(countdownTimerState);
		updateCountdown();
	} else {
		if (timer.curSeconds == timer.countupTarget) {
			timer.ready = 0;
			timer.paused = 3;
			timer.countupTarget = 0;
			clearInterval(COUNTUP_TICK);
		} else {
			timer.curSeconds += 1;
		}
		calcDisplay(countupTimerState);
		updateCountup();
	}
}

/* Changes state, and starts/pauses the respective timer. */
function startCount(timer) {
	if (timer.ready) {
		if (timer.paused) {
			timer.paused = 0;
			if (timer.name == "countdown") {
				COUNTDOWN_TICK = setInterval(function() 
					{ tick(countdownTimerState) }, 1000);
			} else {
				COUNTUP_TICK = setInterval(function() 
					{ tick(countupTimerState) }, 1000);
			}
		} else if (timer.paused == 0) {
			timer.paused = 1;
			if (timer.name == "countdown") {
				clearInterval(COUNTDOWN_TICK);
			} else {
				clearInterval(COUNTUP_TICK);
			}
		}
		if (timer.name == "countdown") {
			updateCountdown();
		} else {
			updateCountup();
		}
	}
}

/* Changes state, and resets the respective timer. */
function resetCount(timer) {
	if (timer.ready) {
		timer.paused = 1;
		if (timer.name == "countdown") {
			clearInterval(COUNTDOWN_TICK);
			timer.curSeconds = COUNT_TARGET;
			updateCountdown();
		}
		if (timer.name == "countup") {
			clearInterval(COUNTUP_TICK);
			timer.countupTarget = COUNT_TARGET;
			timer.curSeconds = 0;
			updateCountup();
		}
	}
}

/* Calls handler for countdown start button. */
function startCountdown() {
	startCount(countdownTimerState);
}

/* Calls handler for countdown reset button. */
function resetCountdown() {
	resetCount(countdownTimerState);
}

/* Calls handler for countup start button. */
function startCountup() {
	startCount(countupTimerState);
}

/* Calls handler for countup reset button. */
function resetCountup() {
	resetCount(countupTimerState);
}

/* Event listener that enables/disables set timer button. */
$("#input-seconds").on("keyup keydown change keypress", inputChanged);

/* Event listeners for both stopwatch controls. */
$(".set-timers-container").click(setUp);
$("#countdown-start").click(startCountdown);
$("#countdown-reset").click(resetCountdown);
$("#countup-start").click(startCountup);
$("#countup-reset").click(resetCountup);
