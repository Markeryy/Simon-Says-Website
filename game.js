
// function for next sequence
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
    var randomChosenColor = buttonColors[randomNumber];
    
    // play sound
    console.log("sounds/" + randomChosenColor + ".mp3");
    playSound("sounds/" + randomChosenColor + ".mp3")

    // add to game pattern
    gamePattern.push(randomChosenColor);

    // add to UI
    var randomChosenButton = $("#" + randomChosenColor);
    randomChosenButton.fadeOut(100).fadeIn(100);
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

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];


// show sequence
nextSequence();

// detect user click
$(".btn").click(function () {
    var userChosenButton = $(this);
    var userChosenColor = userChosenButton.attr("id");
    
    playSound("sounds/" + userChosenColor + ".mp3")
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenButton);
});