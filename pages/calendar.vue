<i18n src="~/assets/locales/pages/calendar.json"></i18n>

<template>
  <section>
    <date-header
      :title="title"
      :has-today="hasToday"
      data-test-id="date-header"
      @today="today"
      @left="slideLeft"
      @right="slideRight"
    />

    <loop-slider
      v-slot="{ slideStyle }"
      ref="slider"
      :enabled="sliderEnabled"
      data-test-id="loop-slider"
      @slide-left="prev"
      @slide-right="next"
    >
      <section class="sticky">
        <div :style="slideStyle" class="headers-wrapper">
          <div v-for="page in [-1, 0, 1]" :key="page" class="headers">
            <calendar-day-header
              v-for="day in getDays(page)"
              :day="formatISO(day)"
              :key="formatISO(day)"
            />
          </div>
        </div>
      </section>

      <coach-tooltip
        :content="$t('addActivityByLongPress')"
        name="addCalendarActivity"
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
import CoachTooltip from '~/components/atoms/coach-tooltip';
import DateHeader from '~/components/organisms/date-header';
import LoopSlider from '~/components/organisms/loop-slider';
import CalendarContent from '~/components/organisms/calendar-content';
import CalendarDayHeader from '~/components/organisms/calendar-day-header';
import {
  isSameDay,
  startOfWeek,
  endOfWeek,
  addWeeks,
  isToday,
  format,
  formatISO,
  addDays,
  eachDayOfInterval,
} from 'date-fns';

export default {
  components: {
    CoachTooltip,
    LoopSlider,
    CalendarContent,
    CalendarDayHeader,
    DateHeader,
  },
  head: {
    title: 'Calendar',
  },
  data() {
    return {
      addDays,
      formatISO,
      isToday,
      sliderEnabled: true,
      date: new Date(),
      sliding: undefined,
    };
  },
  computed: {
    title() {
      return format(this.date, this.$t('format') || 'yyyy/MM');
    },
    days() {
      return this.getDays(0);
    },
    hasToday() {
      return isSameDay(startOfWeek(new Date()), startOfWeek(this.date));
    },
  },
  watch: {
    date: {
      handler: 'fetchActivities',
    },
  },
  activated() {
    this.fetchActivities();
  },
  methods: {
    async fetchActivities() {
      await this.$store.dispatch('activities/fetchByRange', {
        start: startOfWeek(this.date),
        end: endOfWeek(this.date),
      });
    },
    getDays(page) {
      const baseDate = addWeeks(this.date, page);
      return eachDayOfInterval({
        start: startOfWeek(baseDate),
        end: endOfWeek(baseDate),
      });
    },
    slideLeft() {
      this.$refs.slider.slideLeft();
    },
    slideRight() {
      this.$refs.slider.slideRight();
    },
    prev() {
      this.$mixpanel.track('Show prev calendar', {
        component: 'calendar',
      });
      this.date = addWeeks(startOfWeek(this.date), -1);
    },
    next() {
      this.$mixpanel.track('Show next calendar', {
        component: 'calendar',
      });
      this.date = addWeeks(startOfWeek(this.date), 1);
    },
    today() {
      this.$mixpanel.track('Show today calendar', {
        component: 'calendar',
      });
      this.date = new Date();
    },
  },
};
</script>

<style scoped lang="scss">
.sticky {
  position: sticky;
  top: 0;
  overflow: hidden;
  z-index: index($z, calendar-day-header);
  border-bottom: 1px $border-dark solid;
  background-color: $background-translucent;
  box-shadow: 0 3px 3px $shadow;
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
