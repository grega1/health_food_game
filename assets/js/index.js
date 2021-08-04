class Game {
  constructor(_name = 'Player1', _score = 0, _currentLevel = 1, _playMusic = true, _soundEffects = true,) {
      this.name = _name;
      this.score = _score;
      this.currentLevel = _currentLevel;
      this.playMusic = _playMusic;
      this.soundEffects = _soundEffects;
      
  }

  setName(_name) {
      this.name = _name;
  }

  getName() {
      return this.name;
  }

  setScore(_score = 0) {
      this.score = _score;
  }
  setCurrentLevel(_currentLevel = 1) {
      this.currentLevel = _currentLevel;
  }
  getCurrentLevel() {
      return this.currentLevel;
  }
  getScore() {
      return this.score;
  }
  getIntervalByLevel() {
    this.currentLevel = 3000
  }
  getPointsByLevel() {
    this.currentLevel = 10;
  }


  //actionPoint = Pontuação recebida por destruir o alvo
  increaseScore(_actionPoint = 5) {
      this.score = this.score + parseInt(_actionPoint);
  }

  drawSlots(_firstSlot, _lastSlot) {
      return Math.round(Math.random() * (_lastSlot - _firstSlot)) + _firstSlot;

  }
  setPlayMusic(_playMusic) {
      this.playMusic = _playMusic;
  }
  setSoundEffects(_soundEffects) {
      this.soundEffects = _soundEffects;
  }
  getPlayMusic() {
      return this.playMusic;
  }
  getSoundEffects() {
          return this.soundEffects;
      }
      //criar função fora para mutar e executar
     

  rankingData() {

      return { name: this.name, score: this.score };

  }
};

//Timer
class Timer {
  constructor(_time, _currentTime, _timerInterval = 100, _callbackTimeout, _callbackTimeInterval, _internalTimer, _internalTimeout) {
      this.time = _time;
      this.currentTime = _currentTime;
      this.timerInterval = _timerInterval;
      this.callbackTimeout = _callbackTimeout;
      this.callbackTimeInterval = _callbackTimeInterval;
      this.internalTimer = _internalTimer;
      this.internalTimeout = _internalTimeout;
  }

  setTimer(_time) {
      this.time = _time;
  }

  setTimerInterval(_timerInterval = 100) {
      this.timerInterval = _timerInterval;
  }

  setCallbackTimeout(_callbackTimeout) {
      this.callbackTimeout = _callbackTimeout;
  }

  setCallbackTimeInterval(_callbackTimeInterval) {
      this.callbackTimeInterval = _callbackTimeInterval;
  }

  getCurrentTime() {
      return this.currentTime;

  }

  startTimer() {
      this.currentTime = this.time;
      this.internalTimeout = setTimeout(this.callbackTimeout, this.currentTime);
      this.internalTimer = setInterval(() => {
          this.currentTime -= this.timerInterval;
          this.callbackTimeInterval();
          if (this.currentTime <= 0) {
              clearInterval(this.internalTimer)
          }
      }, this.timerInterval);
      this.currentTimeString;
  }

  stopTimer() {
      clearInterval(this.internalTimer);
      clearTimeout(this.internalTimeout);

  }

  get resetTimer() {
      clearInterval(this.internalTimer);
      clearTimeout(this.internalTimeout);
      this.time = 0;
      this.timerInterval = 100;
      this.currentTime = 0;
  }

  currentTimeString() {
      let milliseconds = Math.floor((this.currentTime % 1000) / 10);
      let seconds = Math.floor((this.currentTime / 1000) % 60);
      let minutes = Math.floor((this.currentTime / (1000 * 60)) % 60);
      let hours = Math.floor((this.currentTime / (1000 * 60 * 60)));

      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;
      milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

      return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }
}

// Instances
const newGame = new Game();
const levelTimer = new Timer();

