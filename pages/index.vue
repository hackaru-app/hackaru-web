<i18n src="~/assets/locales/pages/index.json"></i18n>

<template>
  <section class="index">
    <timer-form class="timer-form" />
    <div class="content">
      <p v-if="Object.keys(pastWeek).length <= 0" class="empty-message">
        {{ $t('empty') }}
      </p>
      <activity-day-group
        v-for="(activities, day, index) in pastWeek"
        v-else
        :key="day"
        :day="day"
        :activities="activities"
        :first="index === 0"
        class="day"
      />
    </div>
  </section>
</template>

<script>
import TimerForm from '~/components/organisms/timer-form';
import ProjectName from '~/components/molecules/project-name';
import BaseButton from '~/components/atoms/base-button';
import ActivityDayGroup from '~/components/organisms/activity-day-group';
import Icon from '~/components/atoms/icon';
import SurveyHint from '~/components/organisms/survey-hint';
import { startOfDay, endOfDay, addDays } from 'date-fns';
import { mapGetters } from 'vuex';

const weekly = {
  start: startOfDay(addDays(new Date(), -7)),
  end: endOfDay(new Date()),
};

export default {
  components: {
    TimerForm,
    ProjectName,
    Icon,
    BaseButton,
    ActivityDayGroup,
    SurveyHint,
  },
  data() {
    return {
      addDays,
    };
  },
  head: {
    title: 'Timer',
  },
  computed: {
    ...mapGetters({
      pastWeek: 'activities/pastWeek',
    }),
  },
  activated() {
    this.$store.dispatch('activities/fetchByRange', {
      start: weekly.start,
      end: weekly.end,
    });
  },
};
</script>

<style scoped lang="scss">
.index {
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.timer-form {
  width: 100%;
}
.content {
  margin-top: 90px;
  width: 100%;
}
.empty-message {
  color: $text-lighter;
  display: flex;
  justify-content: center;
  margin: 60px 30px;
  text-align: center;
}

@include mq(small) {
  .empty-message {
    height: calc(100vh - #{$side-bar-min-height});
  }
}
</style>
