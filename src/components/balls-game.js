AFRAME.registerComponent('balls-game', {
  timeToNext: 3500,
  ballsInterval: 500,
  speed: 2,
  possibleTrajectories: [
    { origin: '0 1.8 -15', destiny: '0.55 0.3 2' },
    { origin: '14.77 0.787 -0.052', destiny: '-2.8 1.635 0.786' },
    { origin: '-7 4 -10', destiny: '0.5 -0.2 2' },
    { origin: '-9 0 8', destiny: '2 2 -1' },
    { origin: '-2 3 15', destiny: '-0.2 0 -2' },
    { origin: '5 10 11', destiny: '0 0 -1' },
    { origin: '12 0 3', destiny: '-2 2 -0.5' },
  ],
  init: function () {
    this.playIntroSoundAndStartGame();
  },
  playIntroSoundAndStartGame: function () {
    let self = this;
    let element = this.el;
    element.setAttribute(
      'sound',
      'src: #ball-game-sound; autoplay: true, positional: false'
    );
    element.addEventListener('sound-ended', function (event) {
      if (event.currentTarget.components.sound.attrValue.src === '#ball-game-sound') {
        element.removeAttribute('sound');
        self.createNewBall(0);
      }
    });
  },
  createNewBall: function(trajectory) {
    let self = this;
    let newBall = document.createElement('a-sphere');
    let element = this.el;
    let randomTrajectorySelected;
    if (trajectory) {
      randomTrajectorySelected = this.possibleTrajectories[trajectory];
    } else {
      randomTrajectorySelected = this.getPossibleTrajectory();
    }
    newBall.setAttribute(
      'ball',
      `origin: ${randomTrajectorySelected.origin}; destiny: ${randomTrajectorySelected.destiny}; speed: ${self.speed}`
    );
    newBall.setAttribute('radius', '0.1');
    newBall.setAttribute('material', 'src: #sun');
    newBall.setAttribute('sound', 'src: #ball-sound; autoplay: true');
    newBall.setAttribute('data-aabb-collider-dynamic', 'true');
    newBall.setAttribute('class', 'ball');
    newBall.addEventListener('ball-destiny', function (event) {
      newBall.setAttribute('sound', 'src: #ball-fail; autoplay: true');
    });
    newBall.addEventListener('sound-ended', function (event) {
      if (event.currentTarget.components.sound.attrValue.src === '#ball-sound') {
        return;
      }
      element.removeChild(newBall);
      if (event.currentTarget.components.sound.attrValue.src === '#ball-fail') {
        element.setAttribute('sound', 'src: #gameover; autoplay: true');
      } else if (event.currentTarget.components.sound.attrValue.src === '#ball-ok') {
        self.speed += 0.5;
        self.createNewBall();
      }
    });
    element.addEventListener('sound-ended', function(event) {
      if (event.currentTarget.components.sound.attrValue.src === '#gameover') {
        element.emit('ball-game-over');
      }
    });
    newBall.addEventListener('hitstart', function (event) {
      newBall.setAttribute('sound', 'src: #ball-ok; autoplay: true');
      newBall.setAttribute('visible', false);
      newBall.removeAttribute('ball');
    });
    element.appendChild(newBall);
  },
  getPossibleTrajectory: function () {
    let min = 0;
    let max = this.possibleTrajectories.length;
    let position = Math.floor(Math.random() * (max - min)) + min;
    return this.possibleTrajectories[position];
  },
});
