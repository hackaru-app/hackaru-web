<template>
  <section v-if="activites.length > 0" class="activity-day">
    <div class="content">
      <activity
        v-for="activity in activites"
        :key="activity.id"
        v-bind="activity"
      />
    </div>
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
.activity-day {
  display: flex;
  // padding-bottom: 40px;
  // border-bottom: 1px $border solid;
  // border-top: 1px $border solid;
  &:last-child {
    border: 0;
  }
}
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.header {
  width: 110px;
  height: 65px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  border-right: 2px $grey-fafafa solid;
  // background-color: $grey-fafafa;
  line-height: 1;
  span {
    font-size: 11px;
    color: $text-light;
  }
  // align-items: center;
  // background-color: #fff;
  // padding: 7px 0;
  // color: $text;
  // font-size: 16px;
  // border-bottom: 1px $border solid;
  // padding-top: 0;
  // padding-bottom: 0;
  // box-shadow: 0 3px 5px #00000010;
  h1 {
    margin: 0;
    padding: 0;
    font-size: 16px;
    // font-size: $font-size;
    font-weight: normal;
  }
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
