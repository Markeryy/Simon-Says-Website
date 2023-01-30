
// function to generate random colors
function generateGameSequence() {
    var randomNumber = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
    var randomChosenColor = buttonColors[randomNumber];

    // play sound
    console.log("sounds/" + randomChosenColor + ".mp3");
    playSound("sounds/" + randomChosenColor + ".mp3")

    // show to UI
    var randomChosenButton = $("#" + randomChosenColor);
    randomChosenButton.fadeOut(100).fadeIn(100);

    // add to game pattern
    gamePattern.push(randomChosenColor);
}

// function for next sequence
function nextSequence(noOfSequence) {
    
    for (var i = 0; i < noOfSequence; i++) {
        setTimeout(function() {
            generateGameSequence();
        }, 700 * i);
    }

    $("h1").text("level " + level);
    level += 1;
}

// function to play button sound
function playSound(src) {
    var buttonAudio = new Audio(src);
    buttonAudio.play();
}

// function to play game over sound
function playGameoverSound() {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
}

// animate button press given a button
function animatePress(currentButton) {
    currentButton.addClass("pressed");

    setTimeout(function() {
        currentButton.removeClass("pressed")
    }, 100);
}

// check if array elements are equal
function arrayEquals(a, b) {
    if (a.length !== b.length) {
        return false;
    }

    for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }

    return true;
}

// reset values
function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    level = 1;
    sequenceChecker = 0;
    started = false;
}


var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;
var sequenceChecker = 0;
var started = false;

// detect user click
$(".btn").click(function () {
    var userChosenButton = $(this);
    var userChosenColor = userChosenButton.attr("id");
    
    
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenButton);

    console.log(userClickedPattern);
    console.log(gamePattern);
    console.log(sequenceChecker);

    // if user clicked a wrong color
    if (userClickedPattern[sequenceChecker] !== gamePattern[sequenceChecker]) {
        $("h1").text("Gameover! Press A Key to Restart");
        playGameoverSound();

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
            startOver();
        }, 200);

        
    }

    sequenceChecker += 1;
    playSound("sounds/" + userChosenColor + ".mp3")  // play sound if correct

    // reset checkers
    if (arrayEquals(userClickedPattern, gamePattern)) {
        userClickedPattern = [];
        gamePattern = [];
        sequenceChecker = 0;
        setTimeout(()=>{nextSequence(level)}, 1000);
    }
});

// detect user keypress
$(document).keypress(function (e) { 
    // show sequence
    console.log(started);
    if (!started) {
        setTimeout(function() {
            nextSequence(level);
            started = true;
        }, 300);
    }
});
