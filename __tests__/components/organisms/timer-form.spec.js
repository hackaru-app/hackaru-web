import MockDate from 'mockdate';
import { Store } from 'vuex-mock-store';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { formatISO } from 'date-fns';
import TimerForm from '~/components/organisms/timer-form';
import ProjectList from '~/components/organisms/project-list';
import testId from '~/__tests__/__helpers__/test-id';

describe('TimerForm', () => {
  let wrapper;

  MockDate.set('2019-01-31T01:23:45');

  const localVue = createLocalVue();
  localVue.directive('tooltip', () => {});

  const $ga = { event: jest.fn() };
  const $nuxt = { $emit: jest.fn() };
  const $mixpanel = { track: jest.fn() };
  const $store = new Store({
    getters: {
      'activities/working': [],
      'activities/prev': undefined,
      'projects/all': [],
    },
  });

  const factory = () =>
    shallowMount(TimerForm, {
      localVue,
      mocks: {
        $ga,
        $nuxt,
        $store,
        $mixpanel,
      },
    });

  beforeEach(() => {
    $store.reset();
  });

  describe('when select project and timer is not working', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.vm.selectProject({
        project: {
          id: 1,
          name: 'Review',
          color: '#ff0',
        },
      });
    });

    it('does not dispatch activities/update', () => {
      expect($store.dispatch).not.toHaveBeenCalledWith('activities/update', {
        id: 1,
        description: 'Review my tasks',
        projectId: 1,
      });
    });

    it('does not send mixpanel event', () => {
      expect($mixpanel.track).not.toHaveBeenCalled();
    });

    it('does not send ga event', () => {
      expect($ga.event).not.toHaveBeenCalledWith();
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
      wrapper.vm.selectProject({
        project: {
          id: 1,
          name: 'Review',
          color: '#ff0',
        },
      });
    });

    it('dispatches activities/update', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/update', {
        id: 1,
        description: 'Review my tasks',
        projectId: 1,
      });
    });

    it('sends mixpanel event', () => {
      expect($mixpanel.track).toHaveBeenCalledWith('Select project', {
        component: 'timer-form',
      });
    });

    it('sends ga event', () => {
      expect($ga.event).toHaveBeenCalledWith({
        eventCategory: 'Activities',
        eventAction: 'update',
      });
    });
  });

  describe('when click project-select', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('project-wrapper')).trigger('click');
    });

    it('sends mixpanel event', () => {
      expect($mixpanel.track).toHaveBeenCalledWith('Show project modal', {
        component: 'timer-form',
      });
    });

    it('shows modal', () => {
      expect($nuxt.$emit).toHaveBeenCalledWith('show-modal', {
        component: ProjectList,
        callback: wrapper.vm.selectProject,
      });
    });
  });

  describe('when submit and timer is not working', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({
        project: {
          id: 2,
          name: 'Review',
          color: '#ff0',
        },
      });
      wrapper.find(testId('description')).setValue('Review my tasks');
      wrapper.find(testId('form')).trigger('submit');
    });

    it('dispatches activities/add', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/add', {
        description: 'Review my tasks',
        projectId: 2,
        startedAt: `${new Date()}`,
      });
    });

    it('sends mixpanel event', () => {
      expect($mixpanel.track).toHaveBeenCalledWith('Start activity', {
        component: 'timer-form',
        projectId: 2,
        descriptionLength: 15,
        startedAt: formatISO(new Date()),
      });
    });

    it('sends ga event', () => {
      expect($ga.event).toHaveBeenCalledWith({
        eventCategory: 'Activities',
        eventAction: 'start',
      });
    });
  });

  describe('when submit and timer is working', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({
        id: 1,
        startedAt: '2019-01-31T00:23:45',
        description: 'Review my tasks',
        project: {
          id: 2,
          name: 'Review',
          color: '#ff0',
        },
      });
      wrapper.find(testId('form')).trigger('submit');
    });

    it('dispatches activities/update', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/update', {
        id: 1,
        stoppedAt: `${new Date()}`,
      });
    });

    it('sends mixpanel event', () => {
      expect($mixpanel.track).toHaveBeenCalledWith('Stop activity', {
        component: 'timer-form',
        projectId: 2,
        descriptionLength: 15,
        startedAt: '2019-01-31T00:23:45',
        stoppedAt: formatISO(new Date()),
        duration: 3600,
      });
    });

    it('sends ga event', () => {
      expect($ga.event).toHaveBeenCalledWith({
        eventCategory: 'Activities',
        eventAction: 'stop',
      });
    });
  });

  describe('when press enter on description and timer is working', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({
        id: 1,
        startedAt: '2019-01-31T00:23:45',
        project: {
          id: 2,
          name: 'Review',
          color: '#ff0',
        },
      });
      wrapper.find(testId('description')).setValue('Review my tasks');
      wrapper.find(testId('description')).trigger('keypress.enter');
    });

    it('dispatches activities/update', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/update', {
        id: 1,
        projectId: 2,
        description: 'Review my tasks',
      });
    });

    it('sends mixpanel event', () => {
      expect($mixpanel.track).toHaveBeenCalledWith('Update activity', {
        component: 'timer-form',
        projectId: 2,
        descriptionLength: 15,
        startedAt: '2019-01-31T00:23:45',
      });
    });

    it('sends ga event', () => {
      expect($ga.event).toHaveBeenCalledWith({
        eventCategory: 'Activities',
        eventAction: 'update',
      });
    });
  });

  describe('when press enter on description and timer is not working', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({
        project: {
          id: 2,
          name: 'Review',
          color: '#ff0',
        },
      });
      wrapper.find(testId('description')).setValue('Review my tasks');
      wrapper.find(testId('description')).trigger('keypress.enter');
    });

    it('dispatches activities/add', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/add', {
        projectId: 2,
        description: 'Review my tasks',
        startedAt: `${new Date()}`,
      });
    });

    it('sends mixpanel event', () => {
      expect($mixpanel.track).toHaveBeenCalledWith('Start activity', {
        component: 'timer-form',
        projectId: 2,
        descriptionLength: 15,
        startedAt: formatISO(new Date()),
      });
    });

    it('sends ga event', () => {
      expect($ga.event).toHaveBeenCalledWith({
        eventCategory: 'Activities',
        eventAction: 'start',
      });
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

    it('does not send mixpanel event', () => {
      expect($mixpanel.track).not.toHaveBeenCalled();
    });

    it('does not send ga event', () => {
      expect($ga.event).not.toHaveBeenCalledWith();
    });
  });

  describe('when change description and timer is working', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({
        id: 1,
        project: {
          id: 2,
          name: 'Review',
          color: '#ff0',
        },
      });
      wrapper.find(testId('description')).setValue('Review my tasks');
      wrapper.find(testId('description')).trigger('change');
    });

    it('dispatches activities/update', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/update', {
        id: 1,
        projectId: 2,
        description: 'Review my tasks',
      });
    });

    it('sends ga event', () => {
      expect($ga.event).toHaveBeenCalledWith({
        eventCategory: 'Activities',
        eventAction: 'update',
      });
    });
  });

  describe('when click suggestion', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('suggestion-list')).vm.$emit('click', {
        description: 'Review my tasks',
        project: {
          id: 2,
          name: 'Review',
          color: '#ff0',
        },
      });
    });

    it('dispatches activities/add', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/add', {
        projectId: 2,
        description: 'Review my tasks',
        startedAt: `${new Date()}`,
      });
    });

    it('sends mixpanel event', () => {
      expect($mixpanel.track).toHaveBeenCalledWith('Click suggestion', {
        component: 'timer-form',
      });
    });

    it('sends ga event', () => {
      expect($ga.event).toHaveBeenCalledWith({
        eventCategory: 'Activities',
        eventAction: 'start',
      });
    });
  });
});
