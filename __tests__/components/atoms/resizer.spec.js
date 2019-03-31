import Factory from '@/__tests__/__setups__/factory';
import Resizer from '@/components/atoms/resizer';
import dragdrop from '@/plugins/directives/v-dragdrop';

describe('Resizer', () => {
  let factory;
  let wrapper;

  beforeEach(() => {
    factory = new Factory(Resizer, {
      slots: {
        default: '<p>resizable</p>'
      }
    });
    factory.options.localVue.directive('dragdrop', dragdrop);
  });

  it('render correctly', () => {
    expect(factory.shallow().element).toMatchSnapshot();
  });

  describe('when drag handler', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.vm.drag({ e: {} });
    });

    it('emit start', () => {
      expect(wrapper.emitted('start')).toBeTruthy();
    });
  });

  describe('when drag handler but disabled', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setProps({ disabled: true });
      wrapper.vm.drag({ e: {} });
    });

    it('does not emit start', () => {
      expect(wrapper.emitted('start')).toBeFalsy();
    });
  });

  describe('when dragging handler', () => {
    const preventDefault = jest.fn();

    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ started: { height: 50 } });
      wrapper.vm.dragging({
        e: { preventDefault },
        distance: { x: 0, y: 30 }
      });
    });

    it('emit update:height', () => {
      expect(wrapper.emitted('update:height')[0]).toEqual([20]);
    });
  });

  describe('when dragging handler but resized height < minHeight', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setProps({ minHeight: 50 });
      wrapper.setData({ started: { height: 100 } });
      wrapper.vm.dragging({
        e: { preventDefault: jest.fn() },
        distance: { x: 0, y: 999 }
      });
    });

    it('emit update:height with minHeight', () => {
      expect(wrapper.emitted('update:height')[0]).toEqual([50]);
    });
  });

  describe('when dragging handler but disabled', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setProps({ disabled: true });
      wrapper.vm.dragging({ e: {} });
    });

    it('does not emit resizing', () => {
      expect(wrapper.emitted('resizing')).toBeFalsy();
    });
  });

  describe('when drop handler', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ started: { height: 5 } });
      wrapper.setProps({ height: 10 });
      wrapper.vm.drop({ e: {} });
    });

    it('emit end', () => {
      expect(wrapper.emitted('end')).toBeTruthy();
    });
  });

  describe('when drop handler but not resized', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ started: { height: 10 } });
      wrapper.setProps({ height: 10 });
      wrapper.vm.drop({ e: {} });
    });

    it('emit cancel', () => {
      expect(wrapper.emitted('cancel')).toBeTruthy();
    });
  });

  describe('when drop handler but disabled', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setProps({ disabled: true });
      wrapper.vm.drop({ e: {} });
    });

    it('does not emit end', () => {
      expect(wrapper.emitted('end')).toBeFalsy();
    });
  });
});
