// for some reason, someDumbGlobal is not able to be accessed from the constructor. It is however, able to be accessed from the startButtonFunction



function setupControlPannel(controlPannelSize, boardSize, screenSize) {

    let yOffset = (screenSize - boardSize) / 2

    let backgroundColor = color(255, 204, 0);
    fill(backgroundColor)
    rect(0, yOffset, controlPannelSize, boardSize)


    // Control pannel div
    let controlPannel = createDiv("this is some text")
    controlPannel.id("controlPannel")
    controlPannel.style("height", boardSize + "px")
    controlPannel.style("border", "1px solid black")
    controlPannel.style("width", controlPannelSize + "px")
    controlPannel.position(0, 0 + yOffset)

    // controlPannel.parent("main")


    // Queens Slider
    let queensSlider = createSlider(1, 16, 8, 1)
    queensSlider.id("queensSlider")

    numQueens = queensSlider.value()

    // frameRate Slider
    let frameRateSlider = createSlider(1, 2000, 1000, 100)
    frameRateSlider.id("frameRateSlider")

    // Start button
    let startButton = createButton("Start")
    startButton.id("startButton")
    startButton.mousePressed(startButtonFunction);

    // Restart Button
    let restartButton = createButton("Restart")
    restartButton.id("restartButton")
    restartButton.mousePressed(restartButtonFunction);
    restartButton.attribute("disabled", "") // by default disable the disable the restart button

    // Show Check
    // let showCheckButton = createButton("Show Check")

    let pauseButton = createButton("Pause")
    pauseButton.id("pauseButton")
    pauseButton.mousePressed(pauseButtonFunction)
    pauseButton.attribute("disabled", "")


    // Put everything in the [DOM] div element 
    controlPannel.child(createElement("h3", "Number of Queens"))
    controlPannel.child(queensSlider)
    controlPannel.child(createElement("h3", "Frame Rate (speed)"))
    controlPannel.child(frameRateSlider)

    controlPannel.child(startButton)
    controlPannel.child(restartButton)
    controlPannel.child(pauseButton)

}

function title() {
    let yOffset = (screenSize - boardSize) / 4
    let title = createElement("h1", "NQueens")
    title.position(0, 0 + yOffset)
}

function description() {

    // let body = select("body")
    // console.log(body)

    let description = createDiv()
    description.id("description")

    description.html("<h1> The NQueens Problem </h1> <br> <p> Problem description: <br> Given a N by N board, place N queens such that none of the Queens will want to attack each other.<br>")
    description.html("To find a solution, we use a technique called backtracking. Here is how it works:<br>", true)
    description.html("After pressing start, a blue square will appear in the top left corner, representing a queen.<br>", true)
    description.html("This queen will undergo a series of checks, represented by a green square. More specifically, it will check its diagonals and check the row it is in. Note how we only checks to the left.<br> ", true)
    description.html("If during the check we encounter another queen, move the current queen down to the next row, otherwise, keep it on that row and place anoter queen on the next column (on the top the row) repeating this procedure.<br>", true)
    description.html("If during this procedure we move off the bottom of the board, it means there are no more possible places to move our queen such that we can make a valid solution. Therefore, we need to backtrack.", true)
    description.html("Backtracking in this case means moving back a column to the previous queen and moving it down to the next row, then repeating the same checking proceedure again.<br>", true)
    description.html("There are two things we look out for now: <br>", true)
    description.html("1) If we move off the right side of the board it means we have found a valid solution. <br>", true)
    description.html("2) If we backtrack (move to the left) beyond the first column the algorithm is complete. <br>", true)
    description.html("Note: we only check to the left because we assume that as we are moving to the right while placing queens, there is currently nothing to check to the right.", true)
    description.html("", true)


}

// Note: trying to attach the solve function (the one inside the Solver class) to the start button has breaking effects. 
// Therefore I created a wrapper function to attach to the start button, if I am looking at this later confused.
function startButtonFunction() {

    let queensSliderPointer = select("#controlPannel #queensSlider")
    noLoop() // disable the draw loop

    disable()

    // create a new solver object everytime the button is pressed 
    solverObject = new Solver(queensSliderPointer.value())
    solverObject.solve()
}

function restartButtonFunction() {

    console.log("Reset button pressed")
    console.log("this is my solver object " + solverObject)

    solverObject.end()
    enable()
}

function pauseButtonFunction() {
    let pauseButton = select("#controlPannel #pauseButton")


    // console.log(pauseButton.)
    if (pauseButton.html() == "Pause") {
        pauseButton.html("Resume")
    }
    else { pauseButton.html("Pause") }
    solverObject.togglePause()
}

function disable() {
    let queensSliderPointer = select("#controlPannel #queensSlider")
    let startButtonPointer = select("#controlPannel #startButton")
    let restartButtonPointer = select("#controlPannel #restartButton")
    let pauseButton = select("#controlPannel #pauseButton")

    queensSliderPointer.attribute("disabled", "")    // Disable the 
    startButtonPointer.attribute("disabled", "")
    restartButtonPointer.removeAttribute("disabled")
    pauseButton.removeAttribute("disabled")
}

function enable() {
    let queensSliderPointer = select("#controlPannel #queensSlider")
    let startButtonPointer = select("#controlPannel #startButton")
    let restartButtonPointer = select("#controlPannel #restartButton")
    let pauseButton = select("#controlPannel #pauseButton")

    queensSliderPointer.removeAttribute("disabled")
    startButtonPointer.removeAttribute("disabled")
    loop()

    restartButtonPointer.attribute("disabled", "")
    pauseButton.attribute("disabled", "")

    console.log("enabled triggered")
}
