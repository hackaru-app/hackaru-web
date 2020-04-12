<template>
  <v-popover>
    <slot />
    <template slot="popover">
      <section class="popover-wrapper">
        <article
          v-for="project in projects"
          :key="project.id"
          class="project-item"
        >
          <project-name v-bind="project" />
          <input type="checkbox" class="checkbox" />
        </article>
      </section>
    </template>
  </v-popover>
</template>

<script>
import ProjectName from '@/components/molecules/project-name';

export default {
  components: {
    ProjectName
  },
  props: {
    projects: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
.popover-wrapper {
  padding: 10px;
}
.project-item {
  display: flex;
  padding: 0 15px;
  height: 45px;
  min-width: 130px;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  &:hover {
    background-color: $background-hover;
  }
}
</style>
