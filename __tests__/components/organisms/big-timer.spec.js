import MockDate from 'mockdate';
import { Store } from 'vuex-mock-store';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import BigTimer from '@/components/organisms/big-timer';
import Tooltip from '@/plugins/v-tooltip';

describe('BigTimer', () => {
  let wrapper;

  MockDate.set('2019-01-31T01:23:45');

  const localVue = createLocalVue();
  localVue.directive('tooltip', Tooltip);

  const $modal = { show: jest.fn() };
  const $store = new Store({
    localVue,
    getters: {
      'activities/workings': () => []
    }
  });

  const factory = () =>
    shallowMount(BigTimer, {
      mocks: {
        $store,
        $modal
      }
    });

  beforeEach(() => {
    $store.reset();
  });

  describe('when click project-select', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.project-wrapper').trigger('click');
    });

    it('show modal', () => {
      expect($modal.show).toHaveBeenCalledWith('project-list');
    });
  });

  describe('when select project and timer is not working', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.nav-modal').vm.$emit('close', {
        project: {
          id: 1,
          name: 'Review',
          color: '#ff0'
        }
      });
    });

    it('does not dispatch', () => {
      expect($store.dispatch).not.toHaveBeenCalledWith(
        'activities/update',
        expect.any(Object)
      );
    });
  });

  describe('when select project and timer is working', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({
        id: 1,
        project: null,
        startedAt: '2019-01-01T01:23:45',
        description: 'Review my tasks'
      });
      wrapper.find('.nav-modal').vm.$emit('close', {
        project: {
          id: 1,
          name: 'Review',
          color: '#ff0'
        }
      });
    });

    it('dispatch activities/update', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/update', {
        id: 1,
        description: 'Review my tasks',
        projectId: 1
      });
    });
  });

  describe('when submit and timer is not working', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.nav-modal').vm.$emit('close', {
        project: {
          id: 1,
          name: 'Review',
          color: '#ff0'
        }
      });
      wrapper.find('.description').setValue('Review my tasks');
      wrapper.find('.form').trigger('submit');
    });

    it('dispatch activities/add', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/add', {
        description: 'Review my tasks',
        projectId: 1,
        startedAt: `${new Date()}`
      });
    });
  });

  describe('when submit and timer is working', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ id: 1 });
      wrapper.find('.form').trigger('submit');
    });

    it('dispatch activities/update', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/update', {
        id: 1,
        stoppedAt: `${new Date()}`
      });
    });
  });
});
