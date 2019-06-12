<template>
  <section v-if="activites.length > 0" class="activity-day">
    <header class="date">
      <span class="title">{{ title.toUpperCase() }}</span>
    </header>
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
      const diff = differenceInDays(this.day, new Date());
      if (diff === 0) return 'Today';
      if (diff === -1) return 'Yesterday';
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
  margin: 40px;
  .date {
    padding-bottom: 15px;
  }
  .day {
    color: $text-light;
    margin-left: 5px;
  }
}

@include mq(small) {
  .date {
    padding: 0 30px;
    border-bottom: 1px $grey-eee solid;
  }
  .activity-day {
    margin: 50px 0;
  }
}
// .activity-day {
//   display: flex;
//   // padding-bottom: 40px;
//   // border-bottom: 1px $border solid;
//   // border-top: 1px $border solid;
//   &:last-child {
//     border: 0;
//   }
// }
// .date-content {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100%;
// }
// .content {
//   display: flex;
//   flex-direction: column;
//   width: 100%;
// }
// .date {
//   display: flex;
//   flex-direction: column;
//   line-height: 1;
//   width: 80px;
//   min-height: 70px;
//   // align-items: center;
//   border-right: 1px $border solid;
//   border-bottom: 1px $border solid;
//   box-sizing: border-box;
// }
// .date .day {
//   font-size: 18px;
// }
// .date .week {
//   font-size: 12px;
//   width: 35px;
//   display: flex;
//   justify-content: center;
//   color: $text-light;
//   margin-bottom: 3px;
// }
// .header {
//   width: 110px;
//   align-items: center;
//   justify-content: center;
//   display: flex;
//   flex-direction: column;
//   border-right: 2px $grey-fafafa solid;
//   // background-color: $grey-fafafa;
//   line-height: 1;
//   span {
//     font-size: 11px;
//     color: $text-light;
//   }
//   // align-items: center;
//   // background-color: #fff;
//   // padding: 7px 0;
//   // color: $text;
//   // font-size: 16px;
//   // border-bottom: 1px $border solid;
//   // padding-top: 0;
//   // padding-bottom: 0;
//   // box-shadow: 0 3px 5px #00000010;
//   h1 {
//     margin: 0;
//     padding: 0;
//     font-size: 16px;
//     // font-size: $font-size;
//     font-weight: normal;
//   }
// }
// @include mq(small) {
//   .activity-day {
//     display: flex;
//     // flex-direction: column;
//     // margin-bottom: 50px;
//     // margin-bottom: 30px;
//   }
//   // .date .day {
//   //   font-size: 18px;
//   // }
//   .date {
//     width: auto;
//     box-sizing: border-box;
//     // color: $text-light;
//     padding: 0 5px;
//     width: 30px;
//   }
//   .date-content {
//     font-size: 16px;
//   }
//   .date .day {
//     font-size: 14px;
//     writing-mode: vertical-rl;
//     color: $text-light;
//     // display: none;
//   }
//   .date .week {
//     font-size: 10px;
//     margin: 0;
//     margin-bottom: 0;
//     align-items: center;
//     padding-bottom: 3px;
//     writing-mode: vertical-rl;
//     color: $text-lighter;
//   }
//   .date-content {
//     display: flex;
//   }
//   .header {
//     padding-left: 30px;
//     padding-right: 30px;
//   }
//   .empty {
//     padding: 0 30px;
//   }
// }
</style>
