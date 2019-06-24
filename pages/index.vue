<i18n src="@/assets/locales/pages/index.json" />

<template>
  <section class="index">
    <div class="timer">
      <ticker :started-at="`${new Date()}`" class="duration" />
      <base-button class="is-primary play-button">
        <icon name="play-icon" />
      </base-button>
      <div class="form">
        <div class="project"><project-name /></div>
        <input
          type="text"
          class="form-item description"
          placeholder="作業内容や備考を入力..."
        />
      </div>
    </div>
  </section>
</template>

<script>
import Dot from '@/components/atoms/dot';
import ProjectName from '@/components/molecules/project-name';
import CoachTooltip from '@/components/atoms/coach-tooltip';
import ContentHeader from '@/components/organisms/content-header';
import Ticker from '@/components/atoms/ticker';
import Heading from '@/components/atoms/heading';
import BaseButton from '@/components/atoms/base-button';
import Icon from '@/components/atoms/icon';
import Activity from '@/components/organisms/activity';
import { addDays } from 'date-fns';

export default {
  components: {
    Dot,
    Ticker,
    CoachTooltip,
    ContentHeader,
    ProjectName,
    Heading,
    Icon,
    BaseButton,
    Activity
  },
  head: {
    title: 'Timers'
  },
  data() {
    return {
      addDays
    };
  },
  computed: {
    activities() {
      return [
        ...this.$store.getters['activities/workings'],
        ...this.$store.getters['activities/weekly']
      ];
    }
  },
  mounted() {
    this.$store.dispatch('activities/fetchWorkings');
    this.$store.dispatch('activities/fetchByRange', {
      start: addDays(new Date(), -7),
      end: new Date()
    });
  },
  methods: {
    showModal() {
      this.$modal.show('activity');
    }
  }
};
</script>

<style scoped lang="scss">
.timer {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.play-button {
  width: 64px;
  height: 64px;
  margin-top: 15px;
  border-radius: 50%;
  margin-bottom: 50px;
}
.form {
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  // flex-direction: column;
  // align-items: center;
}
.form-item {
  border: 0;
  border-bottom: 1px $border solid;
  padding: 20px 10px;
  height: 60px;
  // background: red;
}
.project {
  border-top: 1px $border solid;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px $border solid;
}
.form-item,
.project {
  height: 65px;
}
.project-name {
  border: 0;
  padding: 20px 0;
  // background: red;
}
.description {
  display: flex;
  align-items: center;
  line-height: 1;
  text-align: center;
}
.play-button .icon {
  width: 32px;
  height: 32px;
  padding-left: 5px;
}
.duration {
  font-size: 72px;
  font-family: $font-family-duration;
}
@include mq(small) {
  .form-item,
  .project {
    height: 70px;
  }
  .play-button {
    width: 64px;
    height: 64px;
  }
  .duration {
    font-size: 64px;
  }
  .timer {
    height: calc(100vh - #{$side-bar-min-height});
  }
}
</style>
