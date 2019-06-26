<i18n src="@/assets/locales/components/organisms/big-timer.json" />

<template>
  <form class="big-timer" @submit.prevent="submit">
    <nav-modal
      :initial-component="ProjectList"
      height="450"
      name="project-list"
      @close="selectProject"
    />
    <ticker
      :started-at="startedAt"
      :class="['duration', { stopped: !startedAt }]"
    />
    <div class="form">
      <div class="form-content">
        <div class="project-wrapper" @click="showModal">
          <project-name v-bind="project" />
        </div>
        <input
          v-model="description"
          :placeholder="$t('description')"
          type="text"
          class="description"
          autofocus
        />
      </div>
      <base-button
        v-tooltip="$t('start')"
        v-if="!startedAt"
        type="submit"
        class="is-primary control-button start"
      >
        <icon name="play-icon" />
      </base-button>
      <base-button
        v-tooltip="$t('stop')"
        v-else
        type="submit"
        class="is-danger control-button stop"
      >
        <icon name="square-icon" />
      </base-button>
    </div>
  </form>
</template>

<script>
import NavModal from '@/components/organisms/nav-modal';
import ProjectList from '@/components/organisms/project-list';
import ProjectName from '@/components/molecules/project-name';
import CoachTooltip from '@/components/atoms/coach-tooltip';
import Ticker from '@/components/atoms/ticker';
import BaseButton from '@/components/atoms/base-button';
import Icon from '@/components/atoms/icon';

export default {
  components: {
    NavModal,
    Ticker,
    CoachTooltip,
    ProjectName,
    Icon,
    BaseButton
  },
  data() {
    return {
      ProjectList,
      description: '',
      project: undefined,
      startedAt: undefined
    };
  },
  computed: {
    workings() {
      return this.$store.getters['activities/workings'];
    }
  },
  watch: {
    workings() {
      const activity = this.workings.length > 0 ? this.workings[0] : {};
      this.description = activity.description;
      this.startedAt = activity.startedAt;
      this.project = activity.project;
    }
  },
  methods: {
    selectProject({ project }) {
      this.project = project;
    },
    submit() {
      (this.startedAt ? this.stopActivity : this.startActivity)();
    },
    stopActivity() {
      this.$store.dispatch('toast/success', this.$t('計測を完了しました！🎉'));
      this.$store.dispatch('activities/update', {
        id: this.workings[0].id,
        stoppedAt: `${new Date()}`
      });
    },
    async startActivity() {
      const success = await this.$store.dispatch('activities/add', {
        description: this.description,
        projectId: this.project && this.project.id,
        startedAt: `${new Date()}`
      });
      if (success) {
        this.$store.dispatch('toast/success', this.$t('計測を開始しました！'));
      }
    },
    showModal() {
      this.$modal.show('project-list');
    }
  }
};
</script>

<style scoped lang="scss">
.big-timer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -30px;
}
.duration {
  font-size: 76px;
  font-weight: 300;
  font-family: $font-family-duration;
}
.duration.stopped {
  color: $text-light;
}
.control-button {
  flex-shrink: 0;
  padding: 0;
  width: 65px;
  height: 100%;
  border-radius: 0 3px 3px 0;
  pointer-events: auto;
}
.control-button .icon {
  width: 24px;
  height: 24px;
}
.control-button.start .icon {
  padding-left: 3px;
}
.form {
  width: calc(100vw - #{$side-bar-min-width});
  max-width: 700px;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 40px;
  display: flex;
  border-radius: 5px;
  height: 64px;
  padding: 0 50px;
  box-sizing: border-box;
}
.form-content {
  display: flex;
  flex: 1;
  width: 100%;
  border: 1px $border solid;
  border-right: 0;
  border-radius: 3px 0 0 3px;
}
.project-wrapper {
  border-right: 1px $border solid;
}
.project-name {
  cursor: pointer;
  display: flex;
  height: 100%;
  max-width: 120px;
  padding-right: 30px;
  padding-left: 25px;
  align-items: center;
  transition: all 0.2s ease;
  &:active {
    transform: scale(0.9);
  }
}
.description {
  line-height: 1;
  border: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 25px;
  display: flex;
  background: none;
}
@include mq(small) {
  .big-timer {
    margin-top: 0;
  }
  .form {
    height: auto;
    padding: 0;
    justify-content: flex-start;
    margin: 0;
    margin-top: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
  }
  .project-name,
  .description {
    height: 70px;
  }
  .description {
    text-align: center;
  }
  .project-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    border-bottom: 1px $border solid;
  }
  .project-name {
    max-width: none;
    border: 0;
  }
  .form-content {
    order: 1;
    flex-direction: column;
    border-radius: 0;
    border-left: 0;
    border-right: 0;
  }
  .control-button {
    width: 65px;
    height: 65px;
    border-radius: 50%;
    padding: 0;
    margin-bottom: 50px;
  }
  .control-button .icon {
    width: 25px;
    height: 25px;
  }
  .control-button.start .icon {
    padding-left: 5px;
    width: 28px;
    height: 28px;
  }
  .duration {
    font-size: 72px;
  }
}
</style>
