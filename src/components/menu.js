AFRAME.registerComponent('menu', {
  init: function () {
    let element = this.el;
    let menuElements = element.getChildren();
    let data = this.data;
    menuElements.forEach((element, index) => {
        element.addEventListener('click', function(event) {
            element.emit('target-selected');
        });
    });
  }
});