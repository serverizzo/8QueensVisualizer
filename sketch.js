function setup() {

    let screenSize = min(displayWidth, displayHeight)

    let boardSize = .7 * screenSize
    let controlPannelSize = .3 * screenSize

    createCanvas(screenSize, screenSize)
    background(220);

    numQueens = 8


    setupControlPannel(controlPannelSize, boardSize, screenSize)

    // setup board
    drawBoard(screenSize, boardSize, controlPannelSize)



}

function draw() {

    // console.log(numQueens)

    let queensSliderPointer = select("#controlPannel #queensSlider")
    console.log(queensSliderPointer.value())


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

    controlPannel.child(queensSlider)


    return numQueens

}


function drawBoard(screenSize, boardSize, controlPannelOffset) {

    let yOffset = (screenSize - boardSize) / 2

    let black = color(25)
    let white = color(130)

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ((i + j) % 2 == 0) { fill(black) }
            else { fill(white) }
            square((i * (boardSize / 8) + controlPannelOffset), (j * (boardSize / 8)) + yOffset, boardSize / 8)

            // fill()
        }
    }
}