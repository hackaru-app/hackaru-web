import Vue from 'vue';

const directive = {
  bind(el, binding, vnode) {
    window.addEventListener('scroll', e => binding.value(e), {
      passive: false
    });
  }
};

Vue.directive('scroll-window', directive);

export default directive;
