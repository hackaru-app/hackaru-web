<i18n src="@/assets/locales/pages/index.json" />

<template>
  <section class="index">
    <ticker :started-at="`${new Date()}`" class="duration" />
    <base-button class="is-primary control-button">
      <icon name="play-icon" />
    </base-button>
    <div class="form">
      <div class="form-item">
        <project-name />
      </div>
      <div class="form-item">
        <input
          type="text"
          class="description"
          placeholder="作業内容や備考を入力..."
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
  computed: {
    workings() {
      return this.$store.getters['activities/workings'];
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
  font-size: 72px;
  font-family: $font-family-duration;
}
.control-button {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  margin-top: 15px;
  border-radius: 50%;
  .icon {
    width: 32px;
    height: 32px;
    padding-left: 4px;
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
