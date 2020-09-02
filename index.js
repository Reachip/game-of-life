function main() {
    const numberOfInitialCells = Math.round((window.innerHeight + window.innerWidth) * 400 / (1920 + 777));
    const game = new GOF();

    game.initBoard()
    game.setRandomCells(numberOfInitialCells)

    for (let loop = 0; loop < 900; loop++) {
        setTimeout(() => {
            game.run();
        }, 200);
    }
}