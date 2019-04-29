import MockDate from 'mockdate';
import { Store } from 'vuex-mock-store';
import Factory from '@/__tests__/__setups__/factory';
import Activity from '@/components/organisms/activity';

describe('Activity', () => {
  let factory;
  let wrapper;

  MockDate.set('2019-01-31T01:23:45');

  const $store = new Store({});

  beforeEach(() => {
    $store.reset();
    factory = new Factory(Activity, {
      stubs: {
        swipeMenu: {
          template: '<div><slot /></div>',
          methods: {
            resetWithAnimation: jest.fn()
          }
        }
      },
      propsData: {
        id: 1,
        description: 'Review',
        startedAt: '2019-01-01T01:23:45'
      },
      mocks: {
        $store
      }
    });
  });

  it('render correctly', () => {
    expect(factory.shallow().element).toMatchSnapshot();
  });

  describe('when click stop button', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find('.stop-button').vm.$emit('click');
    });

    it('dispatch activities/updateActivity', () => {
      expect($store.dispatch).toHaveBeenCalledWith(
        'activities/updateActivity',
        {
          id: 1,
          stoppedAt: `${new Date()}`
        }
      );
    });
  });

  describe('when swipe right', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find({ ref: 'menu' }).vm.$emit('swipe-right');
    });

    it('dispatch activities/updateActivity', () => {
      expect($store.dispatch).toHaveBeenCalledWith(
        'activities/updateActivity',
        {
          id: 1,
          stoppedAt: `${new Date()}`
        }
      );
    });
  });

  describe('when swipe left and confirm is true', () => {
    beforeEach(() => {
      global.confirm = () => true;
      wrapper = factory.shallow();
      wrapper.find({ ref: 'menu' }).vm.$emit('swipe-left');
    });

    it('dispatch activities/deleteActivity', () => {
      expect($store.dispatch).toHaveBeenCalledWith(
        'activities/deleteActivity',
        1
      );
    });
  });

  describe('when swipe left and confirm is false', () => {
    beforeEach(() => {
      global.confirm = () => false;
      wrapper = factory.shallow();
      wrapper.find({ ref: 'menu' }).vm.$emit('swipe-left');
    });

    it('does not dispatch activities/deleteActivity', () => {
      expect($store.dispatch).not.toHaveBeenCalled();
    });

    it('call resetWithAnimation', () => {
      expect(
        factory.options.stubs.swipeMenu.methods.resetWithAnimation
      ).toHaveBeenCalled();
    });
  });

  describe('when click content', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find('.activity-content').trigger('click');
    });

    it('show modal', () => {
      expect(factory.options.mocks.$modal.show).toHaveBeenCalledWith(
        'activity',
        {
          id: 1,
          description: 'Review',
          duration: 0,
          startedAt: '2019-01-01T01:23:45'
        }
      );
    });
  });
});
