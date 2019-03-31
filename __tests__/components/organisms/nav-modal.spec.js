import Factory from '@/__tests__/__setups__/factory';
import NavModal from '@/components/organisms/nav-modal';

describe('NavModal', () => {
  let factory;
  let wrapper;

  const initialComponent = { render: () => '<p>Content</p>' };
  const nextComponent = { render: () => '<p>Moved!</p>' };

  beforeEach(() => {
    factory = new Factory(NavModal, {
      propsData: {
        name: 'example',
        initialComponent,
        keepAlives: []
      }
    });
  });

  it('render correctly', () => {
    expect(factory.shallow().element).toMatchSnapshot();
  });

  describe('when emit before-open', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper
        .find({ ref: 'modal' })
        .vm.$emit('before-open', { params: { foo: 'bar' } });
    });

    it('set current component', () => {
      expect(wrapper.vm.current).toEqual(initialComponent);
    });

    it('reset animations', () => {
      expect(wrapper.vm.animation).toEqual({
        enter: '',
        leave: ''
      });
    });

    it('set params', () => {
      expect(wrapper.vm.params).toEqual({
        foo: 'bar'
      });
    });
  });

  describe('when emit before-open and params is empty', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find({ ref: 'modal' }).vm.$emit('before-open', {});
    });

    it('reset params', () => {
      expect(wrapper.vm.params).toEqual({});
    });
  });

  describe('when emit push', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ current: initialComponent });
      wrapper.find({ ref: 'current' }).vm.$emit('push', {
        component: nextComponent,
        params: { foo: 'bar' }
      });
    });

    it('set current component', () => {
      expect(wrapper.vm.current).toEqual(nextComponent);
    });

    it('set animations', () => {
      expect(wrapper.vm.animation).toEqual({
        enter: 'fadeInRight',
        leave: 'fadeOutLeft'
      });
    });

    it('set params', () => {
      expect(wrapper.vm.params).toEqual({
        foo: 'bar'
      });
    });
  });

  describe('when emit push and params is empty', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ current: initialComponent });
      wrapper.find({ ref: 'current' }).vm.$emit('push', {
        component: nextComponent
      });
    });

    it('reset params', () => {
      expect(wrapper.vm.params).toEqual({});
    });
  });

  describe('when emit pop', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ current: initialComponent });
      wrapper.find({ ref: 'current' }).vm.$emit('pop', {
        component: nextComponent,
        params: { foo: 'bar' }
      });
    });

    it('set current component', () => {
      expect(wrapper.vm.current).toEqual(nextComponent);
    });

    it('set animations', () => {
      expect(wrapper.vm.animation).toEqual({
        enter: 'fadeInLeft',
        leave: 'fadeOutRight'
      });
    });

    it('set params', () => {
      expect(wrapper.vm.params).toEqual({
        foo: 'bar'
      });
    });
  });

  describe('when emit pop and params is empty', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ current: initialComponent });
      wrapper.find({ ref: 'current' }).vm.$emit('pop', {
        component: nextComponent
      });
    });

    it('reset params', () => {
      expect(wrapper.vm.params).toEqual({});
    });
  });
});
