<i18n src="@/assets/locales/components/organisms/activity-item.json" />

<template>
  <div class="activity">
    <div class="content" @click="showModal">
      <project-name
        v-bind="project"
        :name="description || (project ? project.name : undefined)"
        class="project-name"
      />
    </div>
    <base-button class="repeat-button" @click="duplicate">
      <icon name="repeat-icon" class="is-small" />
    </base-button>
  </div>
</template>

<script>
import BaseButton from '@/components/atoms/base-button';
import Icon from '@/components/atoms/icon';
import ProjectName from '@/components/molecules/project-name';

export default {
  components: {
    BaseButton,
    Icon,
    ProjectName
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    duration: {
      type: Number,
      default: 0
    },
    description: {
      type: String,
      required: true
    },
    startedAt: {
      type: String,
      required: true
    },
    stoppedAt: {
      type: String,
      default: undefined
    },
    project: {
      type: Object,
      default: undefined
    }
  },
  methods: {
    showModal(params) {
      this.$modal.show('activity', {
        id: this.id,
        description: this.description,
        startedAt: this.startedAt,
        stoppedAt: this.stoppedAt,
        project: this.project || undefined
      });
    },
    async duplicate() {
      const success = await this.$store.dispatch('activities/add', {
        description: this.description,
        projectId: this.project && this.project.id,
        startedAt: `${new Date()}`
      });
      if (success) {
        this.$store.dispatch('toast/success', this.$t('duplicated'));
      }
    }
  }
};
</script>

<style scoped lang="scss">
.activity {
  border: 1px $border solid;
  height: 54px;
  display: flex;
  align-items: center;
  margin-right: 15px;
  border-radius: 3px;
}
.content {
  cursor: pointer;
  padding-left: 20px;
  transition: all 0.2s ease;
  height: 100%;
  display: flex;
  align-items: center;
  &:active {
    transform: scale(0.9);
  }
}
.repeat-button {
  height: 100%;
  border-left: 1px $border solid;
  border-radius: 0;
  width: 55px;
  margin-left: 20px;
}
</style>
