import MatchMediaMock from 'match-media-mock';
import { shallowMount } from '@vue/test-utils';
import ColorScheme from '@/components/atoms/color-scheme';

describe('ColorScheme', () => {
  let wrapper;

  const factory = () => shallowMount(ColorScheme);

  beforeEach(() => {
    window.matchMedia = MatchMediaMock.create();
  });

  describe('when scheme changes to dark', () => {
    beforeEach(() => {
      window.matchMedia.setConfig({ 'prefers-color-scheme': 'light' });
      wrapper = factory();
      window.matchMedia.setConfig({ 'prefers-color-scheme': 'dark' });
    });

    it('sets isDark to true', () => {
      expect(wrapper.vm.isDark).toBe(true);
    });
  });

  describe('when scheme changes to light', () => {
    beforeEach(() => {
      window.matchMedia.setConfig({ 'prefers-color-scheme': 'dark' });
      wrapper = factory();
      window.matchMedia.setConfig({ 'prefers-color-scheme': 'light' });
    });

    it('sets isDark to false', () => {
      expect(wrapper.vm.isDark).toBe(false);
    });
  });

  describe('when scheme changes to no-preference', () => {
    beforeEach(() => {
      window.matchMedia.setConfig({ 'prefers-color-scheme': 'dark' });
      wrapper = factory();
      window.matchMedia.setConfig({ 'prefers-color-scheme': 'no-preference' });
    });

    it('sets isDark to false', () => {
      expect(wrapper.vm.isDark).toBe(false);
    });
  });
});
