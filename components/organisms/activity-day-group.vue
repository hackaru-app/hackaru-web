<i18n
  src="~/assets/locales/components/organisms/activity-day-group.json"
></i18n>

<template>
  <section v-if="activities" class="activity-day-group">
    <h1>
      {{ title }}<span>・{{ week }}</span>
    </h1>
    <activity-item
      v-for="(activity, index) in activities"
      :key="activity.id"
      :class="{ tutorial: first && index === 0 }"
      v-bind="activity"
    />
  </section>
</template>

<script>
import ActivityItem from '~/components/organisms/activity-item';
import { differenceInDays, startOfDay, parseISO, format } from 'date-fns';

export default {
  components: {
    ActivityItem,
  },
  props: {
    first: {
      type: Boolean,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    activities: {
      type: Array,
      required: true,
    },
  },
  computed: {
    title() {
      const diff = differenceInDays(startOfDay(new Date()), parseISO(this.day));
      if (diff === 0) return this.$t('today');
      if (diff === 1) return this.$t('yesterday');
      if (diff < 0) return `${Math.abs(diff)}${this.$t('later')}`;
      return `${diff}${this.$t('ago')}`;
    },
    week() {
      return this.$t(`weeks[${format(parseISO(this.day), 'i') - 1}]`);
    },
  },
};
</script>

<style scoped lang="scss">
.activity-day-group {
  border-bottom: 1px $border solid;
  box-sizing: border-box;
  margin: 50px 0;
  padding: 0 0;
  width: 100%;

  h1 {
    font-size: 18px;
    font-weight: normal;
    margin-left: 40px;
    padding-bottom: 10px;
  }

  span {
    color: $text-light;
    font-size: 16px;
  }
}

@include mq(small) {
  .activity-day-group {
    margin-bottom: 50px;
    margin-top: 30px;

    h1 {
      margin-left: 30px;
    }

    span {
      display: none;
    }
  }
}
</style>
