'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
let currentScore;
let activePLayer;
let playing;
let scores;
const init = function () {
  currentScore = 0;
  activePLayer = 0;
  playing = true;
  scores = [0, 0];
  diceEl.classList.add('hidden');
  currentScore = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePLayer}`).textContent = 0;
  activePLayer = activePLayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//rollong dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.generating a random number
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3.check for number 1,then swittch to next player
    if (dice !== 1) {
      //add dice value to the currecnt score
      currentScore += dice;
      document.getElementById(`current--${activePLayer}`).textContent =
        currentScore;
    } else {
      //switch to other player
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    //1.
    scores[activePLayer] += currentScore;
    document.getElementById(`score--${activePLayer}`).textContent =
      scores[activePLayer];
    //2.
    if (scores[activePLayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePLayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePLayer}`)
        .classList.remove('player--active');
    } else {
      //3.
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
