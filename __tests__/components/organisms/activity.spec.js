import MockDate from 'mockdate';
import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Activity from '@/components/organisms/activity';

describe('Activity', () => {
  let wrapper;

  MockDate.set('2019-01-31T01:23:45');

  const $store = new Store({});
  const $modal = { show: jest.fn() };
  const factory = () =>
    shallowMount(Activity, {
      propsData: {
        id: 1,
        project: null,
        description: 'Review',
        duration: 0,
        startedAt: '2019-01-01T01:23:45'
      },
      mocks: {
        $store,
        $modal
      }
    });

  beforeEach(() => {
    $store.reset();
  });

  describe('when click stop-button', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.stop-button').vm.$emit('click');
    });

    it('dispatch activities/updateActivity', () => {
      expect($store.dispatch).toHaveBeenCalledWith(
        'activities/updateActivity',
        {
          id: 1,
          stoppedAt: `${new Date()}`
        }
      );
    });
  });

  describe('when swipe right', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.acitivty').vm.$emit('swipe-right');
    });

    it('dispatch activities/updateActivity', () => {
      expect($store.dispatch).toHaveBeenCalledWith(
        'activities/updateActivity',
        {
          id: 1,
          stoppedAt: `${new Date()}`
        }
      );
    });
  });

  describe('when swipe left', () => {
    beforeEach(() => {
      global.confirm = () => true;
      wrapper = factory();
      wrapper.find('.acitivty').vm.$emit('swipe-left');
    });

    it('dispatch activities/deleteActivity', () => {
      expect($store.dispatch).toHaveBeenCalledWith(
        'activities/deleteActivity',
        1
      );
    });
  });

  describe('when swipe left but confirm is false', () => {
    beforeEach(() => {
      global.confirm = () => false;
      wrapper = factory();
      wrapper.setMethods({ resetSwipeMenu: () => {} });
      wrapper.find('.acitivty').vm.$emit('swipe-left');
    });

    it('does not dispatch activities/deleteActivity', () => {
      expect($store.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('when click content', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.activity-content').trigger('click');
    });

    it('show modal', () => {
      expect($modal.show).toHaveBeenCalledWith('activity', {
        id: 1,
        description: 'Review',
        project: undefined,
        startedAt: '2019-01-01T01:23:45',
        stoppedAt: undefined
      });
    });
  });
});
