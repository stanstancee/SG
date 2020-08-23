let btns = document.querySelectorAll(".btn");
let levelTitle = document.querySelector("#level-title");
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

document.querySelector("body").addEventListener("keypress",function() {
  if (!started) {
    levelTitle.textContent ="Level " + level;
    nextSequence();
    started = true;
  }
});
btns.forEach(btn=>{
  btn.addEventListener( "click",function() {

    var userChosenColour = btn.getAttribute("id");
    userClickedPattern.push(userChosenColour);
  
    playSound(userChosenColour);
    animatePress(userChosenColour);
  
    checkAnswer(userClickedPattern.length-1);
  });
})



function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {

      console.log("wrong");

      playSound("wrong");
   let body = document.querySelector("body")
      body.classList.add("game-over");
      setTimeout(function () {
       body.classList.remove("game-over");
      }, 200);

     levelTitle.textContent="Game Over, Press Any Key to Restart";

      //2. Call startOver() if the user gets the sequence wrong.
      startOver();
    }

}

function nextSequence() {

  userClickedPattern = [];
  level++;
  levelTitle.textContent ="Level " + level;

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  document.querySelector("#" + randomChosenColour).classList.add("run");
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  document.querySelector(`#${currentColor}`).classList.add("pressed");
  setTimeout(function () {
    document.querySelector(`#${currentColor}`).classList.remove("pressed");
  }, 100);
}

//1. Create a new function called startOver().
function startOver() {

  //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
