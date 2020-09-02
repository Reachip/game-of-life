function GOF() {
    this.tr = document.getElementsByTagName("tr");
    this.initBoard = function () {
        const tbody = document.getElementsByTagName("tbody")[0];

        for (let id = 0; id < ((window.innerHeight * 74) / 777); id++) {
            const tr = document.createElement("tr")
            tr.setAttribute("id", id.toString())
            tbody.appendChild(tr)
        }

        const trs = document.getElementsByTagName("tr");

        for (const tr of trs) {
            for (let id = 0; id < ((window.innerWidth * 150) / 1920); id++) {
                const td = document.createElement("td")
                td.setAttribute("id", id.toString());
                td.setAttribute("style", "height:10;width:10;background-color:#dee3e2")
                td.setAttribute("data-iscell", "0")
                tr.appendChild(td);
            }
        }
    }

    this.setRandomCells = function (cells = 400) {
        for (let x = 0; x < cells; x++) {
            const randomLine = Math.floor(Math.random() * ((window.innerHeight * 74) / 777));
            const randomColumn = Math.floor(Math.random() * ((window.innerWidth * 150) / 1920));
            this.addCell(randomLine, randomColumn);
        }
    }

    this.numberOfNeighbors = function (line, column) {
        const neighbors = this.getCells(
            [
                [line, column + 1],
                [line, column - 1],
                [line + 1, column],
                [line - 1, column],
                [line + 1, column + 1],
                [line - 1, column + 1],
                [line + 1, column - 1],
                [line - 1, column - 1]
            ]
        );

        let neighborsCells = 0;

        for (neighbor of neighbors) {
            if (neighbor !== undefined && neighbor !== null)
                if (neighbor.dataset.iscell === "1")
                    neighborsCells += 1
        }

        return neighborsCells
    }

    this.addCell = function (line, column) {
        const cell = this.tr[line].childNodes[column];
        cell.setAttribute("style", "height:10;width:10")
        cell.setAttribute("data-iscell", "1")
    }

    this.getCells = function (particulars) {
        cells = []

        for (particular of particulars) {
            try {
                cells.push(this.tr[particular[0]].childNodes[particular[1]])
            } catch (why) {
                cells.push(null)
            }
        }

        return cells
    }

    this.deleteCell = function (line, column) {
        const cell = this.tr[line].childNodes[column];
        cell.setAttribute("style", "height:10;width:10;background-color:#dee3e2")
    }

    this.run = function () {
        this.tr = document.getElementsByTagName("tr");

        for (let trIndex = 0; trIndex < this.tr.length; trIndex++) {
            const tds = this.tr[trIndex].childNodes;

            for (let tdIndex = 0; tdIndex < tds.length; tdIndex++) {
                const numberOfNeighbors_ = this.numberOfNeighbors(trIndex, tdIndex)
                if (numberOfNeighbors_ > 3)
                    this.deleteCell(trIndex, tdIndex);

                if (numberOfNeighbors_ === 3)
                    this.addCell(trIndex, tdIndex);
            }
        }
    }
}

module.exports = GOF;