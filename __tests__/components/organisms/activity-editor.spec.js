import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import ActivityEditor from '@/components/organisms/activity-editor';
import ProjectList from '@/components/organisms/project-list';
import testId from '@/__tests__/__helpers__/test-id';

describe('ActivityEditor', () => {
  let wrapper;

  const $ga = { event: jest.fn() };
  const $store = new Store({});

  const factory = () =>
    shallowMount(ActivityEditor, {
      propsData: {
        params: {},
      },
      mocks: {
        $store,
        $ga,
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

    it('sends ga event', () => {
      expect($ga.event).toHaveBeenCalledWith({
        eventCategory: 'Activities',
        eventAction: 'update',
      });
    });

    it('emits pop', () => {
      expect(wrapper.emitted('pop')).toBeTruthy();
    });
  });

  describe('when click submit button and project is null', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(true);
      wrapper = factory();
      wrapper.setData({ project: null });
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatches activities/update', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/update', {
        id: 1,
        projectId: null,
        description: 'Create a database.',
        startedAt: '2019-01-01T00:12:34',
        stoppedAt: '2019-01-02T00:12:34',
      });
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

    it('sends ga event', () => {
      expect($ga.event).toHaveBeenCalledWith({
        eventCategory: 'Activities',
        eventAction: 'delete',
      });
    });

    it('emits pop', () => {
      expect(wrapper.emitted('pop')).toBeTruthy();
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

    it('does not send ga event', () => {
      expect($ga.event).not.toHaveBeenCalled();
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
      });
    });
  });
});
