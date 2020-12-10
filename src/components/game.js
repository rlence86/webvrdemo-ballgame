AFRAME.registerComponent('game', {
  target: undefined,
  init: function () {
    this.generateAndShowMainMenu();
  },
  generateAndShowMainMenu: function () {
    this.setLaserHands();
    const self = this;
    const element = this.el;
    const menuPlaceholder = document.createElement('a-entity');
    element.appendChild(menuPlaceholder);
    const menuItem = this.generateMenuItem('#left', '165', '0 2 0', '1');
    menuPlaceholder.appendChild(menuItem);
    menuPlaceholder.setAttribute('menu', '');
    menuPlaceholder.addEventListener('target-selected', function (event) {
      this.target = event.target.getAttribute('target');
      menuPlaceholder.setAttribute('animation', {
        property: 'position',
        to: '0 -6 0',
        delay: 700,
        easing: 'linear',
        autoplay: true,
      });
    });
    menuPlaceholder.addEventListener('animationcomplete', function (event) {
      element.removeChild(menuPlaceholder);
      if (this.target === '1') {
        self.startBallGame();
      }
    });
  },
  generateMenuItem: function (imgSrc, thetaStart, position, target) {
    const menuItem = document.createElement('menu-item');
    menuItem.setAttribute('class', 'ui');
    menuItem.setAttribute('src', imgSrc);
    menuItem.setAttribute('theta-start', thetaStart);
    menuItem.setAttribute('position', position);
    menuItem.setAttribute('mixin', 'animated-menu-item');
    menuItem.setAttribute('target', target);
    return menuItem;
  },
  setLaserHands: function () {
    this.createNewHands();
    const leftHand = document.getElementById('leftHand');
    leftHand.setAttribute('laser-controls', 'hand: left');
    leftHand.setAttribute('raycaster', 'objects: .ui');
    const rightHand = document.getElementById('rightHand');
    rightHand.setAttribute('laser-controls', 'hand: right');
    rightHand.setAttribute('raycaster', 'objects: .ui');
  },
  setRealHands: function () {
    this.createNewHands();
    const leftHand = document.getElementById('leftHand');
    leftHand.setAttribute(
      'hand-controls',
      'hand: left; handModelStyle: lowPoly; color: #ffcccc'
    );
    leftHand.setAttribute('aabb-collider', 'objects: .ball');
    const rightHand = document.getElementById('rightHand');
    rightHand.setAttribute(
      'hand-controls',
      'hand: right; handModelStyle: lowPoly; color: #ffcccc'
    );
    rightHand.setAttribute('aabb-collider', 'objects: .ball');
  },
  createNewHands: function () {
    let leftHand = document.getElementById('leftHand');
    if (leftHand) {
      this.el.sceneEl.removeChild(leftHand);
    }
    leftHand = document.createElement('a-entity');
    leftHand.setAttribute('id', 'leftHand');
    this.el.sceneEl.appendChild(leftHand);

    let rightHand = document.getElementById('rightHand');
    if (rightHand) {
      this.el.sceneEl.removeChild(rightHand);
    }
    rightHand = document.createElement('a-entity');
    rightHand.setAttribute('id', 'rightHand');
    this.el.sceneEl.appendChild(rightHand);
  },
  startBallGame: function () {
    this.setRealHands();
    const self = this;
    const ballGameEntity = document.createElement('a-entity');
    ballGameEntity.setAttribute('balls-game', '');
    ballGameEntity.addEventListener('ball-game-over', function (event) {
      self.el.removeChild(ballGameEntity);
      self.generateAndShowMainMenu();
    });
    this.el.appendChild(ballGameEntity);
  },
});
