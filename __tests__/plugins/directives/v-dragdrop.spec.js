import Factory from '@/__tests__/__setups__/factory';
import dragdrop from '@/plugins/directives/v-dragdrop';

describe('VDragDrop', () => {
  let factory;
  let wrapper;
  let data;

  function createEvent(name, props = {}) {
    const e = new CustomEvent(name);
    Object.keys(props).forEach(key => {
      e[key] = props[key];
    });
    return e;
  }

  beforeEach(() => {
    jest.useFakeTimers();
    data = {
      dragdrop: {
        drag: jest.fn(),
        dragging: jest.fn(),
        drop: jest.fn()
      }
    };
    factory = new Factory({
      template: '<div v-dragdrop="dragdrop" />',
      directives: { 'v-dragdrop': dragdrop },
      data: () => data
    });
  });

  describe('when mousedown', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.element.dispatchEvent(
        createEvent('mousedown', {
          pageX: 100,
          pageY: 100
        })
      );
      jest.runOnlyPendingTimers();
    });

    it('call drag', () => {
      expect(data.dragdrop.drag).toHaveBeenCalledWith({
        distance: { x: 0, y: 0 },
        e: expect.any(CustomEvent)
      });
    });
  });

  describe('when mousedown but does not have callback', () => {
    beforeEach(() => {
      data.dragdrop = {};
    });

    it('does not throw error', () => {
      wrapper = factory.shallow();
      wrapper.element.dispatchEvent(
        createEvent('mousedown', {
          pageX: 100,
          pageY: 100
        })
      );
    });
  });

  describe('when mousedown and mousemove', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.element.dispatchEvent(
        createEvent('mousedown', {
          pageX: 100,
          pageY: 100
        })
      );
      jest.runOnlyPendingTimers();
      window.dispatchEvent(
        createEvent('mousemove', {
          pageX: 50,
          pageY: 50
        })
      );
    });

    it('call dragging', () => {
      expect(data.dragdrop.dragging).toHaveBeenCalledWith({
        distance: { x: 50, y: 50 },
        e: expect.any(CustomEvent)
      });
    });
  });

  describe('when mousedown and mousemove but does not have callback', () => {
    beforeEach(() => {
      data.dragdrop = {};
    });

    it('does not throw error', () => {
      wrapper = factory.shallow();
      wrapper.element.dispatchEvent(
        createEvent('mousedown', {
          pageX: 100,
          pageY: 100
        })
      );
      jest.runOnlyPendingTimers();
      window.dispatchEvent(
        createEvent('mousemove', {
          pageX: 50,
          pageY: 50
        })
      );
    });
  });

  describe('when mouse moved before waitTimer triggered', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.element.dispatchEvent(
        createEvent('mousedown', {
          pageX: 0,
          pageY: 0
        })
      );
      window.dispatchEvent(
        createEvent('mousemove', {
          pageX: 100,
          pageY: 100
        })
      );
      jest.runOnlyPendingTimers();
    });

    it('does not call drag', () => {
      expect(data.dragdrop.drag).not.toHaveBeenCalled();
    });
  });

  describe('when mouse moved before waitTimer triggered but distance too small', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.element.dispatchEvent(
        createEvent('mousedown', {
          pageX: 2,
          pageY: 1
        })
      );
      window.dispatchEvent(
        createEvent('mousemove', {
          pageX: 3,
          pageY: 2
        })
      );
      jest.runOnlyPendingTimers();
    });

    it('call drag', () => {
      expect(data.dragdrop.drag).toHaveBeenCalled();
    });
  });

  describe('when mousemove but did not trigger mousedown', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      window.dispatchEvent(createEvent('mousemove'));
    });

    it('does not call dragging', () => {
      expect(data.dragdrop.dragging).not.toHaveBeenCalled();
    });
  });

  describe('when drop', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.element.dispatchEvent(
        createEvent('mousedown', {
          pageX: 100,
          pageY: 100
        })
      );
      jest.runOnlyPendingTimers();
      window.dispatchEvent(
        createEvent('mousemove', {
          pageX: 50,
          pageY: 50
        })
      );
      window.dispatchEvent(createEvent('mouseup'));
    });

    it('call drop', () => {
      expect(data.dragdrop.drop).toHaveBeenCalledWith({
        distance: { x: 50, y: 50 },
        e: expect.any(CustomEvent)
      });
    });
  });

  describe('when drop but does not have callback', () => {
    beforeEach(() => {
      data.dragdrop = {};
    });

    it('does not throw error', () => {
      wrapper = factory.shallow();
      wrapper.element.dispatchEvent(
        createEvent('mousedown', {
          pageX: 100,
          pageY: 100
        })
      );
      jest.runOnlyPendingTimers();
      window.dispatchEvent(
        createEvent('mousemove', {
          pageX: 50,
          pageY: 50
        })
      );
      window.dispatchEvent(createEvent('mouseup'));
    });
  });

  describe('when drop but not moved', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.element.dispatchEvent(
        createEvent('mousedown', {
          pageX: 100,
          pageY: 100
        })
      );
      jest.runOnlyPendingTimers();
      window.dispatchEvent(createEvent('mouseup'));
    });

    it('call drop with zero distance', () => {
      expect(data.dragdrop.drop).toHaveBeenCalledWith({
        distance: { x: 0, y: 0 },
        e: expect.any(CustomEvent)
      });
    });
  });

  describe('when mouseup but not mousedown', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      window.dispatchEvent(createEvent('mouseup'));
    });

    it('does not call drop', () => {
      expect(data.dragdrop.drop).not.toHaveBeenCalled();
    });
  });

  describe('when touchstart', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.element.dispatchEvent(
        createEvent('touchstart', {
          touches: [{ pageX: 100, pageY: 100 }]
        })
      );
      jest.runOnlyPendingTimers();
    });

    it('call drag', () => {
      expect(data.dragdrop.drag).toHaveBeenCalledWith({
        distance: { x: 0, y: 0 },
        e: expect.any(CustomEvent)
      });
    });
  });

  describe('when touchstart and touchmove', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.element.dispatchEvent(
        createEvent('touchstart', {
          touches: [{ pageX: 100, pageY: 100 }]
        })
      );
      jest.runOnlyPendingTimers();
      window.dispatchEvent(
        createEvent('touchmove', {
          touches: [{ pageX: 50, pageY: 50 }]
        })
      );
    });

    it('call dragging', () => {
      expect(data.dragdrop.dragging).toHaveBeenCalledWith({
        distance: { x: 50, y: 50 },
        e: expect.any(CustomEvent)
      });
    });
  });
});
