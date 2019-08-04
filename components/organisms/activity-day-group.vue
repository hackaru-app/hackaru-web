<template>
  <section class="activity-day-group">
    <h1>
      {{ title }}<span>・{{ week }}</span>
    </h1>
    <activity-item
      v-for="activity in activities"
      :key="activity.id"
      v-bind="activity"
    />
  </section>
</template>

<script>
import ActivityItem from '@/components/organisms/activity-item';
import { format } from 'date-fns';

export default {
  components: {
    ActivityItem
  },
  props: {
    day: {
      type: String,
      required: true
    }
  },
  computed: {
    title() {
      return '1日前';
    },
    week() {
      return format(this.day, 'dddd');
    },
    activities() {
      return this.$store.getters['activities/getByDay'](this.day);
    }
  }
};
</script>

<style scoped lang="scss">
.activity-day-group {
  padding: 0 0;
  margin-top: 50px;
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
}
@include mq(small) {
  .activity-day-group h1 {
    margin-left: 30px;
  }
}
</style>
