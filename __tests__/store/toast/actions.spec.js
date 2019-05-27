import { actions } from '@/store/toast';

describe('Actions', () => {
  actions.app = {
    $toast: {
      success: jest.fn(),
      error: jest.fn()
    }
  };

  describe('when dispatch success', () => {
    beforeEach(() => {
      actions.success({}, 'message');
    });

    it('show toast', () => {
      expect(actions.app.$toast.success).toHaveBeenCalledWith('message');
    });
  });

  describe('when error has message in error_description', () => {
    beforeEach(() => {
      actions.error(
        {},
        {
          response: {
            data: {
              error_description: 'message'
            }
          }
        }
      );
    });

    it('show response.data.error-description', () => {
      expect(actions.app.$toast.error).toHaveBeenCalledWith('message');
    });
  });

  describe('when error has message in data.message', () => {
    beforeEach(() => {
      actions.error(
        {},
        {
          response: {
            data: {
              message: 'message'
            }
          }
        }
      );
    });

    it('show response.data.message', () => {
      expect(actions.app.$toast.error).toHaveBeenCalledWith('message');
    });
  });

  describe('when error has message', () => {
    beforeEach(() => {
      actions.error({}, { message: 'message' });
    });

    it('show message', () => {
      expect(actions.app.$toast.error).toHaveBeenCalledWith('message');
    });
  });

  describe('when error does not have message', () => {
    beforeEach(() => {
      actions.error(undefined);
    });

    it('does not show toast', () => {
      expect(actions.app.$toast.error).not.toHaveBeenCalled();
    });
  });
});
