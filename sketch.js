function setup() {

    screenSize = min(displayWidth, displayHeight)

    boardSize = .7 * screenSize
    controlPannelSize = .3 * screenSize

    createCanvas(screenSize, screenSize)
    background(220);

    numQueens = 8


    setupControlPannel(controlPannelSize, boardSize, screenSize, 8)

    // setup board
    drawBoard(screenSize, boardSize, controlPannelSize)



}

function draw() {

    // console.log(numQueens)

    let queensSliderPointer = select("#controlPannel #queensSlider")

    let numberOfQueens = queensSliderPointer.value()
    drawBoard(screenSize, boardSize, controlPannelSize, numberOfQueens)
    // console.log(queensSliderPointer.value())


    frameRate(10)


}

function setupControlPannel(controlPannelSize, boardSize, screenSize) {

    let yOffset = (screenSize - boardSize) / 2

    // let backgroundColor = color(255, 204, 0);
    // fill(backgroundColor)
    // rect(0, yOffset, controlPannelSize, boardSize)

    let controlPannel = createDiv("this is some text")
    controlPannel.id("controlPannel")
    controlPannel.style("height", boardSize + "px")
    controlPannel.style("border", "1px solid black")
    controlPannel.style("width", controlPannelSize + "px")
    controlPannel.position(0, 0 + yOffset)

    // controlPannel.parent("main")

    let queensSlider = createSlider(1, 16, 8, 1)
    queensSlider.id("queensSlider")
    // queensSlider.position(controlPannelSize * .25, displayHeight * .25)
    numQueens = queensSlider.value()

    controlPannel.child(createElement("h3", " Number of Queens"))
    controlPannel.child(queensSlider)


    return numQueens

}


function drawBoard(screenSize, boardSize, controlPannelOffset, numberOfQueens = 8) {

    let yOffset = (screenSize - boardSize) / 2

    let black = color(130)
    let white = color(25)

    for (let i = 0; i < numberOfQueens; i++) {
        for (let j = 0; j < numberOfQueens; j++) {
            if ((i + j) % 2 == 0) { fill(black) }
            else { fill(white) }
            square((i * (boardSize / numberOfQueens) + controlPannelOffset), (j * (boardSize / numberOfQueens)) + yOffset, boardSize / numberOfQueens)

            // fill()
        }
    }
}