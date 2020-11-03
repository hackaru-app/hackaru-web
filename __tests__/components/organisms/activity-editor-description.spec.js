import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import ActivityEditorDescription from '@/components/organisms/activity-editor-description';

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
      wrapper.find('.description').trigger('focus');
    });

    it('show suggestions', () => {
      expect(wrapper.find('.suggestions').exists()).toBe(true);
    });
  });

  describe('when blur description', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.description').trigger('focus');
      wrapper.find('.description').trigger('blur');
    });

    it('hide suggestions', () => {
      expect(wrapper.find('.suggestions').exists()).toBe(false);
    });
  });

  describe('when input description', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.description').setValue('Review my tasks');
      wrapper.find('.description').trigger('input');
    });

    it('emits update:description', () => {
      expect(wrapper.emitted('update:description')[0][0]).toBe(
        'Review my tasks'
      );
    });
  });

  describe('when click suggestion', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.description').trigger('focus');
      wrapper.find('.suggestion').trigger('click');
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
