import MockDate from 'mockdate';
import { Store } from 'vuex-mock-store';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import TimerForm from '@/components/organisms/timer-form';

const testId = (id) => `[data-test-id="${id}"]`;

describe('TimerForm', () => {
  let wrapper;

  MockDate.set('2019-01-31T01:23:45');

  const localVue = createLocalVue();
  localVue.directive('tooltip', () => {});

  const $modal = { show: jest.fn() };
  const $store = new Store({
    getters: {
      'activities/working': [],
      'suggestions/all': [
        {
          project: {
            id: 2,
            name: 'Review',
            color: '#ff0',
          },
          description: 'Review my tasks',
        },
      ],
    },
  });

  const factory = () =>
    shallowMount(TimerForm, {
      localVue,
      mocks: {
        $store,
        $modal,
      },
    });

  beforeEach(() => {
    $store.reset();
  });

  it('dispatch activities/fetchWorking', () => {
    factory();
    expect($store.dispatch).toHaveBeenCalledWith('activities/fetchWorking');
  });

  describe('when click project-select', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('project-wrapper')).trigger('click');
    });

    it('show modal', () => {
      expect($modal.show).toHaveBeenCalledWith('project-list');
    });
  });

  describe('when select project and timer is not working', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('nav-modal')).vm.$emit('close', {
        project: {
          id: 1,
          name: 'Review',
          color: '#ff0',
        },
      });
    });

    it('does not dispatch activities/update', () => {
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
        description: 'Review my tasks',
      });
      wrapper.find(testId('nav-modal')).vm.$emit('close', {
        project: {
          id: 1,
          name: 'Review',
          color: '#ff0',
        },
      });
    });

    it('dispatch activities/update', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/update', {
        id: 1,
        description: 'Review my tasks',
        projectId: 1,
      });
    });
  });

  describe('when submit and timer is not working', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('nav-modal')).vm.$emit('close', {
        project: {
          id: 2,
          name: 'Review',
          color: '#ff0',
        },
      });
      wrapper.find(testId('description')).setValue('Review my tasks');
      wrapper.find(testId('form')).trigger('submit');
    });

    it('dispatch activities/add', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/add', {
        description: 'Review my tasks',
        projectId: 2,
        startedAt: `${new Date()}`,
      });
    });
  });

  describe('when submit and timer is working', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ id: 1 });
      wrapper.find(testId('form')).trigger('submit');
    });

    it('dispatch activities/update', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/update', {
        id: 1,
        stoppedAt: `${new Date()}`,
      });
    });
  });

  describe('when press enter on description and timer is working', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ id: 1 });
      wrapper.find(testId('nav-modal')).vm.$emit('close', {
        project: {
          id: 2,
          name: 'Review',
          color: '#ff0',
        },
      });
      wrapper.find(testId('description')).setValue('Review my tasks');
      wrapper.find(testId('description')).trigger('keypress.enter');
    });

    it('dispatch activities/update', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/update', {
        id: 1,
        projectId: 2,
        description: 'Review my tasks',
      });
    });
  });

  describe('when press enter on description and timer is not working', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('nav-modal')).vm.$emit('close', {
        project: {
          id: 2,
          name: 'Review',
          color: '#ff0',
        },
      });
      wrapper.find(testId('description')).setValue('Review my tasks');
      wrapper.find(testId('description')).trigger('keypress.enter');
    });

    it('dispatch activities/add', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/add', {
        projectId: 2,
        description: 'Review my tasks',
        startedAt: `${new Date()}`,
      });
    });
  });

  describe('when focus description', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('description')).trigger('focus');
    });

    it('show suggestions', () => {
      expect(wrapper.find(testId('suggestions-wrapper')).isVisible()).toBe(
        true
      );
    });
  });

  describe('when blur description and timer is not working', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('description')).trigger('focus');
      wrapper.find(testId('description')).trigger('blur');
    });

    it('hide suggestions', () => {
      expect(wrapper.find(testId('suggestions-wrapper')).isVisible()).toBe(
        false
      );
    });
  });

  describe('when change description and timer is not working', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('description')).setValue('Review my tasks');
      wrapper.find(testId('description')).trigger('change');
    });

    it('does not dispatch activities/update', () => {
      expect($store.dispatch).not.toHaveBeenCalledWith(
        'activities/update',
        expect.any(Object)
      );
    });
  });

  describe('when change description and timer is working', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ id: 1 });
      wrapper.find(testId('nav-modal')).vm.$emit('close', {
        project: {
          id: 2,
          name: 'Review',
          color: '#ff0',
        },
      });
      wrapper.find(testId('description')).setValue('Review my tasks');
      wrapper.find(testId('description')).trigger('change');
    });

    it('dispatch activities/update', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/update', {
        id: 1,
        projectId: 2,
        description: 'Review my tasks',
      });
    });
  });

  describe('when click suggestion', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('description')).trigger('focus');
      wrapper.find(testId('suggestion')).trigger('click');
    });

    it('dispatch activities/add', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/add', {
        projectId: 2,
        description: 'Review my tasks',
        startedAt: `${new Date()}`,
      });
    });
  });
});
