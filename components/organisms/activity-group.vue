<template>
  <section v-if="activites.length > 0" class="activity-group">
    <h1 class="title">{{ title }}</h1>
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
}
.title {
  font-size: $font-size;
  font-weight: normal;
  padding: 0;
  padding-bottom: 15px;
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
