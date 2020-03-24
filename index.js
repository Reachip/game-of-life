function initBoard() {
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

function setRandomCells(cells = 400) {
    for (let x = 0; x < cells; x++) {
        const randomLine = Math.floor(Math.random() * ((window.innerHeight * 74) / 777));
        const randomColumn = Math.floor(Math.random() * ((window.innerWidth * 150) / 1920));
        addCell(randomLine, randomColumn);
    }
}

function numberOfNeighbors(line, column) {
    const neighbors = [
        getCell(line, column + 1),
        getCell(line, column - 1),
        getCell(line + 1, column),
        getCell(line - 1, column),
        getCell(line + 1, column + 1),
        getCell(line - 1, column + 1),
        getCell(line + 1, column - 1),
        getCell(line - 1, column - 1)
    ];

    let number = 0;

    for (neighbor of neighbors) {
        if (neighbor != null) {
            if (neighbor.dataset.iscell === "1") {
                number += 1;
            }
        }
    }

    return number;
}

function addCell(line, column) {
    const tr = document.getElementsByTagName("tr");
    const cell = tr[line].childNodes[column];
    cell.setAttribute("style", "height:10;width:10")
    cell.setAttribute("data-iscell", "1")
}

function getCell(line, column) {
    const tr = document.getElementsByTagName("tr");

    try {
        const cell = tr[line].childNodes[column]
        return cell
    } catch (why) {
        return null;
    }
}

function deleteCell(line, column) {
    const tr = document.getElementsByTagName("tr");
    const cell = tr[line].childNodes[column];
    cell.setAttribute("style", "height:10;width:10;background-color:#dee3e2")
}

function run() {
    const trs = document.getElementsByTagName("tr");

    for (let trIndex = 0; trIndex < trs.length; trIndex++) {
        const tds = trs[trIndex].childNodes;

        for (let tdIndex = 0; tdIndex < tds.length; tdIndex++) {
            if (numberOfNeighbors(trIndex, tdIndex) > 3) {
                deleteCell(trIndex, tdIndex);
            }

            if (numberOfNeighbors(trIndex, tdIndex) === 3) {
                addCell(trIndex, tdIndex);
            }
        }
    }
}

function main() {
    numberOfInitialCells = Math.round((window.innerHeight + window.innerWidth) * 400 / (1920 + 777));
    initBoard()
    setRandomCells(numberOfInitialCells)
    for (let loop = 0; loop < 900; loop++) {
        setTimeout(() => {
            run();
        }, 1000);
    }
}