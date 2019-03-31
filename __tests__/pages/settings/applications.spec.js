import { Store } from 'vuex-mock-store';
import Factory from '@/__tests__/__setups__/factory';
import Applications from '@/pages/settings/applications';

describe('Applications', () => {
  let factory;
  let wrapper;

  const $store = new Store({
    getters: {
      'applications/getApplications': [
        {
          id: 1,
          name: 'Example1',
          uid: 'uid',
          redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
          scopes: ['projects:read', 'projects:write'],
          confidential: true,
          createdAt: '2019-01-22T07:06:53.159Z',
          updatedAt: '2019-01-22T07:06:53.159Z',
          ownerId: null,
          ownerType: null
        },
        {
          id: 2,
          name: 'Example2',
          uid: 'uid',
          redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
          scopes: ['activities:read', 'activities:write'],
          confidential: true,
          createdAt: '2019-01-22T07:06:53.159Z',
          updatedAt: '2019-01-22T07:06:53.159Z',
          ownerId: null,
          ownerType: null
        }
      ]
    }
  });

  beforeEach(() => {
    $store.reset();
    factory = new Factory(Applications, {
      mocks: { $store }
    });
  });

  it('render correctly', () => {
    expect(factory.shallow().element).toMatchSnapshot();
  });

  it('dispatch applications/getApplications', () => {
    factory.shallow();
    expect($store.dispatch).toHaveBeenCalledWith(
      'applications/getApplications'
    );
  });

  describe('when click delete button and confirm is true', () => {
    beforeEach(() => {
      global.confirm = () => true;
      wrapper = factory.shallow();
      wrapper
        .findAll('.delete-button')
        .at(1)
        .vm.$emit('click');
    });

    it('dispatch applications/deleteApplication', () => {
      expect($store.dispatch).toHaveBeenCalledWith(
        'applications/deleteApplication',
        2
      );
    });

    it('send ga event', () => {
      expect(factory.options.mocks.$ga.event).toHaveBeenCalledWith(
        'oauth',
        'deleteApplication'
      );
    });
  });

  describe('when click delete button and confirm is false', () => {
    beforeEach(() => {
      global.confirm = () => false;
      wrapper = factory.shallow();
      wrapper
        .findAll('.delete-button')
        .at(1)
        .vm.$emit('click');
    });

    it('does not dispatch applications/deleteApplication', () => {
      expect($store.dispatch).not.toHaveBeenCalledWith(
        'applications/deleteApplication',
        2
      );
    });
  });

  describe('when click list item', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper
        .findAll('.list-item > h1')
        .at(1)
        .trigger('click');
    });

    it('render modal correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('show modal', () => {
      expect(factory.options.mocks.$modal.show).toHaveBeenCalledWith(
        'application'
      );
    });
  });
});
