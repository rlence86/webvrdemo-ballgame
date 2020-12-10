AFRAME.registerComponent('ball', {
  schema: {
    origin: { type: 'vec3' },
    destiny: { type: 'vec3' },
    speed: { type: 'int' },
  },
  traveling: true,
  init: function () {
    var object3D = this.el.object3D;
    var data = this.data;
    object3D.position.set(data.origin.x, data.origin.y, data.origin.z);
    this.directionVec3 = new THREE.Vector3();
  },
  tick: function (time, timeDelta) {
    if (this.traveling) {
      var directionVec3 = this.directionVec3;

      var targetPosition = this.data.destiny;
      var currentPosition = this.el.object3D.position;

      directionVec3.copy(targetPosition).sub(currentPosition);

      var distance = directionVec3.length();

      if (distance < 1) {
        this.traveling = false;
        this.el.emit('ball-destiny');
      }

      var factor = this.data.speed / distance;
      ['x', 'y', 'z'].forEach(function (axis) {
        directionVec3[axis] *= factor * (timeDelta / 1000);
      });

      this.el.setAttribute('position', {
        x: currentPosition.x + directionVec3.x,
        y: currentPosition.y + directionVec3.y,
        z: currentPosition.z + directionVec3.z,
      });
    }
  },
});
