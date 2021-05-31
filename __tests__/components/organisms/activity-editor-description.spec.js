import { Store } from 'vuex-mock-store';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import ActivityEditorDescription from '~/components/organisms/activity-editor-description';
import testId from '~/__tests__/__helpers__/test-id';

describe('ActivityEditorDescription', () => {
  let wrapper;

  const localVue = createLocalVue();
  localVue.directive('scroll-lock', () => {});

  const $mixpanel = { track: jest.fn() };
  const $store = new Store({
    getters: {
      'suggestions/all': [
        {
          project: {
            id: 2,
            name: 'Review',
            color: '#ff0',
          },
          description: 'Review my tasks',
        },
        {
          project: null,
          description: 'Add tests',
        },
      ],
    },
  });

  const factory = () =>
    shallowMount(ActivityEditorDescription, {
      localVue,
      mocks: {
        $store,
        $mixpanel,
      },
      propsData: {
        value: 'Create a database',
        project: undefined,
      },
    });

  beforeEach(() => {
    $store.reset();
  });

  describe('when focus description', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('description')).trigger('focus');
    });

    it('shows suggestions', () => {
      expect(wrapper.find(testId('suggestions')).exists()).toBe(true);
    });
  });

  describe('when blur description', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('description')).trigger('focus');
      wrapper.find(testId('description')).trigger('blur');
    });

    it('hides suggestions', () => {
      expect(wrapper.find(testId('suggestions')).exists()).toBe(false);
    });
  });

  describe('when input description', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('description')).setValue('Review my tasks');
      wrapper.find(testId('description')).trigger('input');
    });

    it('emits input', () => {
      expect(wrapper.emitted('input')[0][0]).toBe('Review my tasks');
    });
  });

  describe('when click suggestion', () => {
    beforeEach(async () => {
      wrapper = factory();
      await wrapper.find(testId('description')).trigger('focus');
      wrapper.find(testId('suggestion')).trigger('click');
    });

    it('emits input', () => {
      expect(wrapper.emitted('input')[0][0]).toBe('Review my tasks');
    });

    it('emits select-project', () => {
      expect(wrapper.emitted('select-project')[0][0]).toEqual({
        id: 2,
        name: 'Review',
        color: '#ff0',
      });
    });

    it('sends mixpanel event', () => {
      expect($mixpanel.track).toHaveBeenCalledWith('Click suggestion', {
        component: 'activity-editor-description',
        descriptionLength: 15,
        projectId: 2,
      });
    });
  });

  describe('when click suggestion and project is null', () => {
    beforeEach(async () => {
      wrapper = factory();
      await wrapper.find(testId('description')).trigger('focus');
      wrapper.findAll(testId('suggestion')).at(1).trigger('click');
    });

    it('emits select-project', () => {
      expect(wrapper.emitted('select-project')[0][0]).toBeNull();
    });

    it('sends mixpanel event', () => {
      expect($mixpanel.track).toHaveBeenCalledWith('Click suggestion', {
        component: 'activity-editor-description',
        descriptionLength: 9,
        projectId: undefined,
      });
    });
  });
});
