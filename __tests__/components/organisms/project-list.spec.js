import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import ProjectList from '@/components/organisms/project-list';
import ProjectEditor from '@/components/organisms/project-editor';

const testId = (id) => `[data-test-id="${id}"]`;

describe('ProjectList', () => {
  let wrapper;

  const $store = new Store({
    getters: {
      'projects/all': [
        {
          id: 1,
          name: 'Development',
          color: '#ff0',
        },
        {
          id: 2,
          name: 'Review',
          color: '#f00',
        },
      ],
    },
  });

  const factory = () =>
    shallowMount(ProjectList, {
      mocks: { $store },
    });

  beforeEach(() => {
    $store.reset();
  });

  describe('when click left-arrow-button', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({ popEnabled: true });
      wrapper.find(testId('left-arrow-button')).vm.$emit('click');
    });

    it('emits pop', () => {
      expect(wrapper.emitted('pop')).toBeTruthy();
    });
  });

  describe('when click add-button', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find(testId('add-button')).vm.$emit('click');
    });

    it('emits push', () => {
      expect(wrapper.emitted('push')[0][0]).toEqual({
        component: ProjectEditor,
      });
    });
  });

  describe('when click edit-button', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.findAll(testId('edit-button')).at(1).vm.$emit('click');
    });

    it('emits push', () => {
      expect(wrapper.emitted('push')[0][0]).toEqual({
        component: ProjectEditor,
        params: {
          id: 2,
          name: 'Review',
          color: '#f00',
        },
      });
    });
  });

  describe('when click project-content', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.findAll(testId('project-content')).at(2).trigger('click');
    });

    it('emits pop', () => {
      expect(wrapper.emitted('pop')[0][0]).toEqual({
        project: {
          id: 2,
          name: 'Review',
          color: '#f00',
        },
      });
    });
  });
});
