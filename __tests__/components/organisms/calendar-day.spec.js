import { Store } from 'vuex-mock-store';
import Factory from '@/__tests__/__setups__/factory';
import dragdrop from '@/plugins/directives/v-dragdrop';
import CalendarDay from '@/components/organisms/calendar-day';

const $store = new Store({
  getters: {
    'activities/getCalendar': () => [
      [
        {
          id: 1,
          description: 'Create a database.',
          startedAt: '2019-01-01T01:00:00',
          stoppedAt: '2019-01-01T02:00:00',
          duration: 3600,
          project: {
            id: 2,
            name: 'Development',
            color: '#ff0'
          }
        },
        {
          id: 2,
          description: '',
          startedAt: '2019-01-01T01:30:00',
          stoppedAt: '2019-01-01T02:30:00',
          duration: 3600,
          project: null
        }
      ],
      [
        {
          id: 3,
          description: 'Create a test.',
          startedAt: '2019-01-01T01:00:00',
          stoppedAt: '2019-01-01T02:00:00',
          duration: 3600,
          project: {
            id: 2,
            name: 'Development',
            color: '#ff0'
          }
        }
      ]
    ]
  }
});

describe('CalendarDay', () => {
  let wrapper;
  let factory;

  beforeEach(() => {
    $store.reset();
    factory = new Factory(CalendarDay, {
      provide: {
        pxPerMin: 40 / 60
      },
      stubs: {
        'calendar-ghost-activity': {
          render: () => {},
          methods: {
            drag: jest.fn(),
            dragging: jest.fn(),
            drop: jest.fn()
          }
        }
      },
      mocks: { $store },
      propsData: {
        day: '2019-01-01',
        updateGuideLine: jest.fn(),
        getOverlapDay: () => {}
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
      wrapper.vm.ghostDrag();
    });

    it('emit ghost-drag', () => {
      expect(wrapper.emitted()['ghost-drag']).toBeTruthy();
    });

    it('call drag method', () => {
      expect(
        factory.options.stubs['calendar-ghost-activity'].methods.drag
      ).toHaveBeenCalled();
    });
  });

  describe('when dragging', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.vm.ghostDragging();
    });

    it('emit ghost-dragging', () => {
      expect(wrapper.emitted()['ghost-dragging']).toBeTruthy();
    });

    it('call dragging method', () => {
      expect(
        factory.options.stubs['calendar-ghost-activity'].methods.dragging
      ).toHaveBeenCalled();
    });
  });

  describe('when drop', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.vm.ghostDrop();
    });

    it('emit ghost-drop', () => {
      expect(wrapper.emitted()['ghost-drop']).toBeTruthy();
    });

    it('call drop method', () => {
      expect(
        factory.options.stubs['calendar-ghost-activity'].methods.drop
      ).toHaveBeenCalled();
    });
  });
});
