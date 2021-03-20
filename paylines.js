const configuration = [
  [1, 1, 1, 1, 1, 1],
  [2, 0, 0, 0, 0, 0],
  [3, 2, 2, 2, 2, 2],
  [4, 0, 1, 2, 1, 0],
  [5, 2, 1, 0, 1, 2],
  [6, 1, 0, 1, 0, 1],
  [7, 1, 2, 1, 2, 1],
  [8, 0, 1, 0, 1, 0],
  [9, 2, 1, 2, 1, 2],
  [10, 1, 0, 0, 0, 1],
  [11, 1, 2, 2, 2, 1],
  [12, 2, 2, 1, 2, 2],
  [13, 0, 0, 1, 0, 0],
  [14, 2, 1, 1, 1, 2],
  [15, 0, 1, 1, 1, 0],
  [16, 0, 2, 0, 2, 0],
  [17, 2, 0, 2, 0, 2],
  [18, 1, 1, 0, 1, 1],
  [19, 1, 1, 2, 1, 1],
  [20, 2, 2, 0, 2, 2],
  [21, 0, 0, 2, 0, 0],
  [22, 0, 0, 1, 2, 2],
  [23, 2, 2, 1, 0, 0],
  [24, 1, 0, 2, 0, 1],
  [25, 1, 2, 0, 2, 1],
];

function Paylines(params = { parentElementSelector, configuration }) {
  this.parentElement = document.querySelector(params.parentElementSelector);
  this.lines = params.configuration;
  this.defineRowsAmount();
  this.reelsAmount = this.lines[0].length - 1;

  this.createPaylines();
}

Paylines.prototype = {
  defineRowsAmount() {
    this.rowsAmount = this.lines.reduce((a, x) => {
      const n = Math.max(...x.slice(1));
      return n > a ? n : a;
    }, 0);
    this.rowsAmount++;
  },

  createPaylines() {
    for (let i = 0; i < this.lines.length; i++) {
      this.createPaylineItem(this.lines[i]);
    }
  },

  createPaylineItem(paylineData) {
    const paylineElem = document.createElement("DIV");
    paylineElem.classList.add("payline");
    paylineElem.classList.add("payline" + paylineData[0]);

    for (let i = 0; i < this.reelsAmount; i++) {
      paylineElem.appendChild(this.createReel(paylineData, i));
    }
    this.parentElement.appendChild(paylineElem);
  },

  createReel(paylineData, reelNumber) {
    const reel = document.createElement("DIV");
    reel.classList.add("reel");

    for (let j = 0; j < this.rowsAmount; j++) {
      const icon = document.createElement("DIV");
      icon.classList.add("icon");
      j === paylineData.slice(1)[reelNumber] && icon.classList.add("win");
      reel.appendChild(icon);
    }

    return reel;
  },
};

const paylines = new Paylines({
  parentElementSelector: ".paylines-wrapper",
  configuration,
});
