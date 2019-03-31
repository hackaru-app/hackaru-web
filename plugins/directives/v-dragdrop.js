import Vue from 'vue';

const directive = {
  bind(el, binding, vnode) {
    const options = {
      drag: () => {},
      dragging: () => {},
      drop: () => {},
      wait: 0,
      ...binding.value
    };

    const distance = {
      x: 0,
      y: 0
    };
    const started = {
      x: undefined,
      y: undefined
    };

    let triggered = false;
    let delayTimer;

    const start = e => {
      const screen = e.touches ? e.touches[0] : e;
      distance.x = 0;
      distance.y = 0;
      started.x = screen.pageX;
      started.y = screen.pageY;
      triggered = false;
      delayTimer = setTimeout(() => {
        options.drag({ e, distance });
        triggered = true;
      }, options.wait);
    };
    const move = e => {
      const screen = e.touches ? e.touches[0] : e;
      distance.x = started.x - screen.pageX;
      distance.y = started.y - screen.pageY;

      if (triggered) return options.dragging({ e, distance });
      if (Math.abs(distance.x) > 3 || Math.abs(distance.y) > 3) {
        clearInterval(delayTimer);
      }
    };
    const end = e => {
      clearInterval(delayTimer);
      if (triggered) options.drop({ e, distance });
      started.x = undefined;
      started.y = undefined;
      triggered = false;
    };

    window.addEventListener('mousemove', move, { passive: false });
    window.addEventListener('mouseup', end, { passive: false });
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('touchend', end, { passive: false });
    el.addEventListener('touchstart', start, { passive: false });
    el.addEventListener('mousedown', start, { passive: false });
  }
};

Vue.directive('dragdrop', directive);

export default directive;
