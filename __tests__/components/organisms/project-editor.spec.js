import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import ProjectEditor from '@/components/organisms/project-editor';
import ProjectList from '@/components/organisms/project-list';

describe('ProjectEditor', () => {
  let wrapper;

  const $store = new Store({});
  const factory = () =>
    shallowMount(ProjectEditor, {
      mocks: { $store }
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
        color: '#ff0'
      });
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatch projects/updateProject', () => {
      expect($store.dispatch).toHaveBeenCalledWith('projects/updateProject', {
        id: 1,
        name: 'Development',
        color: '#ff0'
      });
    });

    it('emit pop', () => {
      expect(wrapper.emitted('pop')[0][0]).toEqual({ component: ProjectList });
    });
  });

  describe('when submit and id is undefined', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(true);
      wrapper = factory();
      wrapper.setData({
        name: 'Development',
        color: '#ff0'
      });
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatch projects/addProject', () => {
      expect($store.dispatch).toHaveBeenCalledWith('projects/addProject', {
        name: 'Development',
        color: '#ff0'
      });
    });

    it('emit pop', () => {
      expect(wrapper.emitted('pop')[0][0]).toEqual({
        component: ProjectList
      });
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
        color: '#ff0'
      });
      wrapper.find('.delete-button').vm.$emit('click');
    });

    it('dispatch projects/deleteProject', () => {
      expect($store.dispatch).toHaveBeenCalledWith('projects/deleteProject', 1);
    });

    it('emit pop', () => {
      expect(wrapper.emitted('pop')[0][0]).toEqual({ component: ProjectList });
    });
  });

  describe('when click delete-button but confirm is false', () => {
    beforeEach(() => {
      global.confirm = () => false;
      wrapper = factory();
      wrapper.setData({
        id: 1,
        name: 'Development',
        color: '#ff0'
      });
      wrapper.find('.delete-button').vm.$emit('click');
    });

    it('does not dispatch projects/deleteProject', () => {
      expect($store.dispatch).not.toHaveBeenCalled();
    });
  });
});
