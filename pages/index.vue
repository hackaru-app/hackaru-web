<template>
  <section class="index">
    <timer-form class="timer-form" />
    <div class="content">
      <activity-day-group
        v-for="ago in 7"
        :key="ago"
        :day="`${addDays(new Date(), -(ago - 1))}`"
        class="day"
      />
    </div>
  </section>
</template>

<script>
import TimerForm from '@/components/organisms/timer-form';
import ProjectName from '@/components/molecules/project-name';
import BaseButton from '@/components/atoms/base-button';
import ActivityDayGroup from '@/components/organisms/activity-day-group';
import Icon from '@/components/atoms/icon';
import { startOfDay, endOfDay, addDays, format } from 'date-fns';

export default {
  components: {
    TimerForm,
    ProjectName,
    Icon,
    BaseButton,
    ActivityDayGroup
  },
  data() {
    return {
      addDays,
      format
    };
  },
  head: {
    title: 'Timer'
  },
  mounted() {
    this.$store.dispatch('activities/fetchByRange', {
      start: startOfDay(addDays(new Date(), -7)),
      end: endOfDay(new Date())
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
.timer-form {
  width: 100%;
}
.content {
  width: 100%;
  margin-top: 90px;
}
</style>
