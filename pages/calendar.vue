<i18n src="@/assets/locales/pages/calendar.json" />

<template>
  <section>
    <date-header
      :periods="['day', 'week']"
      :current-period.sync="currentPeriod"
      :title="title"
      :has-today="hasToday"
      class="date-header"
      @today="today"
      @left="slideLeft"
      @right="slideRight"
    />

    <loop-slider
      v-slot="{ slideStyle }"
      ref="slider"
      :enabled="sliderEnabled"
      class="loop-slider"
      @slide-left="prev"
      @slide-right="next"
    >
      <section class="sticky">
        <div :style="slideStyle" class="headers-wrapper">
          <div v-for="page in [-1, 0, 1]" :key="page" class="headers">
            <calendar-day-header
              v-for="day in getDays(page)"
              :day="format(day, 'yyyy-MM-dd HH:mm:ss')"
              :key="format(day, 'yyyy-MM-dd HH:mm:ss')"
            />
          </div>
        </div>
      </section>

      <coach-tooltip
        :content="$t('addActivityByLongPress')"
        name="add-calendar-activity"
      >
        <section class="contents-wrapper">
          <section :style="slideStyle" class="contents">
            <calendar-content :days="[]" class="slider-item" />
            <calendar-content
              :days="days"
              class="slider-item"
              @dragging="sliderEnabled = false"
              @drop="sliderEnabled = true"
            />
            <calendar-content :days="[]" class="slider-item" />
          </section>
        </section>
      </coach-tooltip>
    </loop-slider>
  </section>
</template>

<script>
import CoachTooltip from '@/components/atoms/coach-tooltip';
import DateHeader from '@/components/organisms/date-header';
import LoopSlider from '@/components/organisms/loop-slider';
import CalendarContent from '@/components/organisms/calendar-content';
import CalendarDayHeader from '@/components/organisms/calendar-day-header';
import {
  startOfDay,
  endOfDay,
  isSameDay,
  startOfWeek,
  endOfWeek,
  addWeeks,
  isToday,
  format,
  addDays,
  eachDayOfInterval
} from 'date-fns';

const periods = {
  day: {
    startOf: startOfDay,
    endOf: endOfDay,
    add: addDays
  },
  week: {
    startOf: startOfWeek,
    endOf: endOfWeek,
    add: addWeeks
  }
};

export default {
  components: {
    CoachTooltip,
    LoopSlider,
    CalendarContent,
    CalendarDayHeader,
    DateHeader
  },
  head: {
    title: 'Calendar'
  },
  data() {
    return {
      addDays,
      format,
      isToday,
      sliderEnabled: true,
      date: new Date(),
      currentPeriod: 'week',
      sliding: undefined
    };
  },
  computed: {
    period() {
      return periods[this.currentPeriod];
    },
    title() {
      const formatString = this.$t(`${this.currentPeriod}.format`);
      return format(this.date, formatString || 'yyyy/MM');
    },
    days() {
      return this.getDays(0);
    },
    hasToday() {
      return isSameDay(
        this.period.startOf(new Date()),
        this.period.startOf(this.date)
      );
    }
  },
  watch: {
    date: {
      handler: 'fetchActivities',
      immediate: true
    }
  },
  methods: {
    async fetchActivities() {
      await this.$store.dispatch('activities/fetchByRange', {
        start: this.period.startOf(this.date),
        end: this.period.endOf(this.date)
      });
    },
    getDays(page) {
      const baseDate = this.period.add(this.date, page);
      return eachDayOfInterval({
        start: this.period.startOf(baseDate),
        end: this.period.endOf(baseDate)
      });
    },
    slideLeft() {
      this.$refs.slider.slideLeft();
    },
    slideRight() {
      this.$refs.slider.slideRight();
    },
    prev() {
      this.date = this.period.add(this.period.startOf(this.date), -1);
    },
    next() {
      this.date = this.period.add(this.period.startOf(this.date), 1);
    },
    today() {
      this.date = new Date();
    }
  }
};
</script>

<style scoped lang="scss">
.sticky {
  position: sticky;
  top: 0;
  overflow: hidden;
  z-index: index($z, calendar-day-header);
  border-bottom: 1px $border solid;
  background-color: #fffffff5;
  box-shadow: 0 3px 3px #00000005;
}
.headers-wrapper {
  display: flex;
}
.headers {
  display: flex;
  flex-direction: row;
  min-width: 100%;
  box-sizing: border-box;
  padding-left: 60px;
}
.contents-wrapper {
  overflow: hidden;
}
.contents {
  display: flex;
}
.slider-item {
  min-width: 100%;
}
@media screen and (max-width: 640px) {
  .sticky {
    top: $side-bar-min-height;
  }
  .headers {
    padding-left: 25px;
  }
}
</style>
