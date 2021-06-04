import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Applications from '~/pages/settings/applications';
import testId from '~/__tests__/__helpers__/test-id';

describe('Applications', () => {
  let wrapper;

  const $ga = { event: jest.fn() };
  const $mixpanel = { track: jest.fn() };
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
          ownerType: null,
        },
      ],
    },
  });

  const factory = () =>
    shallowMount(Applications, {
      mocks: {
        $ga,
        $mixpanel,
        $store,
      },
    });

  beforeEach(() => {
    $store.reset();
  });

  it('dispatches applications/fetch', () => {
    factory();
    expect($store.dispatch).toHaveBeenCalledWith('applications/fetch');
  });

  describe('when click delete-button', () => {
    beforeEach(() => {
      global.confirm = () => true;
      wrapper = factory();
      wrapper.findAll(testId('delete-button')).at(0).vm.$emit('click');
    });

    it('dispatches applications/delete', () => {
      expect($store.dispatch).toHaveBeenCalledWith('applications/delete', 1);
    });

    it('sends mixpanel event', () => {
      expect($mixpanel.track).toHaveBeenCalledWith('Delete application', {
        component: 'applications',
      });
    });

    it('sends ga event', () => {
      expect($ga.event).toHaveBeenCalledWith({
        eventCategory: 'Applications',
        eventAction: 'delete',
      });
    });
  });

  describe('when click delete-button but confirm is false', () => {
    beforeEach(() => {
      global.confirm = () => false;
      wrapper = factory();
      wrapper.findAll(testId('delete-button')).at(0).vm.$emit('click');
    });

    it('does not dispatch', () => {
      expect($store.dispatch).not.toHaveBeenCalledWith(
        'applications/delete',
        1
      );
    });

    it('does not send mixpanel event', () => {
      expect($mixpanel.track).not.toHaveBeenCalled();
    });

    it('does not send ga event', () => {
      expect($ga.event).not.toHaveBeenCalledWith();
    });
  });
});
