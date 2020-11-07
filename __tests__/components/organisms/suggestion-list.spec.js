import MockDate from 'mockdate';
import { Store } from 'vuex-mock-store';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import SuggestionList from '@/components/organisms/suggestion-list';
import testId from '@/__tests__/__helpers__/test-id';

describe('SuggestionList', () => {
  let wrapper;

  MockDate.set('2019-01-31T01:23:45');

  const localVue = createLocalVue();
  localVue.directive('scroll-lock', () => {});

  const $store = new Store({
    getters: {
      'suggestions/all': [
        {
          description: 'Review my tasks',
          project: {
            id: 2,
            name: 'Review',
            color: '#ff0',
          },
        },
      ],
    },
  });

  const factory = () =>
    shallowMount(SuggestionList, {
      localVue,
      propsData: {
        description: '',
        shown: true,
      },
      mocks: {
        $store,
      },
    });

  beforeEach(() => {
    $store.reset();
  });

  describe('when shown is true', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({ shown: true });
    });

    it('shows suggestions-wrapper', () => {
      expect(wrapper.find(testId('suggestions-wrapper')).isVisible()).toBe(
        true
      );
    });
  });

  describe('when shown is false', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({ shown: false });
    });

    it('shows suggestions-wrapper', () => {
      expect(wrapper.find(testId('suggestions-wrapper')).isVisible()).toBe(
        false
      );
    });
  });

  describe('when click suggestion', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.findAll(testId('suggestion')).at(0).trigger('click');
    });

    it('emits click', () => {
      expect(wrapper.emitted('click')[0][0]).toEqual({
        description: 'Review my tasks',
        project: {
          id: 2,
          name: 'Review',
          color: '#ff0',
        },
      });
    });
  });
});
