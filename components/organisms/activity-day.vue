<template>
  <section>
    <activity
      v-for="activity in activites"
      :key="activity.id"
      v-bind="activity"
    />
  </section>
</template>

<script>
import Activity from '@/components/organisms/activity';

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
    activites() {
      return this.$store.getters['activities/getByDay'](this.day);
    }
  }
};
</script>
