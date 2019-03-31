import Factory from '@/__tests__/__setups__/factory';
import SwipeMenu from '@/components/molecules/swipe-menu';
import dragdrop from '@/plugins/directives/v-dragdrop';
import windowScroll from '@/plugins/directives/v-window-scroll';

describe('SwipeMenu', () => {
  let factory;
  let wrapper;

  beforeEach(() => {
    jest.useFakeTimers();
    factory = new Factory(SwipeMenu, {
      propsData: {
        speed: 100,
        minDistance: 120
      },
      slots: {
        left: '<span>Swipe Left</span>',
        default: '<p>Content</p>',
        right: '<span>Swipe Right</span>'
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

    it('reset left style', () => {
      expect(wrapper.vm.leftStyle).toEqual({
        transition: '',
        width: 0
      });
    });

    it('reset right style', () => {
      expect(wrapper.vm.rightStyle).toEqual({
        transition: '',
        width: 0
      });
    });
  });

  describe('when left swiping', () => {
    const preventDefault = jest.fn();

    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.vm.dragging({
        e: { preventDefault },
        distance: {
          x: -100,
          y: 0
        }
      });
    });

    it('reset right style', () => {
      expect(wrapper.vm.rightStyle).toEqual({
        transition: '',
        width: 0
      });
    });

    it('set left style', () => {
      expect(wrapper.vm.leftStyle).toEqual({
        transition: '',
        width: '100px'
      });
    });

    it('prevent event', () => {
      expect(preventDefault).toHaveBeenCalled();
    });
  });

  describe('when right swiping', () => {
    const preventDefault = jest.fn();

    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.vm.dragging({
        e: { preventDefault },
        distance: {
          x: 100,
          y: 0
        }
      });
    });

    it('set right style', () => {
      expect(wrapper.vm.rightStyle).toEqual({
        transition: '',
        width: '100px'
      });
    });

    it('reset left style', () => {
      expect(wrapper.vm.leftStyle).toEqual({
        transition: '',
        width: 0
      });
    });

    it('prevent event', () => {
      expect(preventDefault).toHaveBeenCalled();
    });
  });

  describe('when swiping but distance.x < 40', () => {
    const preventDefault = jest.fn();

    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.vm.dragging({
        e: { preventDefault },
        distance: {
          x: 39,
          y: 0
        }
      });
    });

    it('does not set styles', () => {
      expect(wrapper.vm.leftStyle).toEqual({
        transition: '',
        width: 0
      });
      expect(wrapper.vm.rightStyle).toEqual({
        transition: '',
        width: 0
      });
    });

    it('does not prevent event', () => {
      expect(preventDefault).not.toHaveBeenCalled();
    });
  });

  describe('when left swiped', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.vm.drop({
        distance: {
          x: -500,
          y: 0
        }
      });
    });

    it('set left style', () => {
      expect(wrapper.vm.leftStyle).toEqual({
        transition: 'width 100ms',
        width: '100%'
      });
    });

    it('call swipeLeft delayed', () => {
      jest.runOnlyPendingTimers();
      expect(wrapper.emitted('swipe-left')).toBeTruthy();
    });
  });

  describe('when right swiped', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.vm.drop({
        distance: {
          x: 500,
          y: 0
        }
      });
    });

    it('set right style', () => {
      expect(wrapper.vm.rightStyle).toEqual({
        transition: 'width 100ms',
        width: '100%'
      });
    });

    it('call swipeRight delayed', () => {
      jest.runOnlyPendingTimers();
      expect(wrapper.emitted('swipe-right')).toBeTruthy();
    });
  });

  describe('when swiped but distance.x < minDistance', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.vm.drop({
        distance: {
          x: 119,
          y: 0
        }
      });
    });

    it('reset styles', () => {
      expect(wrapper.vm.leftStyle).toEqual({
        transition: 'width 100ms',
        width: 0
      });
      expect(wrapper.vm.rightStyle).toEqual({
        transition: 'width 100ms',
        width: 0
      });
    });
  });

  describe('when swiped but scrolled', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.vm.windowScroll();
      wrapper.vm.drop({
        distance: {
          x: 100,
          y: 0
        }
      });
    });

    it('reset styles', () => {
      expect(wrapper.vm.leftStyle).toEqual({
        transition: 'width 100ms',
        width: 0
      });
      expect(wrapper.vm.rightStyle).toEqual({
        transition: 'width 100ms',
        width: 0
      });
    });
  });

  describe('when call resetWithAnimation', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.vm.resetWithAnimation();
    });

    it('reset styles', () => {
      expect(wrapper.vm.leftStyle).toEqual({
        transition: 'width 100ms',
        width: 0
      });
      expect(wrapper.vm.rightStyle).toEqual({
        transition: 'width 100ms',
        width: 0
      });
    });
  });
});
