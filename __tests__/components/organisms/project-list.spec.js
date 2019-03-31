import { Store } from 'vuex-mock-store';
import Factory from '@/__tests__/__setups__/factory';
import ProjectList from '@/components/organisms/project-list';
import ActivityEditor from '@/components/organisms/activity-editor';
import ProjectEditor from '@/components/organisms/project-editor';

describe('ProjectList', () => {
  let factory;
  let wrapper;

  const $store = new Store({
    getters: {
      'projects/getProjects': [
        {
          id: 1,
          name: 'Development',
          color: '#ff0'
        },
        {
          id: 2,
          name: 'Review',
          color: '#f00'
        }
      ]
    }
  });

  beforeEach(() => {
    $store.reset();
    factory = new Factory(ProjectList, { mocks: { $store } });
  });

  it('render correctly', () => {
    expect(factory.shallow().element).toMatchSnapshot();
  });

  describe('when click left arrow button', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find('.left-arrow-button').vm.$emit('click');
    });

    it('emit pop', () => {
      expect(wrapper.emitted('pop')[0]).toEqual([
        { component: ActivityEditor }
      ]);
    });
  });

  describe('when click add button', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper.find('.add-button').vm.$emit('click');
    });

    it('emit push', () => {
      expect(wrapper.emitted('push')[0]).toEqual([
        { component: ProjectEditor }
      ]);
    });
  });

  describe('when click edit-button', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper
        .findAll('.edit-button')
        .at(1)
        .vm.$emit('click');
    });

    it('emit push', () => {
      expect(wrapper.emitted('push')[0]).toEqual([
        {
          component: ProjectEditor,
          params: {
            id: 2,
            name: 'Review',
            color: '#f00'
          }
        }
      ]);
    });
  });

  describe('when click project-content', () => {
    beforeEach(() => {
      wrapper = factory.shallow();
      wrapper
        .findAll('.project-content')
        .at(2)
        .trigger('click');
    });

    it('emit pop', () => {
      expect(wrapper.emitted('pop')[0]).toEqual([
        {
          component: ActivityEditor,
          params: {
            project: {
              id: 2,
              name: 'Review',
              color: '#f00'
            }
          }
        }
      ]);
    });
  });
});
