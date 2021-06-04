import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import ActivityEditor from '~/components/organisms/activity-editor';
import ProjectList from '~/components/organisms/project-list';
import testId from '~/__tests__/__helpers__/test-id';

describe('ActivityEditor', () => {
  let wrapper;

  const $ga = { event: jest.fn() };
  const $store = new Store({});
  const $mixpanel = { track: jest.fn() };

  const factory = () =>
    shallowMount(ActivityEditor, {
      propsData: {
        params: {},
      },
      mocks: {
        $store,
        $ga,
        $mixpanel,
      },
      data() {
        return {
          id: 1,
          project: {
            id: 2,
            name: 'Development',
            color: '#ff0',
          },
          description: 'Create a database',
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
        description: 'Create a database',
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

    it('sends mixpanel event', () => {
      expect($mixpanel.track).toHaveBeenCalledWith('Update activity', {
        component: 'activity-editor',
        descriptionLength: 17,
        projectId: 2,
        startedAt: '2019-01-01T00:12:34',
        stoppedAt: '2019-01-02T00:12:34',
        duration: 86400,
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
        projectId: undefined,
        description: 'Create a database',
        startedAt: '2019-01-01T00:12:34',
        stoppedAt: '2019-01-02T00:12:34',
      });
    });

    it('sends mixpanel event', () => {
      expect($mixpanel.track).toHaveBeenCalledWith('Update activity', {
        component: 'activity-editor',
        descriptionLength: 17,
        projectId: undefined,
        startedAt: '2019-01-01T00:12:34',
        stoppedAt: '2019-01-02T00:12:34',
        duration: 86400,
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

    it('sends mixpanel event', () => {
      expect($mixpanel.track).toHaveBeenCalledWith('Delete activity', {
        component: 'activity-editor',
        descriptionLength: 17,
        projectId: 2,
        startedAt: '2019-01-01T00:12:34',
        stoppedAt: '2019-01-02T00:12:34',
        duration: 86400,
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

    it('sends mixpanel event', () => {
      expect($mixpanel.track).not.toHaveBeenCalled();
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
