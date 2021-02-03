class Solver {

    constructor(numberOfQueens) {
        this.numberOfQueens = numberOfQueens;

        this.board = [];
        for (let i = 0; i < this.numberOfQueens; i++) {
            this.board.push(0)
        }

        // colors
        this.checkColor = color(80, 224, 47)
        this.queensColor = color(20, 20, 117)

        // drawing related
        this.squareSize = (boardSize / this.numberOfQueens)
        this.yOffset = (screenSize - boardSize) / 2
        this.xOffset = controlPannelSize
        this.frameRateSlider = select("#controlPannel #frameRateSlider")

        this.terminate = false
        this.showCheck = true;

        // if we make this a global we can re-call the solve function and the loop will pick up from where it left off
        this.curr = 0
        this.pause = false
    }


    async solve() {
        while (this.curr > -1 && !this.terminate) {

            if (this.pause) {
                break
            }

            await drawBoard2(this.board)

            if (this.board[this.curr] >= this.numberOfQueens) {
                await this.drawQueens(this.curr - 1)
            }
            else { await this.drawQueens(this.curr) }
            await sleep(this.frameRateSlider.value())


            // if we found a solution
            if (this.curr >= this.numberOfQueens) {
                console.log(this.board)
                //  maybe make a pause or something?
                this.curr -= 1
                this.board[this.curr] += 1
                this.togglePause()
                break
            }

            if (this.board[this.curr] >= this.numberOfQueens) {
                // erase queen from space

                // reset queen reprsentation (do not redraw queen)
                this.board[this.curr] = 0
                // backtrack
                this.curr -= 1
                this.board[this.curr] += 1
            }

            else if (await this.isOkay(this.curr)) {
                this.curr += 1
            }
            else {
                this.board[this.curr] += 1
            }
        }

    }

    togglePause() {
        this.pause = !this.pause
        this.solve()
    }

    end() {
        console.log("End Triggered")
        this.terminate = !this.terminate
        console.log(this.terminate)

    }

    toggleShowCheck() {

    }

    async drawQueens(currentQueen) {
        fill(this.queensColor)
        for (let i = 0; i < currentQueen + 1; i++) {
            square(i * this.squareSize + this.xOffset, this.board[i] * this.squareSize + this.yOffset, this.squareSize)
        }
    }

    async isOkay(currentQueen) {
        if (await this.checkDiagUp(currentQueen) && await this.checkLeft(currentQueen) && await this.checkDiagDown(currentQueen)) {
            return true
        }
        else { return false }
    }

    async checkDiagDown(currentQueen) {
        for (let i = 1; currentQueen - i > -1 && this.board[currentQueen] + i < this.numberOfQueens; i++) {

            if (this.showCheck) {
                fill(this.checkColor)
                square((currentQueen - i) * this.squareSize + this.xOffset, (this.board[currentQueen] + i) * this.squareSize + this.yOffset, this.squareSize)
                console.log("hello from checkdiagDown")

                await sleep(this.frameRateSlider.value())
                await drawBoard2(this.board)
                await this.drawQueens(currentQueen)
            }

            if (this.board[currentQueen] + i == this.board[currentQueen - i]) {
                return false
            }
        }
        return true
    }

    async checkLeft(currentQueen) {

        for (let currentCheck = currentQueen - 1; currentCheck > -1; currentCheck--) {

            if (this.showCheck) {
                fill(this.checkColor)
                square((currentCheck * this.squareSize) + this.xOffset, (this.board[currentQueen] * this.squareSize) + this.yOffset, this.squareSize)
                console.log("hello from checkleft")

                await sleep(this.frameRateSlider.value())
                await drawBoard2(this.board)
                await this.drawQueens(currentQueen)
            }

            if (this.board[currentQueen] == this.board[currentCheck]) {
                return false
            }

        }
        return true
    }

    async checkDiagUp(currentQueen) {

        for (let i = 1; currentQueen - i > -1 && this.board[currentQueen] - i > -1; i++) {

            if (this.showCheck) {
                fill(this.checkColor)
                square((currentQueen - i) * (this.squareSize) + this.xOffset, ((this.board[currentQueen] - i) * this.squareSize) + this.yOffset, this.squareSize)

                await sleep(this.frameRateSlider.value())
                await drawBoard2(this.board)
                await this.drawQueens(currentQueen)
            }

            if (this.board[currentQueen] - i == this.board[currentQueen - i]) {
                return false
            }
        }
        return true
    }

}