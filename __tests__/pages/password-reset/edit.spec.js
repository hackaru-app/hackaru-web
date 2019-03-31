import { Store } from 'vuex-mock-store';
import Factory from '@/__tests__/__setups__/factory';
import Edit from '@/pages/password-reset/edit';
import snakecaseKeys from 'snakecase-keys';

describe('Edit', () => {
  let factory;
  let wrapper;

  const $store = new Store();

  beforeEach(() => {
    $store.reset();
    factory = new Factory(Edit, {
      mocks: {
        $store,
        $route: {
          query: snakecaseKeys({
            userId: 1,
            token: 'passwordResetToken'
          })
        }
      }
    });
  });

  it('render correctly', () => {
    expect(factory.shallow().element).toMatchSnapshot();
  });

  describe('when submit', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(true);
      wrapper = factory.shallow();
      wrapper.setData({
        password: 'password',
        passwordConfirmation: 'passwordConfirmation'
      });
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatch auth/resetPassword', () => {
      expect($store.dispatch).toHaveBeenCalledWith('auth/resetPassword', {
        id: 1,
        password: 'password',
        passwordConfirmation: 'passwordConfirmation',
        token: 'passwordResetToken'
      });
    });

    it('redirect to /auth', () => {
      expect(factory.options.mocks.$router.push).toHaveBeenCalledWith(
        '/en/auth'
      );
    });
  });

  describe('when submit but failed', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(false);
      wrapper = factory.shallow();
      wrapper.find('form').trigger('submit.prevent');
    });

    it('does not redirect to /auth', () => {
      expect(factory.options.mocks.$router.push).not.toHaveBeenCalled();
    });
  });
});
