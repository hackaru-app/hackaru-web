import Vuex from 'vuex';
import VueMeta from 'vue-meta';
import merge from 'lodash.merge';
import {
  shallowMount,
  mount,
  createLocalVue,
  RouterLinkStub
} from '@vue/test-utils';

const defaults = {
  localVue: createLocalVue(),
  mocks: {
    $router: {
      push: jest.fn(),
      replace: jest.fn(),
      go: jest.fn()
    },
    $route: {
      path: '/',
      fullPath: '/'
    },
    switchLocalePath: jest.fn(),
    localePath: path => `/en/${path}`,
    $t: t => t,
    $i18n: {
      locale: 'en'
    },
    $toast: {
      success: jest.fn()
    },
    $modal: {
      hide: jest.fn(),
      show: jest.fn()
    },
    $ga: {
      set: jest.fn(),
      event: jest.fn()
    }
  },
  stubs: {
    NuxtLink: RouterLinkStub,
    NuxtChild: { render: () => {} },
    I18n: { render: h => h }
  }
};

export default class Factory {
  constructor(component, options = {}) {
    this.component = component;
    this.options = merge(defaults, options);
    this.options.localVue.use(VueMeta, { keyName: 'head' });
    this.options.localVue.use(Vuex);
  }

  shallow() {
    return shallowMount(this.component, this.options);
  }

  mount() {
    return mount(this.component, this.options);
  }
}
