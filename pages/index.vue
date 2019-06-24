<i18n src="@/assets/locales/pages/index.json" />

<template>
  <section class="index">
    <ticker :started-at="startedAt" class="duration" />
    <base-button v-if="!startedAt" class="is-primary control-button play">
      <icon name="play-icon" />
    </base-button>
    <base-button v-else class="is-danger control-button stop">
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
  </section>
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
  head: {
    title: 'Timers'
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
      const activity = this.workings && this.workings[0];
      if (activity) {
        this.description = activity.description;
        this.startedAt = activity.startedAt;
        this.project = activity.project;
      }
    }
  },
  mounted() {
    this.$store.dispatch('activities/fetchWorkings');
  },
  methods: {
    showModal() {
      this.$modal.show('activity');
    }
  }
};
</script>

<style scoped lang="scss">
.index {
  width: 100%;
  height: 100vh;
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
.control-button {
  flex-shrink: 0;
  width: 62px;
  height: 62px;
  margin-top: 15px;
  border-radius: 50%;
}
.control-button.play {
  .icon {
    width: 32px;
    height: 32px;
    padding-left: 4px;
  }
}
.control-button.stop {
  .icon {
    width: 26px;
    height: 26px;
  }
}
.form {
  margin-top: 50px;
  max-width: 400px;
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
  .control-button {
    width: 64px;
    height: 64px;
  }
  .duration {
    font-size: 64px;
  }
  .index {
    height: calc(100vh - #{$side-bar-min-height});
  }
}
</style>
