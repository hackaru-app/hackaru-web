<template>
  <form class="activity-form">
    <project-select v-model="projectId" />
    <input
      v-model="description"
      class="description"
      type="text"
      placeholder="何を始めますか？"
    />
    <base-button
      type="button"
      class="is-primary is-circle has-dropshadow add-button"
    >
      <icon name="plus-icon" />
    </base-button>
  </form>
</template>

<script>
import ProjectSelect from '@/components/molecules/project-select';
import BaseButton from '@/components/atoms/base-button';
import Icon from '@/components/atoms/icon';

export default {
  components: {
    ProjectSelect,
    Icon,
    BaseButton
  },
  data() {
    return {
      projectId: null,
      description: ''
    };
  }
};
</script>

<style scoped lang="scss">
.activity-form {
  width: 100%;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0;
}
.description {
  border: 0;
  flex: 1;
  padding: 0 40px;
  height: 100%;
}
.add-button {
  margin-right: 10px;
}
</style>
