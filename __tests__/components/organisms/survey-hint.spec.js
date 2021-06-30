import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import SurveyHint from '~/components/organisms/survey-hint';
import testId from '~/__tests__/__helpers__/test-id';

describe('SurveyHint', () => {
  let wrapper;

  const $store = new Store({
    getters: {
      'must-have-survey/answerable': true,
    },
  });

  const factory = () =>
    shallowMount(SurveyHint, {
      mocks: {
        $store,
      },
    });

  beforeEach(() => {
    $store.reset();
  });

  it('dispatches must-have-survey/fetchAnswerable', () => {
    factory();
    expect($store.dispatch).toHaveBeenCalledWith(
      'must-have-survey/fetchAnswerable'
    );
  });

  describe('when answerable is true', () => {
    beforeEach(() => {
      $store.getters['must-have-survey/answerable'] = true;
      wrapper = factory();
    });

    it('shows survey-hint', () => {
      expect(wrapper.find(testId('survey-hint')).exists()).toBe(true);
    });
  });

  describe('when answerable is false', () => {
    beforeEach(() => {
      $store.getters['must-have-survey/answerable'] = false;
      wrapper = factory();
    });

    it('hides survey-hint', () => {
      expect(wrapper.find(testId('survey-hint')).exists()).toBe(false);
    });
  });

  describe('when click link', () => {
    beforeEach(() => {
      $store.getters['must-have-survey/answerable'] = true;
      wrapper = factory();
      wrapper.find(testId('link')).trigger('click');
    });

    it('hides survey-hint', () => {
      expect(wrapper.find(testId('survey-hint')).exists()).toBe(false);
    });
  });
});
