<template>
  <section class="index">
    <big-timer class="big-timer" />
    <div class="content">
      <section v-for="ago in 7" :key="ago" class="day">
        <h1>
          {{ ago }}日前<span
            >・{{ format(addDays(new Date(), -ago + 1), 'dddd') }}</span
          >
        </h1>
        <activity-item
          v-for="activity in getByDay(addDays(new Date(), -ago + 1))"
          :key="activity.id"
          v-bind="activity"
        />
      </section>
    </div>
  </section>
</template>

<script>
import BigTimer from '@/components/organisms/big-timer';
import ProjectName from '@/components/molecules/project-name';
import BaseButton from '@/components/atoms/base-button';
import ActivityItem from '@/components/organisms/activity-item';
import Icon from '@/components/atoms/icon';
import { startOfDay, endOfDay, addDays, format } from 'date-fns';

export default {
  components: {
    BigTimer,
    ProjectName,
    Icon,
    BaseButton,
    ActivityItem
  },
  data() {
    return {
      addDays,
      format
    };
  },
  head: {
    title: 'Timer'
  },
  mounted() {
    this.$store.dispatch('activities/fetchByRange', {
      start: startOfDay(new Date()),
      end: endOfDay(new Date())
    });
  },
  methods: {
    getByDay(date) {
      return this.$store.getters['activities/getByDay'](date);
    }
  }
};
</script>

<style scoped lang="scss">
.index {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}
.big-timer {
  width: 100%;
}
.content {
  width: 100%;
  margin-top: 90px;
}
.project {
  flex: 1;
}
.day {
  padding: 0 0;
  margin-top: 50px;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px $border solid;
}
.day article {
  display: flex;
  border-top: 1px $border solid;
  border-radius: 5px;
  padding: 23px 50px;
  .project {
    margin-right: 20px;
  }
}
.day h1 {
  font-size: 18px;
  font-weight: normal;
  margin-left: 40px;
  padding-bottom: 10px;
  span {
    font-size: 16px;
  }
}
.day p {
  margin: 0;
  padding: 0;
  flex: 1;
}
.day time {
  color: $text-light;
  font-family: $font-family-duration;
  margin-right: 20px;
}
@include mq(small) {
  .day {
    margin-top: 80px;
  }
  .day:first-child {
    margin-top: 40px;
  }
  .day h1 {
    margin-left: 30px;
  }
  .day article {
    padding: 23px 30px;
  }
  .day time {
    margin-right: 0;
  }
  .repeat-button {
    display: none;
  }
}
</style>