//Audios
const btnSelectSound = "../audio/btn-select.mp3";
const healthFoodSound = "../audio/mask-up.mp3";
const levelUpSound = "../audio/level-up.mp3";
const gameStartSound = "../audio/game-start.ogg";
const gameWinSound = "../audio/game-win.mp3";
const vaxxBreakingSound = "../audio/vaxx-breaking.mp3";
const backgroundSound = "../audio/background-sound.mp3";
const mainMusic = new Audio(backgroundSound);
mainMusic.volume = 0.1;
mainMusic.play();
mainMusic.loop = true;

function playAudio(sound) {
    const audioToPlay = new Audio(sound);
    audioToPlay.volume = 0.1;
    audioToPlay.play();
}

function gameStart() {
  let userName = newGame.getName();
  newGame.setScore();
  newGame.setLifeStatus();
  let userLifes = newGame.getLifeStatus();
  let modalInstructions = document.getElementById("modal-instructions");
  modalInstructions.parentNode.removeChild(modalInstructions);
  startLevel();
}
function showFruits() {
  let drawRange = newGame.drawSlots(1, 9);
  let captureHealthFoods = document.getElementById(`health-food${drawRange}`);
  let captureHole = document.getElementById(`hole${drawRange}`);


  captureHealthFoods.classList.add("visible");
  captureHealthFoods.classList.remove("invisible");
  captureHole.classList.add("invisible");
  captureHole.classList.remove("visible");
  let time = document.getElementById("time-input");
  time.value = levelTimer.currentTimeString();


  setTimeout(() => {
      let decreaseLife = document.getElementById(`masks`);
      let remainLives = '';

      if (captureHealthFoods.classList.contains("visible") && decreaseLife.hasChildNodes()) {
          newGame.setLifeStatus((newGame.getLifeStatus() - 1));
          for (let i = 1; i <= newGame.getLifeStatus(); i++) {
              remainLives += `<img src="img/icon-heart.png" id="mask${i}" />`
          }
          decreaseLife.innerHTML = remainLives;
      }

      captureHealthFoods.classList.add("invisible");
      captureHealthFoods.classList.remove("visible");
      captureHole.classList.add("visible");
      captureHole.classList.remove("invisible");

      if (newGame.getLifeStatus() <= 0) {
          levelTimer.stopTimer();
          showGameLost();
      }
  }, (newGame.getIntervalByLevel() / 1.5))

}
function startLevel(level = newGame.getCurrentLevel()) {
  console.table(newGame);
  newGame.setCurrentLevel(level);
  levelTimer.setTimer(60000);
  levelTimer.setTimerInterval(newGame.getIntervalByLevel());
  levelTimer.setCallbackTimeout(finishLevel);
  levelTimer.setCallbackTimeInterval(showVirus);
  levelTimer.startTimer();
}
function finishLevel() {
  levelTimer.stopTimer();
  let time = document.getElementById("time-input");
  time.value = '00:00:00.000'
  for (let i = 1; i <= 9; i++) {
      let clearVirus = document.getElementById(`virus${[i]}`);
      let clearHole = document.getElementById(`hole${[i]}`);
      clearVirus.classList.add("invisible");
      clearVirus.classList.remove("visible");
      clearHole.classList.add("visible");
      clearHole.classList.remove("invisible");
  }
  nextLevel();
}
function hitVirus(id, level = newGame.getCurrentLevel()) {
  newGame.getScore();
  let captureScore = document.getElementById("score");
  let virusValue = newGame.getPointsByLevel(level);
  let captureHealthFoods = document.getElementById(`virus${id}`);
  let captureHole = document.getElementById(`hole${id}`);

  newGame.increaseScore(virusValue);

  captureHealthFoods.classList.remove("visible")
  captureHealthFoods.classList.add("invisible");
  captureHole.classList.add("visible");
  captureHole.classList.remove("invisible");
  playAudio(sprayClicksSound);
  setTimeout(() => {
      playAudio(increaseSound);
      captureScore.innerHTML = `Pontos: ${newGame.getScore()}`;
  }, 300);
}
