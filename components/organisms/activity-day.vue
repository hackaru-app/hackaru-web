<template>
  <section v-if="activites.length > 0" class="activity-day">
    <header class="date">
      <span class="title">{{ title.toUpperCase() }}</span>
    </header>
    <activity
      v-for="activity in activites"
      :key="activity.id"
      v-bind="activity"
    />
  </section>
</template>

<script>
import Activity from '@/components/organisms/activity';
import { differenceInDays, distanceInWordsToNow, format } from 'date-fns';

export default {
  components: {
    Activity
  },
  props: {
    day: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      format
    };
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

<style scoped lang="scss">
.activity-day {
  margin: 40px;
}
.date {
  padding-bottom: 15px;
}

@include mq(small) {
  .activity-day {
    margin: 50px 0;
  }
  .date {
    padding-left: 30px;
    border-bottom: 1px $border solid;
  }
}
</style>
