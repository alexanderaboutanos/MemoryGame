const gameContainer = document.getElementById("game");
const body = document.querySelector("body")

//A: this const allows me to quickly check what is inside the div cardContainer
const masterDiv = document.getElementById("game")

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
// it is based on an algorithm called Fisher Yates if you want to research more
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
//A: it adds a few extra divs inside the main containing div
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const cardContainer = document.createElement("div");

    // give it a class attribute for the value we are looping over
    cardContainer.classList.add(color);

    // A: give it another class attribute to designate it as container
    cardContainer.classList.add("cardContainer")

    //A: create a new div to placed inside of cardContainer
    const flipper = document.createElement("div");

    //A: give it 2 class attributes. One to indicate it is a flipper, the other to indicate that it has not reached its final 'complete' status
    flipper.classList.add("flipper")
    flipper.classList.add("incomplete")

    //A: append the flipper div inside the cardContainer
    cardContainer.append(flipper)

    // A: create two new divs (to be placed inside of flipper)
    const frontDiv = document.createElement("div");
    const backDiv = document.createElement("div")

    //A: give class attributes to both new divs
    frontDiv.classList.add("front-side");
    backDiv.classList.add("back-side");

    //A: add the text "front-side" on the front-side of each card
    frontDiv.append("front-side")

    //A: add the card's color as text on the back-side
    backDiv.append(`${color}`)

    //A: update the backDiv's background color
    backDiv.style.backgroundColor = `${color}`

    // A: append both divs to the flipper
    flipper.append(frontDiv);
    flipper.append(backDiv);

    // A: modify the z-index of the divs. this didn't seem to help anything
    cardContainer.style.zIndex = "3"
    flipper.style.zIndex = "2"
    frontDiv.style.zIndex = "1"
    backDiv.style.zIndex = "1"

    // call a function handleCardClick when a div is clicked on
    cardContainer.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(cardContainer);
  }
}

// This function handles the Card Click
function handleCardClick(event) {

    // retrieve the # of 'incomplete' cards that have already been flipped over
    let numIncFlippedCards = getNumOfIncFlippedCards();
        
    // if you've not flipped over any 'incomplete' cards before this click...
    if (numIncFlippedCards === 0){

        // add the 'flipped' css class to this card
        event.target.parentElement.classList.add("flipped");
    }

    // if you've flipped over 1 'incomplete' card before this click...
    else if (numIncFlippedCards === 1){

        // check to make sure you didn't hit the cardContainer as it was turning, in which case you do nothing...
        if (event.target.parentElement.classList[0] != "flipper"){

            // do nothing
        }

        // if you rightly selected the front side of the card.. continue along...
        else {

            // add the 'flipped' css class to this card
            event.target.parentElement.classList.add("flipped");

            // now there are 2 IncFlippedCards. Check to see if they have the same color...
            let colorcheck = areColorsSame()

            // if cards have the same color...
            if (colorcheck === true) {
            
                // remove the class name 'incomplete' and add the class name 'completed'
                replaceIncWithComp()
            }

            //if cards are different... 
            else {

                // add 1 attempt to the counter
                addAttempt();
                console.log(numAttempts)

                // flip the cards back over
                setTimeout(flippedIncCards2frontside, 1000)
            }
        }
    }

    // if you've already flipped over 2 'incomplete' cards but decided to keep mashing other cards anyways... 
    else {
    
            // do nothing

    }

}

// the following function returns the # of 'incomplete' cards that are 'flipped' //
function getNumOfIncFlippedCards(){
    let arrayOfIncFlippedCards = document.getElementsByClassName('flipped incomplete')
    let numOfIncFlippedCards = arrayOfIncFlippedCards.length
    return numOfIncFlippedCards
}

// the following function returns all the flipped and incomplete cards back to their front side by removing their class
function flippedIncCards2frontside(){  
    let arrayOfIncFlippedCards = document.getElementsByClassName('flipped incomplete');
    for (let i = 0; i < 2; i++){
        arrayOfIncFlippedCards[0].classList.remove('flipped')
    }
}

// the following function determines if the colors of the two 'flipped' and 'incomplete' cards are the same
function areColorsSame(){
    let arrayOfIncFlippedCards = document.getElementsByClassName('flipped incomplete');
    let color1stcard = arrayOfIncFlippedCards[0].parentElement.classList[0];
    let color2ndcard = arrayOfIncFlippedCards[1].parentElement.classList[0];

    if (color1stcard === color2ndcard){
        return(true)
    }
    else {
        return(false)
    }
}

// the following function takes the two recently flipped matching cards, removes the class name 'incomplete' and adds the class name 'completed'
function replaceIncWithComp(){
    for (let i = 0; i < 2; i++){
        let arrayOfIncFlippedCards = document.getElementsByClassName('flipped incomplete');
        arrayOfIncFlippedCards[0].classList.add('complete')
        arrayOfIncFlippedCards[0].classList.remove('incomplete')
    }
}


//add an EventListener to the Enter Button
enterButton.addEventListener("click", enterPage)

//this function takes the disappear class from the main page and adds it to the splashPage
function enterPage(){
    const mainPage = document.getElementById("mainPage");
    mainPage.classList.remove("disappear")
    const splashPage = document.getElementById("splashPage");
    splashPage.classList.add("disappear");
    splashPage.removeAttribute("id");

}

//add Event Listener to the 'Play Again' button
const playAgainButton = document.getElementById("restartGameButton")
playAgainButton.addEventListener("click", restartGame)

// this function restarts the game
function restartGame(){
    
    // link to refresh the page
    location.reload();
}

// this creates a variable and attaches it to the h2
let numAttempts = 0;
let theTopH3 = document.getElementById("numOfAttempts");

// the following const and function counts the number of attempts
function addAttempt(){
    numAttempts += 1;
    let attemptDiv = document.getElementById("numAttempts");
    attemptDiv.innerText = numAttempts;
}

// when the DOM loads
createDivsForColors(shuffledColors);


