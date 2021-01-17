function setup() {

    let screenSize = min(displayWidth, displayHeight)

    let boardSize = .7 * screenSize
    let controlPannelSize = .3 * screenSize

    createCanvas(screenSize, screenSize)


    background(220);


    setupControlPannel(controlPannelSize)

    // setup board
    drawBoard(screenSize, boardSize, controlPannelSize)



}

function draw() {


}

function setupControlPannel(controlPannelSize) {

    let backgroundColor = color(255, 204, 0);
    fill(backgroundColor)
    rect(0, 0, controlPannelSize, displayHeight)

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