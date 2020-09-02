const app = require("../app");
const gof = new app();

window.innerHeight = 392
window.innerWidth = 1366

test("should init board", () => {
    document.body.innerHTML = `
        <table>
            <tbody></tbody>
        </table>
    `
    gof.initBoard();

    const tds = document.getElementsByTagName("td")

    for (const element of tds) {
        expect(element.style.cssText).toBe("background-color: rgb(222, 227, 226);")
        expect(element.dataset.iscell).toBe("0")
    }

    expect(tds.length).toBe(4066);
    expect(document.getElementsByTagName("tr").length).toBe(38);
})

test("should add cell", () => {
    document.body.innerHTML = `
        <table>
            <tbody>
                <tr id="0">
                    <td id="0" style="height:10;width:10;background-color:#dee3e2" data-iscell="0"></td>
                </tr>
            </tbody>
        </table>
    `

    gof.addCell(0, 1)
    const cell = document.getElementsByTagName("td")[0]

    expect(cell.style.cssText).toBe("")
    expect(cell.dataset.iscell).toBe("1")
})

test("should delete cell", () => {
    document.body.innerHTML = `
        <table>
            <tbody>
                <tr id="0">
                    <td id="0" style="height:10;width:10;" data-iscell="1"></td>
                </tr>
            </tbody>
        </table>
    `

    gof.deleteCell(0, 1)
    const cell = document.getElementsByTagName("td")[0]
    expect(cell.style.cssText).toBe("background-color: rgb(222, 227, 226);")
})

