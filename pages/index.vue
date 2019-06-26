<i18n src="@/assets/locales/pages/index.json" />

<template>
  <section class="index">
    <section class="recents">
      <activity-item
        v-for="activity in activities"
        :key="activity.id"
        v-bind="activity"
        class="activity-item"
      />
    </section>
    <big-timer class="big-timer" />
  </section>
</template>

<script>
import BigTimer from '@/components/organisms/big-timer';
import ActivityItem from '@/components/organisms/activity-item';
import { addDays } from 'date-fns';

export default {
  components: {
    BigTimer,
    ActivityItem
  },
  head: {
    title: 'Timer'
  },
  computed: {
    activities() {
      return this.$store.getters['activities/weekly'];
    }
  },
  mounted() {
    this.$store.dispatch('activities/fetchWorkings');
    this.$store.dispatch('activities/fetchByRange', {
      start: addDays(new Date(), -7),
      end: new Date()
    });
  }
};
</script>

<style scoped lang="scss">
.index {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}
.big-timer {
  position: absolute;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  height: 100vh;
  width: 100%;
  max-width: 400px;
  padding-top: 45px;
}
.recents {
  display: flex;
  padding: 15px;
  padding-left: 20px;
  box-sizing: border-box;
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  z-index: 1;
}
@include mq(small) {
  .big-timer {
    height: calc(100vh - #{$side-bar-min-height});
  }
  .recents {
    padding-left: 15px;
  }
}
</style>
