import { Store } from 'vuex-mock-store';
import Factory from '@/__tests__/__setups__/factory';
import Index from '@/pages/password-reset/index';

describe('Index', () => {
  let factory;
  let wrapper;

  const $store = new Store({});

  beforeEach(() => {
    $store.reset();
    factory = new Factory(Index, {
      mocks: {
        $store
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
        email: 'example@example.com'
      });
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatch auth/sendPasswordResetEmail', () => {
      expect($store.dispatch).toHaveBeenCalledWith(
        'auth/sendPasswordResetEmail',
        {
          email: 'example@example.com',
          redirectUrl: 'http://localhost/en/password-reset/edit'
        }
      );
    });

    it('show success toast', () => {
      expect(factory.options.mocks.$toast.success).toHaveBeenCalled();
    });
  });

  describe('when submit but failed', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(false);
      wrapper = factory.shallow();
      wrapper.find('form').trigger('submit.prevent');
    });

    it('does show success toast', () => {
      expect(factory.options.mocks.$toast.success).not.toHaveBeenCalled();
    });
  });
});
