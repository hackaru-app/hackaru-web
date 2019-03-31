import Factory from '@/__tests__/__setups__/factory';
import InfiniteSlider from '@/components/organisms/infinite-slider';
import dragdrop from '@/plugins/directives/v-dragdrop';
import windowScroll from '@/plugins/directives/v-window-scroll';

describe('InfiniteSlider', () => {
  let factory;
  let wrapper;

  beforeEach(() => {
    jest.useFakeTimers();
    factory = new Factory(InfiniteSlider, {
      mocks: {
        $mezr: {
          width: () => 500
        }
      },
      slots: {
        default: '<p>Content</p>'
      }
    });
    factory.options.localVue.directive('dragdrop', dragdrop);
    factory.options.localVue.directive('window-scroll', windowScroll);
  });

  it('render correctly', () => {
    expect(factory.shallow().element).toMatchSnapshot();
  });

  describe('when drag', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.vm.drag();
    });

    it('reset cancelled', () => {
      expect(wrapper.vm.cancelled).toBe(false);
    });
  });

  describe('when dragging', () => {
    let preventDefault;

    beforeEach(() => {
      preventDefault = jest.fn();
      wrapper = factory.shallow();
      wrapper.vm.dragging({
        e: { preventDefault },
        distance: {
          x: 100
        }
      });
    });

    it('update style', () => {
      expect(wrapper.vm.style).toEqual({
        transform: 'translateX(-600px)', // $mezr.width + distance.x
        transition: 'none'
      });
    });

    it('prevent event', () => {
      expect(preventDefault).toHaveBeenCalled();
    });
  });

  describe('when dragging but scrolled', () => {
    let preventDefault;

    beforeEach(() => {
      preventDefault = jest.fn();
      wrapper = factory.shallow();
      wrapper.vm.windowScroll();
      wrapper.vm.dragging({
        e: { preventDefault },
        distance: {
          x: 100
        }
      });
    });

    it('does not update style', () => {
      expect(wrapper.vm.style).toEqual({
        transform: 'translateX(-100%)',
        transition: 'none'
      });
    });

    it('does not prevent event', () => {
      expect(preventDefault).not.toHaveBeenCalled();
    });
  });

  describe('when dragging but distance.x < 20', () => {
    let preventDefault;

    beforeEach(() => {
      preventDefault = jest.fn();
      wrapper = factory.shallow();
      wrapper.vm.dragging({
        e: { preventDefault },
        distance: {
          x: 10
        }
      });
    });

    it('does not update style', () => {
      expect(wrapper.vm.style).toEqual({
        transform: 'translateX(-100%)',
        transition: 'none'
      });
    });

    it('does not prevent event', () => {
      expect(preventDefault).not.toHaveBeenCalled();
    });
  });

  describe('when dragging but disabled', () => {
    let preventDefault;

    beforeEach(() => {
      preventDefault = jest.fn();
      wrapper = factory.shallow();
      wrapper.setProps({ disabled: true });
      wrapper.vm.dragging({
        e: { preventDefault },
        distance: {
          x: 100
        }
      });
    });

    it('does not update style', () => {
      expect(wrapper.vm.style).toEqual({
        transform: 'translateX(-100%)',
        transition: 'none'
      });
    });

    it('does not prevent event', () => {
      expect(preventDefault).not.toHaveBeenCalled();
    });
  });

  describe('when slide right', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.vm.drop({
        distance: {
          x: 150
        }
      });
    });

    it('update style', () => {
      expect(wrapper.vm.style).toEqual({
        transform: 'translateX(-200%)',
        transition: 'transform 300ms'
      });
    });

    it('emit slide-right', () => {
      jest.runOnlyPendingTimers();
      expect(wrapper.emitted('slide-right')).toBeTruthy();
    });
  });

  describe('when slide left', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.vm.drop({
        distance: {
          x: -150
        }
      });
    });

    it('update style', () => {
      expect(wrapper.vm.style).toEqual({
        transform: 'translateX(0%)',
        transition: 'transform 300ms'
      });
    });

    it('emit slide-left', () => {
      jest.runOnlyPendingTimers();
      expect(wrapper.emitted('slide-left')).toBeTruthy();
    });
  });

  describe('when slide but scrolled', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.vm.windowScroll();
      wrapper.vm.drop({
        distance: {
          x: -150
        }
      });
    });

    it('reset style', () => {
      expect(wrapper.vm.style).toEqual({
        transform: 'translateX(-100%)',
        transition: 'transform 300ms'
      });
    });

    it('emit reset', () => {
      jest.runOnlyPendingTimers();
      expect(wrapper.emitted('reset')).toBeTruthy();
    });
  });

  describe('when slide twice', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.vm.drop({
        distance: {
          x: 150
        }
      });
      wrapper.vm.drop({
        distance: {
          x: 150
        }
      });
    });

    it('emit slide only once', () => {
      jest.runOnlyPendingTimers();
      expect(wrapper.emitted('slide-right').length).toBe(1);
    });
  });

  describe('when slide but distance.x < 100', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.vm.drop({
        distance: {
          x: 10
        }
      });
    });

    it('reset style', () => {
      expect(wrapper.vm.style).toEqual({
        transform: 'translateX(-100%)',
        transition: 'transform 300ms'
      });
    });

    it('emit reset', () => {
      jest.runOnlyPendingTimers();
      expect(wrapper.emitted('reset')).toBeTruthy();
    });
  });
});
