import { Store } from 'vuex-mock-store';
import Factory from '@/__tests__/__setups__/factory';
import Webhooks from '@/pages/settings/webhooks';

describe('Webhooks', () => {
  let factory;
  let wrapper;

  const $store = new Store({
    getters: {
      'webhooks/getWebhooks': [
        {
          id: 1,
          userId: 1,
          targetUrl: 'http://www.example.com/1',
          event: 'activity:updated',
          createdAt: '2019-02-06T10:23:24.199Z',
          updatedAt: '2019-02-06T10:23:24.199Z'
        },
        {
          id: 2,
          userId: 1,
          targetUrl: 'http://www.example.com/2',
          event: 'activity:created',
          createdAt: '2019-02-06T10:23:24.199Z',
          updatedAt: '2019-02-06T10:23:24.199Z'
        }
      ]
    }
  });

  beforeEach(() => {
    $store.reset();
    factory = new Factory(Webhooks, {
      mocks: { $store }
    });
  });

  it('render correctly', () => {
    expect(factory.shallow().element).toMatchSnapshot();
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

    it('dispatch webhooks/deleteWebhook', () => {
      expect($store.dispatch).toHaveBeenCalledWith('webhooks/deleteWebhook', 2);
    });

    it('send ga event', () => {
      expect(factory.options.mocks.$ga.event).toHaveBeenCalledWith(
        'webhook',
        'deleteWebhook'
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

    it('does not dispatch webhooks/deleteWebhook', () => {
      expect($store.dispatch).not.toHaveBeenCalledWith(
        'webhooks/deleteWebhook',
        2
      );
    });
  });

  describe('when click add button', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find('.add-button').vm.$emit('click');
    });

    it('render modal correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('show modal', () => {
      expect(factory.options.mocks.$modal.show).toHaveBeenCalledWith('webhook');
    });
  });

  describe('when submit create webhook form', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(true);
      wrapper = factory.shallow();
      wrapper.setData({
        event: 'activity:created',
        targetUrl: 'http://example.com'
      });
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatch webhooks/addWebhook', () => {
      expect($store.dispatch).toHaveBeenCalledWith('webhooks/addWebhook', {
        event: 'activity:created',
        targetUrl: 'http://example.com'
      });
    });

    it('send ga event', () => {
      expect(factory.options.mocks.$ga.event).toHaveBeenCalledWith(
        'webhook',
        'addWebhook'
      );
    });

    it('hide modal', () => {
      expect(factory.options.mocks.$modal.hide).toHaveBeenCalledWith('webhook');
    });
  });

  describe('when submit create webhook form but failed', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(false);
      wrapper = factory.shallow();
      wrapper.find('form').trigger('submit.prevent');
    });

    it('does not hide modal', () => {
      expect(factory.options.mocks.$modal.hide).not.toHaveBeenCalled();
    });
  });
});
