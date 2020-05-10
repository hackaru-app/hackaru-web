import Vue from 'vue';

const install = function (Vue) {
  const pxPerMin = 40 / 60;
  Vue.prototype.$toPx = (min) => min * pxPerMin;
  Vue.prototype.$toMin = (px) => px / pxPerMin;
};

Vue.use({ install });
