<template>
  <section v-if="activites.length > 0" class="activity-day">
    <header class="header">
      {{ title }}
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
import { differenceInDays, distanceInWordsToNow } from 'date-fns';

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
  computed: {
    title() {
      const diff = differenceInDays(this.day, new Date());
      if (diff === 0) return 'Today';
      if (diff === -1) return 'Tomorrow';
      return distanceInWordsToNow(this.day, { addSuffix: true });
    },
    activites() {
      return this.$store.getters['activities/getByDay'](this.day);
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  align-items: center;
  background-color: #fff;
  padding: 7px 40px;
  color: $text;
  font-size: 16px;
  border-bottom: 1px $border solid;
  padding-top: 40px;
  padding-bottom: 15px;
  box-shadow: 0 3px 5px #00000010;
}
@include mq(small) {
  .header {
    padding-left: 30px;
    padding-right: 30px;
  }
  .empty {
    padding: 0 30px;
  }
}
</style>
