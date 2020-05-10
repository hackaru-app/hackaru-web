import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import ProjectEditor from '@/components/organisms/project-editor';

describe('ProjectEditor', () => {
  let wrapper;

  const $store = new Store({});
  const factory = () =>
    shallowMount(ProjectEditor, {
      mocks: { $store },
    });

  beforeEach(() => {
    $store.reset();
  });

  describe('when submit', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(true);
      wrapper = factory();
      wrapper.setData({
        id: 1,
        name: 'Development',
        color: '#ff0',
      });
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatch projects/update', () => {
      expect($store.dispatch).toHaveBeenCalledWith('projects/update', {
        id: 1,
        name: 'Development',
        color: '#ff0',
      });
    });

    it('emit pop', () => {
      expect(wrapper.emitted('pop')).toBeTruthy();
    });
  });

  describe('when submit and id is undefined', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(true);
      wrapper = factory();
      wrapper.setData({
        name: 'Development',
        color: '#ff0',
      });
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatch projects/add', () => {
      expect($store.dispatch).toHaveBeenCalledWith('projects/add', {
        name: 'Development',
        color: '#ff0',
      });
    });

    it('emit pop', () => {
      expect(wrapper.emitted('pop')).toBeTruthy();
    });
  });

  describe('when click delete-button', () => {
    beforeEach(() => {
      global.confirm = () => true;
      $store.dispatch.mockReturnValue(true);
      wrapper = factory();
      wrapper.setData({
        id: 1,
        name: 'Development',
        color: '#ff0',
      });
      wrapper.find('.delete-button').vm.$emit('click');
    });

    it('dispatch projects/delete', () => {
      expect($store.dispatch).toHaveBeenCalledWith('projects/delete', 1);
    });

    it('emit pop', () => {
      expect(wrapper.emitted('pop')).toBeTruthy();
    });
  });

  describe('when click delete-button but confirm is false', () => {
    beforeEach(() => {
      global.confirm = () => false;
      wrapper = factory();
      wrapper.setData({
        id: 1,
        name: 'Development',
        color: '#ff0',
      });
      wrapper.find('.delete-button').vm.$emit('click');
    });

    it('does not dispatch projects/deleteProject', () => {
      expect($store.dispatch).not.toHaveBeenCalled();
    });
  });
});
