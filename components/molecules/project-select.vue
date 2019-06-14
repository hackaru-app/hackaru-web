<template>
  <section class="project-select">
    <v-popover offset="5">
      <button class="select-button tooltip-target" type="button">
        <project-name v-bind="selected" class="project-name" />
      </button>

      <template slot="popover">
        <div v-for="project in projects" :key="project.id" class="list-item">
          <project-name v-bind="project" class="project-name" />
          <base-button
            v-if="project.id"
            class="has-icon edit-button"
            type="button"
            @click="change(project.id)"
          >
            <icon name="edit-icon" class="is-primary edit-icon" />
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
      default() {
        return null;
      }
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
      return this.projects[this.value];
    }
  },
  methods: {
    change(id) {
      this.$emit('update:value', id);
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
  border: 0;
  border-right: 1px #eee solid;
}
.select-button .project-name {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 15px 40px;
}
.project-name {
  transition: all 0.2s ease;
  &:active {
    transform: scale(0.9);
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
  font-size: 14px;
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
  width: 16px;
  height: 16px;
  margin-top: 2px;
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
