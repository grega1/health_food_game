export default class Game {
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
    switch (this.currentLevel) {
      case 1:
        return 3000;
    }
  };
  getPointsByLevel() {
    switch (this.currentLevel) {
      case 1:
        return 10;
    };
  }


  //actionPoint = Pontuação recebida por destruir o alvo
  increaseScore(_actionPoint = 10) {
    return this.score = this.score + parseInt(_actionPoint);
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
