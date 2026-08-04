let box = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let win = document.getElementById("winner");
let start = document.getElementById("start");

let O = true;

const winPatt = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

box.forEach((b) =>{
    b.addEventListener("click", () => {
        if (O) {
            b.textContent = "O";
            O = false;
        } else {
            b.textContent = "X";
            O = true;
        }
        b.disabled = true;
        checkwin();
    });
});

const disableBox = () => {
    box.forEach((b) => {
        b.disabled = true;
    });
};
let showWinner = (winner) => {
    win.textContent = `Player ${winner} wins!`;
    win.classList.add("show-winner");
    disableBox();
};

let draw = () => {
    win.textContent = `It's a draw!`;
    win.classList.add("show-winner");
    disableBox();
};

let checkwin = () => {
    for (let i = 0; i < winPatt.length; i++) {
        let [a, b, c] = winPatt[i]; // Destructure each pattern (e.g. [0,1,2])
        if (box[a].textContent  // Cell isn't empty
            && box[a].textContent === box[b].textContent    // All three match
            && box[a].textContent === box[c].textContent) {
            showWinner(box[a].textContent);
            return;
        }
    }
    let allFilled = [...box].every(b => b.textContent !== ""); // returns true only if every single box has some text & If all 9 boxes are filled and nobody won → it's a draw
    if (allFilled) {
        draw();
    }
};


reset.addEventListener("click", () => {
    box.forEach((b) => {
        b.textContent = "";
        b.disabled = false;
    });
    O = true;
    win.textContent = "";
    document.body.style.overflow = "hidden"; // lock scroll
    win.classList.remove("show-winner");
    window.scrollTo({ top: 0, behavior: "smooth" });
});

start.addEventListener("click", () => {
    document.body.style.overflow = "hidden"; // lock scroll
    document.getElementById("game").scrollIntoView({ behavior: "smooth" });
});