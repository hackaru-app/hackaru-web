<template>
  <section v-if="activites.length > 0" class="activity-group">
    <heading class="title is-small">
      {{ title }}
    </heading>
    <activity
      v-for="activity in activites"
      :key="activity.id"
      v-bind="activity"
    />
  </section>
</template>

<script>
import Heading from '@/components/atoms/heading';
import Activity from '@/components/organisms/activity';

export default {
  components: {
    Heading,
    Activity
  },
  props: {
    activites: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
.activity-group {
  margin: 40px;
  margin-bottom: 45px;
}
.title {
  padding: 0;
  padding-bottom: 10px;
}
@include mq(small) {
  .activity-group {
    margin: 50px 0;
  }
  .title {
    padding-left: 30px;
  }
}
</style>
