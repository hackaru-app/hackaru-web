import Vue from 'vue';
import mezr from 'mezr';

const install = function(Vue, options) {
  Vue.prototype.$mezr = mezr;
};

Vue.use({ install });
