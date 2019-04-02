import { Store } from 'vuex-mock-store';
import Factory from '@/__tests__/__setups__/factory';
import dragdrop from '@/plugins/directives/v-dragdrop';
import CalendarGhostActivity from '@/components/organisms/calendar-ghost-activity';
import { parse } from 'date-fns';

describe('CalendarGhostActivity', () => {
  let factory;
  let wrapper;

  const $store = new Store({});

  beforeEach(() => {
    factory = new Factory(CalendarGhostActivity, {
      provide: {
        pxPerMin: 40 / 60
      },
      stubs: {
        resizer: {
          render: () => {},
          methods: {
            drag: jest.fn(),
            dragging: jest.fn(),
            drop: jest.fn()
          }
        }
      },
      mocks: {
        $store,
        $mezr: {
          offset: () => ({
            top: 100
          })
        }
      },
      propsData: {
        day: '2019-01-01',
        updateGuideLine: jest.fn()
      }
    });
    factory.options.localVue.directive('dragdrop', dragdrop);
  });

  it('render correctly', () => {
    expect(factory.shallow().element).toMatchSnapshot();
  });

  describe('when call drag with mouse', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ height: 50 });
      wrapper.vm.drag({ e: { pageY: 100 } });
    });

    it('show guide line', () => {
      expect(factory.options.propsData.updateGuideLine).toHaveBeenCalledWith(
        100 - 100 + 50, // pageY - offset.top + height
        wrapper.element
      );
    });
  });

  describe('when call drag with touch', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ height: 50 });
      wrapper.vm.drag({ e: { touches: [{ pageY: 100 }] } });
    });

    it('show guide line', () => {
      expect(factory.options.propsData.updateGuideLine).toHaveBeenCalledWith(
        100 - 100 + 50,
        wrapper.element
      );
    });

    it('call drag method', () => {
      expect(factory.options.stubs.resizer.methods.drag).toHaveBeenCalled();
    });
  });

  describe('when call dragging', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ top: 100, height: 50 });
      wrapper.vm.dragging();
    });

    it('show guide line', () => {
      expect(factory.options.propsData.updateGuideLine).toHaveBeenCalledWith(
        100 + 50, // top + height
        wrapper.element
      );
    });

    it('call dragging method', () => {
      expect(factory.options.stubs.resizer.methods.dragging).toHaveBeenCalled();
    });
  });

  describe('when call drop', () => {
    beforeEach(async () => {
      wrapper = factory.shallow();
      wrapper.setData({
        top: 120, // 120px = 180min
        height: 60 // 60px = 90min
      });
      await wrapper.vm.drop();
    });

    it('dispatch activities/addActivity', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/addActivity', {
        startedAt: parse('2019-01-01T03:00:00'), // + 180min
        stoppedAt: parse('2019-01-01T04:30:00') // + 180min + 90min
      });
    });

    it('send ga event', () => {
      expect(factory.options.mocks.$ga.event).toHaveBeenCalledWith(
        'activity',
        'addActivity'
      );
    });

    it('hide guide line', () => {
      expect(factory.options.propsData.updateGuideLine).toHaveBeenCalledWith();
    });

    it('call drop method', () => {
      expect(factory.options.stubs.resizer.methods.drop).toHaveBeenCalled();
    });
  });
});
