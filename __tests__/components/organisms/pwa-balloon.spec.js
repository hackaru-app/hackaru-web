import { shallowMount } from '@vue/test-utils';
import PwaBalloon from '@/components/organisms/pwa-balloon';

describe('PwaBalloon', () => {
  let wrapper;

  const $platform = {
    isIOS: () => false,
    isPWA: () => false
  };

  const factory = () =>
    shallowMount(PwaBalloon, {
      stubs: ['i18n'],
      mocks: { $platform }
    });

  beforeEach(() => {
    localStorage.clear();
  });

  describe('when user platform is iOS', () => {
    beforeEach(() => {
      $platform.isIOS = () => true;
      $platform.isPWA = () => false;
      wrapper = factory();
    });

    it('show balloon', () => {
      expect(wrapper.contains('.pwa-balloon')).toBe(true);
    });
  });

  describe('when user platform is not iOS', () => {
    beforeEach(() => {
      $platform.isIOS = () => false;
      $platform.isPWA = () => false;
      wrapper = factory();
    });

    it('show balloon', () => {
      expect(wrapper.contains('.pwa-balloon')).toBe(false);
    });
  });

  describe('when user platform is iOS but already use PWA', () => {
    beforeEach(() => {
      $platform.isIOS = () => true;
      $platform.isPWA = () => true;
      wrapper = factory();
    });

    it('hide balloon', () => {
      expect(wrapper.contains('.pwa-balloon')).toBe(false);
    });
  });

  describe('when click close-button', () => {
    beforeEach(() => {
      $platform.isIOS = () => true;
      $platform.isPWA = () => false;
      wrapper = factory();
    });

    it('save hidePwaBallon', () => {
      wrapper.find('.close-button').vm.$emit('click');
      expect(localStorage.setItem).toHaveBeenCalledWith('hidePwaBallon', true);
    });

    it('hide balloon', () => {
      wrapper.find('.close-button').vm.$emit('click');
      expect(wrapper.contains('.pwa-balloon')).toBe(false);
    });
  });

  describe('when platform is iOS but balloon already closed', () => {
    beforeEach(() => {
      $platform.isIOS = () => true;
      $platform.isPWA = () => false;
      localStorage.setItem('hidePwaBallon', true);
      wrapper = factory();
    });

    it('hide balloon', () => {
      expect(wrapper.contains('.pwa-balloon')).toBe(false);
    });
  });
});
