import { Store } from 'vuex-mock-store';
import Factory from '@/__tests__/__setups__/factory';
import ActivityEditor from '@/components/organisms/activity-editor';
import ProjectList from '@/components/organisms/project-list';

describe('ActivityEditor', () => {
  let wrapper;
  let factory;

  const $store = new Store({});

  beforeEach(() => {
    $store.reset();
    factory = new Factory(ActivityEditor, {
      mocks: { $store },
      data() {
        return {
          id: 1,
          project: {
            id: 2,
            name: 'Development',
            color: '#ff0'
          },
          description: 'Create a database.',
          startedAt: '2019-01-01T00:12:34',
          stoppedAt: '2019-01-02T00:12:34'
        };
      }
    });
  });

  it('render correctly', () => {
    expect(factory.shallow().element).toMatchSnapshot();
  });

  describe('when submit and id is defined', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(true);
      wrapper = factory.shallow();
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatch activities/updateActivity', () => {
      expect($store.dispatch).toHaveBeenCalledWith(
        'activities/updateActivity',
        {
          id: 1,
          projectId: 2,
          description: 'Create a database.',
          startedAt: '2019-01-01T00:12:34',
          stoppedAt: '2019-01-02T00:12:34'
        }
      );
    });

    it('send ga event', () => {
      expect(factory.options.mocks.$ga.event).toHaveBeenCalledWith(
        'activity',
        'updateActivity'
      );
    });

    it('hide modal', () => {
      expect(factory.options.mocks.$modal.hide).toHaveBeenCalledWith(
        'activity'
      );
    });
  });

  describe('when submit and id is undefined', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(true);
      wrapper = factory.shallow();
      wrapper.setData({ id: undefined });
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatch activities/addActivity', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/addActivity', {
        projectId: 2,
        description: 'Create a database.',
        startedAt: '2019-01-01T00:12:34',
        stoppedAt: '2019-01-02T00:12:34'
      });
    });

    it('send ga event', () => {
      expect(factory.options.mocks.$ga.event).toHaveBeenCalledWith(
        'activity',
        'addActivity'
      );
    });

    it('hide modal', () => {
      expect(factory.options.mocks.$modal.hide).toHaveBeenCalledWith(
        'activity'
      );
    });
  });

  describe('when submit but failed', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(false);
      wrapper = factory.shallow();
      wrapper.find('form').trigger('submit.prevent');
    });

    it('does not hide modal', () => {
      expect(factory.options.mocks.$modal.hide).not.toHaveBeenCalled();
    });
  });

  describe('when press delete button and confirm is false', () => {
    beforeEach(() => {
      global.confirm = () => false;
      wrapper = factory.shallow();
      wrapper.find('.delete-button').vm.$emit('click');
    });

    it('dose not dispatch activities/deleteActivity', () => {
      expect($store.dispatch).not.toHaveBeenCalled();
    });

    it('does not hide modal', () => {
      expect(factory.options.mocks.$modal.hide).not.toHaveBeenCalled();
    });
  });

  describe('when press delete button and confirm is true', () => {
    beforeEach(() => {
      global.confirm = () => true;
      wrapper = factory.shallow();
      wrapper.find('.delete-button').vm.$emit('click');
    });

    it('dispatch activities/deleteActivity', () => {
      expect($store.dispatch).toHaveBeenCalledWith(
        'activities/deleteActivity',
        1
      );
    });

    it('send ga event', () => {
      expect(factory.options.mocks.$ga.event).toHaveBeenCalledWith(
        'activity',
        'deleteActivity'
      );
    });

    it('hide modal', () => {
      expect(factory.options.mocks.$modal.hide).toHaveBeenCalledWith(
        'activity'
      );
    });
  });

  describe('when press project button', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find('.project-button').trigger('click');
    });

    it('emit push', () => {
      expect(wrapper.emitted('push')[0]).toEqual([
        {
          component: ProjectList,
          params: { selected: 2 }
        }
      ]);
    });
  });

  describe('when press share button', () => {
    beforeEach(() => {
      window.navigator.share = jest.fn();
      wrapper = factory.shallow();
      wrapper.find('.share-button').vm.$emit('click');
    });

    it('call share API', () => {
      expect(window.navigator.share).toHaveBeenCalled();
    });
  });
});
