<i18n src="@/assets/locales/components/organisms/project-list.json" />

<template>
  <section>
    <modal-header>
      <base-button
        class="left-arrow-button has-icon"
        type="button"
        @click="pop"
      >
        <icon name="chevron-left-icon" class="is-large" />
      </base-button>
      <h1>{{ $t('title') }}</h1>
      <base-button
        class="add-button has-icon"
        type="button"
        @click="createProject"
      >
        <icon name="plus-icon" />
      </base-button>
    </modal-header>

    <div v-for="project in projects" :key="project.id" class="item">
      <div class="project-content" @click="selectProject(project)">
        <project-name :name="project.name" :color="project.color" />
      </div>
      <base-button
        v-if="project.id"
        class="has-icon edit-button"
        type="button"
        @click="project.id && editProject(project)"
      >
        <icon name="edit-3-icon" class="is-primary" />
      </base-button>
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
    BaseButton
  },
  props: {
    params: {
      type: Object,
      default: () => ({
        selected: null
      })
    }
  },
  computed: {
    projects() {
      return [
        { id: null, name: 'No Project', color: '#cccfd9' },
        ...this.$store.getters['projects/all']
      ];
    }
  },
  methods: {
    pop() {
      this.$emit('pop');
    },
    createProject() {
      this.$emit('push', { component: ProjectEditor });
    },
    editProject(project) {
      this.$emit('push', {
        component: ProjectEditor,
        params: project
      });
    },
    selectProject(project) {
      this.$emit('pop', { project });
    }
  }
};
</script>

<style scoped lang="scss">
.item {
  padding: 0 30px;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px $border solid;
  &:hover {
    background: $grey-fdfdfd;
  }
}
.project-content {
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s ease;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  &:active {
    transform: scale(0.9);
  }
}
</style>
