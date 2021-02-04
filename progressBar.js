class ProgressBar {

    constructor(numQueens) {

        this.xpos = 20
        this.ypos = 500

        this.yOffsetBar = 30

        this.containerWidth = (controlPannelSize - 50)
        this.containerHeight = 100

        this.updateColor = 0
        this.numberOfQueens = numQueens

        let container = createDiv("<h3>Progress bar:</h3>")
        container.style("border", "1px solid black")
        container.style("width", this.containerWidth + "px")
        container.style("height", this.containerHeight + "px")
        container.position(this.xpos, this.ypos)

        this.totalNumberSolutions = Math.pow(numQueens, numQueens)
        this.solutionsEliminated = 0

        rect(this.xpos, this.ypos + this.yOffsetBar, this.containerWidth, 20, 20);
    }


    async updateProgressBar(board) {

        let current = 0
        for (let i = 0; i < board.length; i++) {
            current += board[i] * Math.pow(this.numberOfQueens, this.numberOfQueens - (i + 1))
        }
        // this.solutionsEliminated = 

        // this.solutionsEliminated += Math.pow(this.numberOfQueens, this.numberOfQueens - (currentColumn + 1))

        fill(this.updateColor)
        let currentWidth = this.containerWidth * (current / this.totalNumberSolutions)
        rect(this.xpos, this.ypos + this.yOffsetBar, currentWidth, 20, 20);

    }

}