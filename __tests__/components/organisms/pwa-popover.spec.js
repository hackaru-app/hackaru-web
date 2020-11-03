import { shallowMount } from '@vue/test-utils';
import PwaPopover from '@/components/organisms/pwa-popover';

const testId = (id) => `[data-test-id="${id}"]`;

describe('PwaPopover', () => {
  let wrapper;

  const $platform = {
    isIOS: () => false,
    isPWA: () => false,
  };

  const factory = () =>
    shallowMount(PwaPopover, {
      stubs: ['i18n', 'v-popover'],
      mocks: { $platform },
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

    it('show popover', () => {
      expect(wrapper.find(testId('popover')).attributes('open')).toBeTruthy();
    });
  });

  describe('when user platform is not iOS', () => {
    beforeEach(() => {
      $platform.isIOS = () => false;
      $platform.isPWA = () => false;
      wrapper = factory();
    });

    it('show popover', () => {
      expect(wrapper.find(testId('popover')).attributes('open')).toBeFalsy();
    });
  });

  describe('when user platform is iOS but already use PWA', () => {
    beforeEach(() => {
      $platform.isIOS = () => true;
      $platform.isPWA = () => true;
      wrapper = factory();
    });

    it('hide popover', () => {
      expect(wrapper.find(testId('popover')).attributes('open')).toBeFalsy();
    });
  });

  describe('when platform is iOS but popover already closed', () => {
    beforeEach(() => {
      $platform.isIOS = () => true;
      $platform.isPWA = () => false;
      localStorage.setItem('pwaPopover', true);
      wrapper = factory();
    });

    it('hide popover', () => {
      expect(wrapper.find(testId('popover')).attributes('open')).toBeFalsy();
    });
  });
});
