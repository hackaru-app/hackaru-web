import Vue from 'vue';
import '@/plugins/customs/mezr';

describe('Mezr', () => {
  it('install plugin', () => {
    expect(Vue.prototype.$mezr).toBeTruthy();
  });
});
