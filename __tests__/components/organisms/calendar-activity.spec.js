import { Store } from 'vuex-mock-store';
import Factory from '@/__tests__/__setups__/factory';
import { parse } from 'date-fns';
import dragdrop from '@/plugins/directives/v-dragdrop';
import CalendarActivity from '@/components/organisms/calendar-activity';

describe('CalendarActivity', () => {
  let factory;
  let wrapper;

  const $store = new Store({});
  const pxPerMin = 40 / 60;

  beforeEach(() => {
    $store.reset();
    factory = new Factory(CalendarActivity, {
      provide: {
        pxPerMin
      },
      mocks: { $store },
      propsData: {
        id: 1,
        description: 'Create a database.',
        startedAt: '2019-01-01T01:23:45',
        stoppedAt: '2019-01-01T02:23:45',
        duration: 3600,
        day: '2019-01-01',
        getOverlapDay: () => {},
        updateGuideLine: jest.fn()
      }
    });
    factory.options.localVue.directive('dragdrop', dragdrop);
  });

  it('render correctly', () => {
    expect(factory.shallow().element).toMatchSnapshot();
  });

  it('has top correctly', () => {
    const min = 60 + 23; // 01:23
    expect(factory.shallow().vm.top).toBe(min * pxPerMin);
  });

  describe('when project is defined', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setProps({
        project: {
          id: 1,
          name: 'Development',
          color: '#ff0'
        }
      });
    });

    it('render correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('when change startedAt', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setProps({ startedAt: '2019-01-01T02:43:00' });
    });

    it('update top', () => {
      const min = 60 * 2 + 43; // 02:43
      expect(wrapper.vm.top).toBe(min * pxPerMin);
    });
  });

  describe('when change duration', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setProps({ duration: 7200 });
    });

    it('update height', () => {
      const min = 7200 / 60;
      expect(wrapper.vm.height).toBe(min * pxPerMin);
    });
  });

  describe('when drag start', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ top: 50 });
      wrapper.find({ ref: 'dragger' }).vm.$emit('start');
    });

    it('set dragging', () => {
      expect(wrapper.vm.dragging).toBe(true);
    });

    it('update guide line', () => {
      expect(wrapper.vm.updateGuideLine).toHaveBeenCalledWith(
        50,
        wrapper.element
      );
    });
  });

  describe('when moving', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ top: 50 });
      wrapper.find({ ref: 'dragger' }).vm.$emit('moving');
    });

    it('update guide line', () => {
      expect(wrapper.vm.updateGuideLine).toHaveBeenCalledWith(
        50,
        wrapper.element
      );
    });
  });

  describe('when move end', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ top: 40 }); // 40px = 60min
      wrapper.setProps({
        duration: 7200, // 120min
        getOverlapDay: () => parse('2019-01-02T00:00:00') // new day
      });
      wrapper.find({ ref: 'dragger' }).vm.$emit('end');
    });

    it('hide guide line', () => {
      expect(wrapper.vm.updateGuideLine).toHaveBeenCalledWith();
    });

    it('dispatch activities/updateActivity', () => {
      expect($store.dispatch).toHaveBeenCalledWith(
        'activities/updateActivity',
        {
          id: 1,
          startedAt: parse('2019-01-02T01:23:00'), // + 60min
          stoppedAt: parse('2019-01-02T03:23:00') // + 120min
        }
      );
    });

    it('send ga event', () => {
      expect(factory.options.mocks.$ga.event).toHaveBeenCalledWith(
        'activity',
        'updateActivity'
      );
    });
  });

  describe('when move end but getOverlapDay is undefined', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setProps({
        duration: 3600,
        getOverlapDay: () => undefined
      });
      wrapper.find({ ref: 'dragger' }).vm.$emit('end');
    });

    it('hide guide line', () => {
      expect(wrapper.vm.updateGuideLine).toHaveBeenCalledWith();
    });

    it('reset position', () => {
      expect(wrapper.vm.left).toBe(0);
      expect(wrapper.vm.top).toBe((60 + 23) * pxPerMin);
      expect(wrapper.vm.height).toBe(40);
    });

    it('does not dispatch activities/updateActivity', () => {
      expect($store.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('when move cancel', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find({ ref: 'dragger' }).vm.$emit('cancel');
    });

    it('hide guide line', () => {
      expect(wrapper.vm.updateGuideLine).toHaveBeenCalledWith();
    });
  });

  describe('when resizing', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ top: 30, height: 30 });
      wrapper.find({ ref: 'resizer' }).vm.$emit('resizing');
    });

    it('set resizeMoved', () => {
      expect(wrapper.vm.resizeMoved).toBe(true);
    });

    it('update guide line', () => {
      expect(wrapper.vm.updateGuideLine).toHaveBeenCalledWith(
        60, // bottom (top + height)
        wrapper.element
      );
    });
  });

  describe('when resize end', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.setData({ height: 40 }); // 40px = 60min
      wrapper.find({ ref: 'resizer' }).vm.$emit('end');
    });

    it('hide guide line', () => {
      expect(wrapper.vm.updateGuideLine).toHaveBeenCalledWith();
    });

    it('dispatch activities/updateActivity', () => {
      expect($store.dispatch).toHaveBeenCalledWith(
        'activities/updateActivity',
        {
          id: 1,
          stoppedAt: parse('2019-01-01T02:23:45')
        }
      );
    });
  });

  describe('when resize cancel', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find({ ref: 'resizer' }).vm.$emit('cancel');
    });

    it('hide guide line', () => {
      expect(wrapper.vm.updateGuideLine).toHaveBeenCalledWith();
    });

    it('does not dispatch activities/updateActivity', () => {
      expect($store.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('when mousedown', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find('div').trigger('mousedown');
    });

    it('reset resizeMoved', () => {
      expect(wrapper.vm.resizeMoved).toBeFalsy();
    });

    it('reset dragging', () => {
      expect(wrapper.vm.dragging).toBeFalsy();
    });
  });

  describe('when mouseup', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find('div').trigger('mouseup');
    });

    it('show modal', () => {
      expect(factory.options.mocks.$modal.show).toHaveBeenCalledWith(
        'activity',
        {
          id: 1,
          description: 'Create a database.',
          startedAt: '2019-01-01T01:23:45',
          stoppedAt: '2019-01-01T02:23:45'
        }
      );
    });

    it('reset resizeMoved', () => {
      expect(wrapper.vm.resizeMoved).toBeFalsy();
    });

    it('reset dragging', () => {
      expect(wrapper.vm.dragging).toBeFalsy();
    });
  });

  describe('when mouseup but moved', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find({ ref: 'dragger' }).vm.$emit('start');
      wrapper.find({ ref: 'dragger' }).vm.$emit('moving');
      wrapper.find({ ref: 'dragger' }).vm.$emit('end');
      wrapper.find('div').trigger('mouseup');
    });

    it('does not show modal', () => {
      expect(factory.options.mocks.$modal.show).not.toHaveBeenCalled();
    });
  });

  describe('when mouseup but resized', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find({ ref: 'resizer' }).vm.$emit('resizing');
      wrapper.find({ ref: 'resizer' }).vm.$emit('end');
      wrapper.find('div').trigger('mouseup');
    });

    it('does not show modal', () => {
      expect(factory.options.mocks.$modal.show).not.toHaveBeenCalled();
    });
  });
});
