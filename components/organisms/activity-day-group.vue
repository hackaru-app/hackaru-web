<i18n src="@/assets/locales/components/organisms/activity-day-group.json" />

<template>
  <section v-if="activities.length > 0" class="activity-day-group">
    <h1>
      {{ title }}<span>・{{ week }}</span>
    </h1>
    <activity-item
      v-for="(activity, index) in activities"
      :class="{ tutorial: first && index === 0 }"
      :key="activity.id"
      v-bind="activity"
    />
  </section>
</template>

<script>
import ActivityItem from '@/components/organisms/activity-item';
import { differenceInDays, format, startOfDay, endOfDay } from 'date-fns';

export default {
  components: {
    ActivityItem
  },
  props: {
    first: {
      type: Boolean,
      required: true
    },
    day: {
      type: String,
      required: true
    }
  },
  computed: {
    title() {
      const diff = differenceInDays(new Date(), this.day);
      switch (diff) {
        case 0:
          return this.$t('today');
        case 1:
          return this.$t('yesterday');
        default:
          return `${diff}${this.$t('ago')}`;
      }
    },
    week() {
      return this.$t(`weeks[${format(this.day, 'd')}]`);
    },
    activities() {
      return this.$store.getters['activities/getByRange'](
        startOfDay(this.day),
        endOfDay(this.day)
      );
    }
  }
};
</script>

<style scoped lang="scss">
.activity-day-group {
  padding: 0 0;
  margin: 50px 0;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px $border solid;
}
.activity-day-group h1 {
  font-size: 18px;
  font-weight: normal;
  margin-left: 40px;
  padding-bottom: 10px;
}
.activity-day-group span {
  font-size: 16px;
  color: $text-light;
}
@include mq(small) {
  .activity-day-group {
    margin-top: 30px;
    margin-bottom: 50px;
  }
  .activity-day-group h1 {
    margin-left: 30px;
  }
  .activity-day-group span {
    display: none;
  }
}
</style>
