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
    <ticker :started-at="startedAt" :stopped-at="stoppedAt" class="duration" />
    <base-button class="repeat-button" @click="duplicate">
      <icon name="repeat-icon" class="is-midium" />
    </base-button>
  </div>
</template>

<script>
import BaseButton from '@/components/atoms/base-button';
import Icon from '@/components/atoms/icon';
import ProjectName from '@/components/molecules/project-name';
import Ticker from '@/components/atoms/ticker';

export default {
  components: {
    BaseButton,
    Icon,
    ProjectName,
    Ticker
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
  border-top: 1px $border solid;
  height: 68px;
  display: flex;
  align-items: center;
  padding: 0 50px;
  padding-right: 40px;
}
.duration {
  color: $text-light;
  font-family: $font-family-duration;
}
.content {
  cursor: pointer;
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
}
.repeat-button {
  height: 100%;
  border-radius: 0;
  margin-left: 10px;
}
@include mq(small) {
  .activity {
    padding: 0 30px;
    padding-left: 35px;
  }
  .repeat-button {
    display: none;
  }
}
</style>
