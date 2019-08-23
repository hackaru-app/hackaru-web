<i18n src="@/assets/locales/components/organisms/activity-day-group.json" />

<template>
  <section v-if="activities" class="activity-day-group">
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
import { differenceInDays, format } from 'date-fns';

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
    },
    activities: {
      type: Array,
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
  h1 {
    font-size: 18px;
    font-weight: normal;
    margin-left: 40px;
    padding-bottom: 10px;
  }
  span {
    font-size: 16px;
    color: $text-light;
  }
}
@include mq(small) {
  .activity-day-group {
    margin-top: 30px;
    margin-bottom: 50px;
    h1 {
      margin-left: 30px;
    }
    span {
      display: none;
    }
  }
}
</style>
