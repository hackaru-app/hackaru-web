import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import ActivityEditor from '@/components/organisms/activity-editor';
import ProjectList from '@/components/organisms/project-list';

const testId = (id) => `[data-test-id="${id}"]`;

describe('ActivityEditor', () => {
  let wrapper;

  const $store = new Store({});
  const $modal = { hide: jest.fn() };
  const factory = () =>
    shallowMount(ActivityEditor, {
      mocks: {
        $store,
        $modal,
      },
      data() {
        return {
          id: 1,
          project: {
            id: 2,
            name: 'Development',
            color: '#ff0',
          },
          description: 'Create a database.',
          startedAt: '2019-01-01T00:12:34',
          stoppedAt: '2019-01-02T00:12:34',
        };
      },
    });

  beforeEach(() => {
    $store.reset();
  });

  describe('when click submit button', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(true);
      wrapper = factory();
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatches activities/update', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/update', {
        id: 1,
        projectId: 2,
        description: 'Create a database.',
        startedAt: '2019-01-01T00:12:34',
        stoppedAt: '2019-01-02T00:12:34',
      });
    });

    it('hides modal', () => {
      expect($modal.hide).toHaveBeenCalledWith('activity');
    });
  });

  describe('when click submit button and id is undefined', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(true);
      wrapper = factory();
      wrapper.setData({ id: undefined });
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatches activities/add', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/add', {
        projectId: 2,
        description: 'Create a database.',
        startedAt: '2019-01-01T00:12:34',
        stoppedAt: '2019-01-02T00:12:34',
      });
    });

    it('hides modal', () => {
      expect($modal.hide).toHaveBeenCalledWith('activity');
    });
  });

  describe('when click delete button', () => {
    beforeEach(() => {
      global.confirm = () => true;
      wrapper = factory();
      wrapper.find(testId('delete-button')).vm.$emit('click');
    });

    it('dispatches activities/delete', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/delete', 1);
    });

    it('hides modal', () => {
      expect($modal.hide).toHaveBeenCalledWith('activity');
    });
  });

  describe('when click delete button but comfirm is false', () => {
    beforeEach(() => {
      global.confirm = () => false;
      wrapper = factory();
      wrapper.find(testId('delete-button')).vm.$emit('click');
    });

    it('does not dispatch activities/delete', () => {
      expect($store.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('when press project button', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('project-button')).trigger('click');
    });

    it('emits push', () => {
      expect(wrapper.emitted('push')[0][0]).toEqual({
        component: ProjectList,
        params: { selected: 2 },
      });
    });
  });
});
