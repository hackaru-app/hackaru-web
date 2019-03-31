import Factory from '@/__tests__/__setups__/factory';
import windowScroll from '@/plugins/directives/v-window-scroll';

describe('VWindowScroll', () => {
  let factory;

  beforeEach(() => {
    factory = new Factory({
      template: '<div v-window-scroll="windowScroll" />',
      directives: { 'v-window-scroll': windowScroll },
      methods: { windowScroll: jest.fn() }
    });
  });

  describe('when scroll window', () => {
    beforeEach(() => {
      factory.shallow();
      window.dispatchEvent(new CustomEvent('scroll'));
    });

    it('call windowScroll', () => {
      expect(factory.component.methods.windowScroll).toHaveBeenCalledWith(
        new CustomEvent('scroll')
      );
    });
  });
});
