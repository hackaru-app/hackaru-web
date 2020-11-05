import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import ActivityEditorDescription from '@/components/organisms/activity-editor-description';
import testId from '@/__tests__/__helpers__/test-id';

describe('ActivityEditorDescription', () => {
  let wrapper;

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
      ],
    },
  });

  const factory = () =>
    shallowMount(ActivityEditorDescription, {
      mocks: {
        $store,
      },
      propsData: {
        description: 'Create a database.',
        project: {
          id: null,
          name: 'No Project',
          color: '#cccfd9',
        },
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

    it('emits update:description', () => {
      expect(wrapper.emitted('update:description')[0][0]).toBe(
        'Review my tasks'
      );
    });
  });

  describe('when click suggestion', () => {
    beforeEach(async () => {
      wrapper = factory();
      await wrapper.find(testId('description')).trigger('focus');
      wrapper.find(testId('suggestion')).trigger('click');
    });

    it('emits update:description', () => {
      expect(wrapper.emitted('update:description')[0][0]).toBe(
        'Review my tasks'
      );
    });

    it('emits update:project', () => {
      expect(wrapper.emitted('update:project')[0][0]).toEqual({
        id: 2,
        name: 'Review',
        color: '#ff0',
      });
    });
  });
});
