var buttonColours = ["green", "red", "yellow", "blue"];
var userClickedPattern = [];
var gamePattern = [];
var gameLevel = 0;

// Call Function On Game Start
$(document).keypress(function() {
  if (gameLevel === 0) {
    $("h1").text("LEVEL " + gameLevel);
    $("h3").css("visibility", "hidden");
    setTimeout(function() {
      nextSequence();
    }, 450);
  }
});

function nextSequence() {

  // Generate Game Pattern
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);

  // Button Animation
  $("#" + randomChosenColor).fadeOut(50).fadeIn(200);
  playSound("sounds/" + randomChosenColor + ".mp3");

  gameLevel++;

}

// Add Buttons Event Listener
$("button").click(function() {
  if (gameLevel !== 0) {
    // User's Selection
    var userChosenColor = this.getAttribute("id");
    userClickedPattern.push(userChosenColor);

    // Button Animation
    playSound("sounds/" + userChosenColor + ".mp3");
    animatePress(userChosenColor);

    // Check Pattern
    checkAnswer(userClickedPattern.length - 1)
  }
})


// Button Animation
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Button Sound
function playSound(audioSRC) {
  new Audio(audioSRC).play();
}

// Check Answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (currentLevel === (gamePattern.length - 1)) {
      $("h1").text("SUCCESS!");
      setTimeout(function() {
        $("h1").text("LEVEL " + gameLevel);
      }, 700);
      setTimeout(function() {
        userClickedPattern = [];
        nextSequence();
      }, 1200);
    }
  } else {
    new Audio("sounds/wrong.mp3").play();
    $("body").addClass("game-over");
    $("h1").text("GAME OVER!");
    $("h3").text("PRESS ANY KEY TO RESTART!");
    $("h3").css("visibility", "visible");
    setTimeout(function() {
      $("body").removeClass("game-over");
      startOver();
    }, 200);
  }
}

// Start Over
function startOver() {
  userClickedPattern = [];
  gamePattern = [];
  gameLevel = 0;
}
