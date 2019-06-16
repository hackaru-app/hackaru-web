<template>
  <activity-group :title="title.toUpperCase()" :activites="activites" />
</template>

<script>
import ActivityGroup from '@/components/organisms/activity-group';
import { differenceInDays, distanceInWordsToNow } from 'date-fns';

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
      switch (differenceInDays(this.day, new Date())) {
        case 0:
          return 'Today';
        case -1:
          return 'Yesterday';
        default:
          return distanceInWordsToNow(this.day, { addSuffix: true });
      }
    },
    activites() {
      return this.$store.getters['activities/getByDay'](this.day);
    }
  }
};
</script>
