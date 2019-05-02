import { Store } from 'vuex-mock-store';
import Factory from '@/__tests__/__setups__/factory';
import ProjectEditor from '@/components/organisms/project-editor';
import ProjectList from '@/components/organisms/project-list';

describe('ProjectEditor', () => {
  let factory;
  let wrapper;

  const $store = new Store({});

  beforeEach(() => {
    $store.reset();
    factory = new Factory(ProjectEditor, {
      mocks: { $store }
    });
  });

  it('render correctly', () => {
    expect(factory.shallow().element).toMatchSnapshot();
  });

  describe('when submit and id is not defined', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(true);
      wrapper = factory.shallow();
      wrapper.setData({ name: 'Development', color: '#ff0' });
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatch projects/addProject', () => {
      expect($store.dispatch).toHaveBeenCalledWith('projects/addProject', {
        name: 'Development',
        color: '#ff0'
      });
    });

    it('send ga event', () => {
      expect(factory.options.mocks.$ga.event).toHaveBeenCalledWith(
        'project',
        'addProject'
      );
    });

    it('emit pop', () => {
      expect(wrapper.emitted('pop')[0]).toEqual([{ component: ProjectList }]);
    });
  });

  describe('when submit and id is not defined but failed', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(false);
      wrapper = factory.shallow();
      wrapper.find('form').trigger('submit.prevent');
    });

    it('does not emit pop', () => {
      expect(wrapper.emitted('pop')).toBeFalsy();
    });
  });

  describe('when submit and id is defined', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(true);
      wrapper = factory.shallow();
      wrapper.setData({ id: 1, name: 'Development', color: '#ff0' });
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatch projects/updateProject', () => {
      expect($store.dispatch).toHaveBeenCalledWith('projects/updateProject', {
        id: 1,
        name: 'Development',
        color: '#ff0'
      });
    });

    it('send ga event', () => {
      expect(factory.options.mocks.$ga.event).toHaveBeenCalledWith(
        'project',
        'updateProject'
      );
    });

    it('emit pop', () => {
      expect(wrapper.emitted('pop')[0]).toEqual([{ component: ProjectList }]);
    });
  });

  describe('when submit and id is defined but failed', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(false);
      wrapper = factory.shallow();
      wrapper.setData({ id: 1 });
      wrapper.find('form').trigger('submit.prevent');
    });

    it('does not emit pop', () => {
      expect(wrapper.emitted('pop')).toBeFalsy();
    });
  });

  describe('when click delete button and confirm is true', () => {
    beforeEach(() => {
      global.confirm = () => true;
      $store.dispatch.mockReturnValue(true);
      wrapper = factory.shallow();
      wrapper.setData({ id: 1, name: 'Development', color: '#ff0' });
      wrapper.find('.delete-button').vm.$emit('click');
    });

    it('dispatch projects/deleteProject', () => {
      expect($store.dispatch).toHaveBeenCalledWith('projects/deleteProject', 1);
    });

    it('send ga event', () => {
      expect(factory.options.mocks.$ga.event).toHaveBeenCalledWith(
        'project',
        'deleteProject'
      );
    });

    it('emit pop', () => {
      expect(wrapper.emitted('pop')[0]).toEqual([{ component: ProjectList }]);
    });
  });

  describe('when click delete button and confirm is false', () => {
    beforeEach(() => {
      global.confirm = () => false;
      wrapper = factory.shallow();
      wrapper.setData({ id: 1, name: 'Development', color: '#ff0' });
      wrapper.find('.delete-button').vm.$emit('click');
    });

    it('does not dispatch projects/deleteProject', () => {
      expect($store.dispatch).not.toHaveBeenCalledWith(
        'projects/deleteProject'
      );
    });

    it('does not emit pop', () => {
      expect(wrapper.emitted('pop')).toBeFalsy();
    });
  });

  describe('when click delete button but failed', () => {
    beforeEach(() => {
      global.confirm = () => true;
      $store.dispatch.mockReturnValue(false);
      wrapper = factory.shallow();
      wrapper.setData({ id: 1 });
      wrapper.find('.delete-button').vm.$emit('click');
    });

    it('does not emit pop', () => {
      expect(wrapper.emitted('pop')).toBeFalsy();
    });
  });
});
