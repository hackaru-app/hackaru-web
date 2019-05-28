import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Applications from '@/pages/settings/applications';

describe('Applications', () => {
  let wrapper;

  const $store = new Store({
    getters: {
      'applications/all': [
        {
          id: 1,
          name: 'Hackaru for Desktop',
          uid: 2,
          redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
          scopes: ['projects:read'],
          confidential: true,
          createdAt: '2019-01-22T07:06:53.159Z',
          updatedAt: '2019-01-22T07:06:53.159Z',
          ownerId: null,
          ownerType: null
        }
      ]
    }
  });

  const $modal = { show: jest.fn() };
  const factory = () =>
    shallowMount(Applications, {
      mocks: { $store, $modal }
    });

  beforeEach(() => {
    $store.reset();
  });

  it('dispatch applications/fetch', () => {
    factory();
    expect($store.dispatch).toHaveBeenCalledWith('applications/fetch');
  });

  describe('when click delete-button', () => {
    beforeEach(() => {
      global.confirm = () => true;
      wrapper = factory();
      wrapper
        .findAll('.delete-button')
        .at(0)
        .vm.$emit('click');
    });

    it('dispatch applications/delete', () => {
      expect($store.dispatch).toHaveBeenCalledWith('applications/delete', 1);
    });
  });

  describe('when click delete-button but confirm is false', () => {
    beforeEach(() => {
      global.confirm = () => false;
      wrapper = factory();
      wrapper
        .findAll('.delete-button')
        .at(0)
        .vm.$emit('click');
    });

    it('does not dispatch', () => {
      expect($store.dispatch).not.toHaveBeenCalledWith(
        'applications/delete',
        1
      );
    });
  });

  describe('when click application', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper
        .findAll('.application h1')
        .at(0)
        .trigger('click');
    });

    it('show modal', () => {
      expect($modal.show).toHaveBeenCalledWith('application');
    });
  });
});
