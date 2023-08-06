const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function evaluateClicks(event) {
  if (event.target.classList.contains("same")) {
      removeItem(event.target);
  }
}
// TODO: Implement this function!
let clickTurn = 0;
let answer1 = "";
let answer2 = "";
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  clickTurn++;

  if (clickTurn == 1) {
    event.target.style.backgroundColor = `${event.target.className}`;
    event.target.setAttribute("id","answer1");

    // console.log(finalAnswer1);
    console.log("you just clicked", event.target);
    console.log(clickTurn);
    answer1 = `${event.target.className}`;

  } else if (event.target.id == 'answer1'){
      return;
      
  } else  {
      event.target.style.backgroundColor = `${event.target.className}`;
      event.target.setAttribute("id","answer2");
      console.log("you just clicked", event.target);
      console.log(clickTurn);
      answer2 = `${event.target.className}`;

      if (answer1 == answer2) {
        let Guess = setInterval(() => {
          const evalAnswer1 = document.querySelector('#answer1');
          const evalAnswer2 = document.querySelector('#answer2');
          evalAnswer1.remove();
          evalAnswer2.remove();
          clearInterval(Guess);
        }, 1000);
        console.log("same!");

      } else {
        let Guess = setInterval(() => {
          // change the colors back to white and delete the ID
          const evalAnswer1 = document.querySelector('#answer1');
          const evalAnswer2 = document.querySelector('#answer2');
          evalAnswer1.style.backgroundColor = 'white';
          evalAnswer2.style.backgroundColor = 'white';
          evalAnswer1.setAttribute("id", "");
          evalAnswer2.setAttribute("id", "");
          clearInterval(Guess);
        }, 1000);
        console.log(`${answer1} , ${answer2}`);
        answer1 = "";
        answer2 = "";
      }
      clickTurn = 0;
  };
} console.log(clickTurn);

// when the DOM loads
createDivsForColors(shuffledColors);
