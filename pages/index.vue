<i18n src="@/assets/locales/pages/index.json" />

<template>
  <section class="index">
    <timer-form class="timer-form" />
    <div class="content">
      <p v-if="empty" class="empty-message">
        {{ $t('empty') }}
      </p>
      <activity-day-group
        v-for="ago in 7"
        v-else
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

const weekly = {
  start: startOfDay(addDays(new Date(), -7)),
  end: endOfDay(new Date())
};

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
  computed: {
    empty() {
      return (
        this.$store.getters['activities/getByRange'](weekly.start, weekly.end)
          .length <= 0
      );
    }
  },
  mounted() {
    this.$store.dispatch('activities/fetchByRange', {
      start: weekly.start,
      end: weekly.end
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
.empty-message {
  display: flex;
  justify-content: center;
  margin: 60px 30px;
  text-align: center;
  color: $text-lighter;
}
@include mq(small) {
  .empty-message {
    height: calc(100vh - #{$side-bar-min-height});
  }
}
</style>
