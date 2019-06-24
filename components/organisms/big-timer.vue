<i18n src="@/assets/locales/pages/index.json" />

<template>
  <form class="big-timer" @submit.prevent="submit">
    <ticker
      :started-at="startedAt"
      :class="['duration', { stopped: !startedAt }]"
    />
    <base-button
      v-if="!startedAt"
      type="submit"
      class="is-primary control-button play"
    >
      <icon name="play-icon" />
    </base-button>
    <base-button v-else type="submit" class="is-danger control-button stop">
      <icon name="square-icon" />
    </base-button>
    <div class="form">
      <div class="form-item">
        <project-name v-bind="project" />
      </div>
      <div class="form-item">
        <input
          v-model="description"
          type="text"
          class="description"
          placeholder="作業内容や備考を入力..."
          autofocus
        />
      </div>
    </div>
  </form>
</template>

<script>
import ProjectName from '@/components/molecules/project-name';
import CoachTooltip from '@/components/atoms/coach-tooltip';
import Ticker from '@/components/atoms/ticker';
import BaseButton from '@/components/atoms/base-button';
import Icon from '@/components/atoms/icon';

export default {
  components: {
    Ticker,
    CoachTooltip,
    ProjectName,
    Icon,
    BaseButton
  },
  data() {
    return {
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
  width: 63px;
  height: 63px;
  margin-top: 15px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  pointer-events: auto;
}
.control-button.play {
  .icon {
    width: 30px;
    height: 30px;
    padding-left: 5px;
  }
}
.control-button.stop {
  .icon {
    width: 25px;
    height: 25px;
  }
}
.form {
  margin-top: 50px;
  max-width: 400px;
  pointer-events: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px $border solid;
  border-left: 0;
  border-right: 0;
}
.form-item {
  display: flex;
  justify-content: center;
  height: 65px;
}
.project-name {
  display: flex;
  height: 100%;
  padding-right: 10px;
  align-items: center;
}
.description {
  display: flex;
  align-items: center;
  line-height: 1;
  border: 0;
  height: 100%;
  width: 100%;
  text-align: center;
  border-top: 1px $border solid;
  background: none;
}
@include mq(small) {
  .form-item {
    height: 70px;
  }
  .duration {
    font-size: 64px;
  }
}
</style>
