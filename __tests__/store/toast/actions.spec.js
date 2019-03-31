import { actions } from '@/store/toast';
import snakecaseKeys from 'snakecase-keys';

describe('Actions', () => {
  beforeEach(() => {
    actions.app = {
      $toast: {
        success: jest.fn(),
        error: jest.fn()
      }
    };
  });

  describe('when dispatch success', () => {
    beforeEach(async () => {
      actions.success({}, 'message');
    });

    it('show toast', () => {
      expect(actions.app.$toast.success).toHaveBeenCalledWith('message');
    });
  });

  describe('when error has message in error_description', () => {
    beforeEach(async () => {
      actions.error(
        {},
        snakecaseKeys({
          response: {
            data: {
              errorDescription: 'message'
            }
          }
        })
      );
    });

    it('show message', () => {
      expect(actions.app.$toast.error).toHaveBeenCalledWith('message');
    });
  });

  describe('when error has message in data.message', () => {
    beforeEach(async () => {
      actions.error(
        {},
        snakecaseKeys({
          response: {
            data: {
              message: 'message'
            }
          }
        })
      );
    });

    it('show message', () => {
      expect(actions.app.$toast.error).toHaveBeenCalledWith('message');
    });
  });

  describe('when error has message', () => {
    beforeEach(async () => {
      actions.error({}, snakecaseKeys({ message: 'message' }));
    });

    it('show message', () => {
      expect(actions.app.$toast.error).toHaveBeenCalledWith('message');
    });
  });

  describe('when error does not have message', () => {
    beforeEach(async () => {
      actions.error(undefined);
    });

    it('does not show toast', () => {
      expect(actions.app.$toast.error).not.toHaveBeenCalled();
    });
  });
});
