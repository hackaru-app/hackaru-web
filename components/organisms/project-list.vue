<i18n src="~/assets/locales/components/organisms/project-list.json"></i18n>

<template>
  <section class="container">
    <modal-header>
      <template slot="left">
        <icon-button
          v-if="navigated"
          data-test-id="left-arrow-button"
          type="button"
          @click="pop"
        >
          <icon name="chevron-left-icon" class="is-large" />
        </icon-button>
      </template>

      {{ $t('title') }}

      <template slot="right">
        <icon-button
          data-test-id="add-button"
          type="button"
          @click="createProject"
        >
          <icon name="plus-icon" />
        </icon-button>
      </template>
    </modal-header>
    <div v-scroll-lock="true" class="content">
      <div v-for="project in projects" :key="project.id" class="project">
        <button
          data-test-id="project-button"
          class="project-button"
          @click="pop({ project })"
        >
          <project-name v-bind="project" class="project-name" />
        </button>
        <icon-button
          v-if="project.id"
          data-test-id="edit-button"
          type="button"
          @click="editProject(project)"
        >
          <icon name="edit-3-icon" class="is-primary" />
        </icon-button>
      </div>
    </div>
  </section>
</template>

<script>
import ModalHeader from '~/components/molecules/modal-header';
import ProjectName from '~/components/molecules/project-name';
import Icon from '~/components/atoms/icon';
import ProjectEditor from '~/components/organisms/project-editor';
import IconButton from '~/components/atoms/icon-button';

export default {
  components: {
    Icon,
    ModalHeader,
    ProjectName,
    IconButton,
  },
  props: {
    navigated: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    projects() {
      return [
        { id: null, name: 'No Project', color: '#cccfd9' },
        ...this.$store.getters['projects/all'],
      ];
    },
  },
  methods: {
    pop(params) {
      this.$emit('pop', params);
    },
    createProject() {
      this.$emit('push', {
        component: ProjectEditor,
      });
    },
    editProject(project) {
      this.$emit('push', {
        component: ProjectEditor,
        params: project,
      });
    },
    selectProject(project) {
      this.$emit('pop', { project });
    },
  },
};
</script>

<style scoped lang="scss">
.project {
  border-bottom: 1px $border solid;
  display: flex;
  height: 71px;
  padding: 0 30px;
  transition: background-color 0.3s ease;
  &:hover {
    background: $background-hover;
  }
}
.content {
  height: 385px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}
.project-button {
  align-items: center;
  background: none;
  border: 0;
  display: flex;
  flex-basis: 100%;
  justify-content: space-between;
  min-width: 1px;
  padding: 0;
  transition: background-color 0.1s;
}
.project-name {
  padding-right: 10px;
}
.edit-button {
  flex-shrink: 0;
}
</style>
