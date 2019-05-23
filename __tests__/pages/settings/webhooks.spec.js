import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Webhooks from '@/pages/settings/webhooks';

describe('Webhooks', () => {
  let wrapper;

  const $store = new Store({
    getters: {
      'webhooks/getWebhooks': [
        {
          id: 1,
          userId: 1,
          targetUrl: 'http://www.example.com',
          event: 'activity:updated',
          createdAt: '2019-02-06T10:23:24.199Z',
          updatedAt: '2019-02-06T10:23:24.199Z'
        }
      ]
    }
  });

  const $modal = {
    show: jest.fn(),
    hide: jest.fn()
  };

  const factory = () =>
    shallowMount(Webhooks, {
      mocks: { $store, $modal }
    });

  beforeEach(() => {
    $store.reset();
  });

  it('dispatch webhooks/getWebhooks', () => {
    factory();
    expect($store.dispatch).toHaveBeenCalledWith('webhooks/getWebhooks');
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

    it('dispatch webhooks/deleteWebhook', () => {
      expect($store.dispatch).toHaveBeenCalledWith('webhooks/deleteWebhook', 1);
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

    it('does not dispatch webhooks/deleteWebhook', () => {
      expect($store.dispatch).not.toHaveBeenCalledWith(
        'webhooks/deleteWebhook',
        1
      );
    });
  });

  describe('when click add-button', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.add-button').vm.$emit('click');
    });

    it('show modal', () => {
      expect($modal.show).toHaveBeenCalledWith('webhook');
    });
  });

  describe('when submit form', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(true);
      wrapper = factory();
      wrapper
        .find('.event-select')
        .findAll('option')
        .at(0)
        .setSelected();
      wrapper.find('.target-url').setValue('http://example.com');
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatch webhooks/addWebhook', () => {
      expect($store.dispatch).toHaveBeenCalledWith('webhooks/addWebhook', {
        event: 'activity:created',
        targetUrl: 'http://example.com'
      });
    });

    it('hide modal', () => {
      expect($modal.hide).toHaveBeenCalledWith('webhook');
    });
  });
});
