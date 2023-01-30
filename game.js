
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
    
    for (let i = 0; i < noOfSequence; i++) {
        setTimeout(function() {
            generateGameSequence();
        }, 1000 * i);
    }

    $("h1").text("level " + level);
    level += 1;
}

// function to play button sound
function playSound(src) {
    var buttonAudio = new Audio(src);
    buttonAudio.play();
}

// animate button press given a button
function animatePress(currentButton) {
    currentButton.addClass("pressed");

    setTimeout(function() {
        currentButton.removeClass("pressed")
    }, 100);
}

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

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;
var started = false;

// detect user click
$(".btn").click(function () {
    var userChosenButton = $(this);
    var userChosenColor = userChosenButton.attr("id");
    
    playSound("sounds/" + userChosenColor + ".mp3")
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenButton);

    console.log(userClickedPattern);
    console.log(gamePattern);

    if (userClickedPattern.length > gamePattern.length) {
        //GAMEOVER
        $("h1").text("Gameover!");
    }

    if (userClickedPattern.length === gamePattern.length && !arrayEquals(userClickedPattern, gamePattern)) {
        //GAMEOVER
        $("h1").text("Gameover!");
    }

    if (arrayEquals(userClickedPattern, gamePattern)) {
        userClickedPattern = []
        gamePattern = []
        setTimeout(()=>{nextSequence(level)}, 1000);
    }
});

// detect user keypress
$(document).keypress(function (e) { 
    // show sequence
    if (started === false) {
        setTimeout(function() {
            nextSequence(level);
            started = true;
        }, 300);
    }
});
