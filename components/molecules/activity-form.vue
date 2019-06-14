<template>
  <form class="activity-form" @submit.prevent="startActivity">
    <project-select v-model="projectId" />
    <input
      v-model="description"
      class="description"
      type="text"
      placeholder="何を始めますか？"
    />
    <base-button type="submit" class="is-primary is-circle add-button">
      <icon name="play-icon" class="icon" />
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
  },
  methods: {
    async startActivity() {
      const success = await this.$store.dispatch('activities/add', {
        projectId: this.projectId,
        description: this.description,
        startedAt: `${new Date()}`
      });
      if (success) {
        this.description = '';
        this.$ga.event('activity', 'add');
        this.$store.dispatch('toast/success', '開始しました');
      }
    }
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
  margin-right: 15px;
  .icon {
    width: 18px;
    height: 18px;
    margin-left: 3px;
  }
}
</style>
