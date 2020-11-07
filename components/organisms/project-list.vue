<i18n src="@/assets/locales/components/organisms/project-list.json"></i18n>

<template>
  <section class="container">
    <modal-header>
      <template slot="left">
        <icon-button v-if="navigated" data-test-id="pop-button" @click="pop">
          <icon name="chevron-left-icon" class="is-large" />
        </icon-button>
      </template>

      {{ $t('title') }}

      <template slot="right">
        <base-button
          class="has-icon"
          data-test-id="add-button"
          type="button"
          @click="createProject"
        >
          <icon name="plus-icon" />
        </base-button>
      </template>
    </modal-header>
    <div class="content">
      <div v-for="project in projects" :key="project.id" class="project">
        <button
          data-test-id="project-button"
          class="project-button"
          @click="pop({ project })"
        >
          <project-name v-bind="project" class="project-name" />
        </button>
        <base-button
          v-if="project.id"
          class="has-icon"
          data-test-id="edit-button"
          type="button"
          @click="editProject(project)"
        >
          <icon name="edit-3-icon" class="is-primary" />
        </base-button>
      </div>
    </div>
  </section>
</template>

<script>
import ModalItem from '@/components/molecules/modal-item';
import ModalHeader from '@/components/molecules/modal-header';
import ProjectName from '@/components/molecules/project-name';
import Icon from '@/components/atoms/icon';
import BaseButton from '@/components/atoms/base-button';
import ProjectEditor from '@/components/organisms/project-editor';

export default {
  components: {
    Icon,
    ModalHeader,
    ModalItem,
    ProjectName,
    BaseButton,
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
  display: flex;
  height: 71px;
  padding: 0 30px;
  border-bottom: 1px $border solid;
  transition: background-color 0.3s ease;
  &:hover {
    background: $background-hover;
  }
}
.content {
  overflow: scroll;
  height: 380px;
}
.project-button {
  flex-basis: 100%;
  align-items: center;
  background: none;
  border: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  transition: background-color 0.1s, transform 0.1s;
  min-width: 1px;
  transform-origin: left;
  &:active {
    transform: scale(0.97);
  }
  cursor: pointer;
}
.project-name {
  padding-right: 10px;
}
.edit-button {
  flex-shrink: 0;
}
</style>
