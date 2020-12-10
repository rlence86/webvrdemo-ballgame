AFRAME.registerPrimitive('menu-item', {
  defaultComponents: {
    geometry: {
      height: 3.034545,
      primitive: 'cylinder',
      radius: 7.72741,
      segmentsRadial: 48,
      thetaLength: 30,
      openEnded: true,
      thetaStart: 0
    },
    material: {
      color: '#FFF',
      shader: 'flat',
      side: 'double',
      transparent: true,
      repeat: '-1 1'
    }
  },

  mappings: {
    'theta-start': 'geometry.thetaStart',
    'src': 'material.src'
  }
});
