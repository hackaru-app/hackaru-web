<i18n src="@/assets/locales/components/organisms/activity-day.json" />

<template>
  <activity-group :title="title" :activites="activites" />
</template>

<script>
import ActivityGroup from '@/components/organisms/activity-group';
import { differenceInDays } from 'date-fns';

export default {
  components: {
    ActivityGroup
  },
  props: {
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
          return this.$i18n.t('today');
        case 1:
          return this.$i18n.t('yesterday');
        default:
          return this.$i18n.t('ago', { day: diff });
      }
    },
    activites() {
      return this.$store.getters['activities/getByDay'](this.day);
    }
  }
};
</script>
