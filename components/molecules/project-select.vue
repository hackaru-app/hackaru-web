<template>
  <section class="project-select">
    <v-popover offset="5">
      <button class="select-button tooltip-target" type="button">
        <project-name v-bind="selected" class="project-name" />
      </button>

      <template slot="popover">
        <div
          v-close-popover
          v-for="project in projects"
          :key="project.id"
          class="list-item"
          @click="input(project.id)"
        >
          <project-name v-bind="project" class="project-name" />
          <base-button
            v-if="project.id"
            class="has-icon edit-button"
            type="button"
          >
            <icon name="edit-3-icon" class="is-primary edit-icon" />
          </base-button>
        </div>
        <footer class="footer">
          <button class="add-button">
            <icon name="plus-icon" class="add-icon" />
            新規作成
          </button>
        </footer>
      </template>
    </v-popover>
  </section>
</template>

<script>
import Icon from '@/components/atoms/icon';
import ProjectName from '@/components/molecules/project-name';
import BaseButton from '@/components/atoms/base-button';

export default {
  components: {
    Icon,
    ProjectName,
    BaseButton
  },
  props: {
    value: {
      type: Number,
      default: () => null
    }
  },
  computed: {
    projects() {
      return [
        { id: null, name: 'No Project', color: '#cccfd9' },
        ...this.$store.getters['projects/all']
      ];
    },
    selected() {
      return this.projects.find(({ id }) => id === this.value);
    }
  },
  methods: {
    input(id) {
      this.$emit('input', id);
    }
  }
};
</script>

<style scoped lang="scss">
.select-button {
  display: flex;
  align-items: center;
  height: 100%;
  background: none;
  cursor: pointer;
  padding: 0;
  width: 100%;
  min-width: 150px;
  border: 0;
  border-right: 1px #eee solid;
}
.select-button .project-name {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 15px 0;
  padding-right: 40px;
}
.project-name {
  transition: all 0.2s ease;
  &:active {
    transform: scale(0.95);
  }
}
.list-item {
  display: flex;
  align-items: center;
  padding: 0 25px;
  height: 58px;
  justify-content: space-between;
  border-top: 1px $grey-f5f5f5 solid;
  min-width: 150px;
  color: $text;
  font-size: $font-size;
  cursor: pointer;
  &:hover {
    background-color: $grey-fdfdfd;
  }
  &:first-child {
    border: 0;
    border-radius: 5px;
  }
}
.list-item .edit-icon {
  width: 18px;
  height: 18px;
  margin-top: 2px;
  margin-left: 20px;
}
.footer {
  border-top: 1px $grey-f5f5f5 solid;
}
.add-button {
  height: 58px;
  align-items: center;
  display: flex;
  border: 0;
  background: none;
  padding: 0 23px;
  width: 100%;
  border-radius: 0 0 5px 5px;
  transition: all 0.2s ease;
  cursor: pointer;
  &:hover {
    background-color: $grey-fdfdfd;
  }
  &:active {
    transform: scale(0.9);
  }
}
.add-button .add-icon {
  width: 16px;
  height: 16px;
  margin-right: 10px;
}
</style>
