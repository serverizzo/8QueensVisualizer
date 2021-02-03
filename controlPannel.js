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
    pauseButton.attribute("disables", "")


    // Put everything in the [DOM] div element 
    controlPannel.child(createElement("h3", "Number of Queens"))
    controlPannel.child(queensSlider)
    controlPannel.child(createElement("h3", "Frame Rate (speed)"))
    controlPannel.child(frameRateSlider)

    controlPannel.child(startButton)
    controlPannel.child(restartButton)
    controlPannel.child(pauseButton)

}

function setupExtras() {
    let yOffset = (screenSize - boardSize) / 4
    let title = createElement("h1", "NQueens")
    title.position(0, 0 + yOffset)
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
