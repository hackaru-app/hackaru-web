import Factory from '@/__tests__/__setups__/factory';
import Dragger from '@/components/atoms/dragger';
import dragdrop from '@/plugins/directives/v-dragdrop';

describe('Dragger', () => {
  let factory;
  let wrapper;

  beforeEach(() => {
    factory = new Factory(Dragger, {
      slots: {
        default: '<p>draggable</p>'
      }
    });
    factory.options.localVue.directive('dragdrop', dragdrop);
  });

  it('render correctly', () => {
    expect(factory.shallow().element).toMatchSnapshot();
  });

  describe('when drag', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.vm.drag({ e: {} });
    });

    it('emit start', () => {
      expect(wrapper.emitted('start')).toBeTruthy();
    });
  });

  describe('when dragging', () => {
    const preventDefault = jest.fn();

    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.vm.dragging({
        e: { preventDefault },
        distance: {
          x: 30,
          y: 20
        }
      });
    });

    it('emit update:top', () => {
      expect(wrapper.emitted('update:top')[0]).toEqual([-20]);
    });

    it('emit update:left', () => {
      expect(wrapper.emitted('update:left')[0]).toEqual([-30]);
    });

    it('emit moving', () => {
      expect(wrapper.emitted('moving')).toBeTruthy();
    });

    it('prevent event', () => {
      expect(preventDefault).toHaveBeenCalled();
    });
  });

  describe('when drop', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ started: { top: 5, left: 5 } });
      wrapper.setProps({ top: 10, left: 10 });
      wrapper.vm.drop({ e: {} });
    });

    it('emit drop', () => {
      expect(wrapper.emitted('end')).toBeTruthy();
    });
  });

  describe('when drop but element not moving', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ started: { top: 10, left: 10 } });
      wrapper.setProps({ top: 10, left: 10 });
      wrapper.vm.drop({ e: {} });
    });

    it('emit cancel', () => {
      expect(wrapper.emitted('cancel')).toBeTruthy();
    });
  });
});
