<template>
  <section class="calendar-container">
    <calendar-hours />
    <div v-if="hasToday">
      <calendar-ruler
        :top="currentTimeLineTop"
        class="today-ruler"
        color="#eb4f34"
      />
    </div>
    <calendar-ruler
      v-if="guideTop"
      :top="guideTop"
      class="guide-ruler"
      color="#2e99b0"
      show-time
    />
    <calendar-day
      v-for="day in days"
      ref="days"
      :data-day="format(day, 'YYYY-MM-DD')"
      :class="{ overlapped: isSameDay(overlapDay, day) }"
      :update-guide-line="updateGuideLine"
      :get-overlap-day="getOverlapDay"
      :key="format(day, 'YYYY-MM-DD')"
      :day="format(day, 'YYYY-MM-DD')"
    />
  </section>
</template>

<script>
import CalendarHours from '@/components/organisms/calendar-hours';
import CalendarRuler from '@/components/organisms/calendar-ruler';
import CalendarDay from '@/components/organisms/calendar-day';
import PxMinConvertable from '@/plugins/mixins/px-min-convertable';
import { isSameDay, isToday, getHours, getMinutes, parse } from 'date-fns';
import { format } from 'date-fns';

export default {
  components: {
    CalendarHours,
    CalendarDay,
    CalendarRuler
  },
  timers: {
    updateCurrentDate: {
      time: 500,
      autostart: true,
      repeat: true
    }
  },
  mixins: [PxMinConvertable],
  props: {
    days: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      format,
      isSameDay,
      guideTop: undefined,
      overlapDay: undefined,
      currentDate: parse(Date.now())
    };
  },
  computed: {
    hasToday() {
      return this.days.find(isToday);
    },
    currentTimeLineTop() {
      return this.toPx(
        getHours(this.currentDate) * 60 + getMinutes(this.currentDate)
      );
    }
  },
  methods: {
    updateCurrentDate() {
      this.currentDate = parse(Date.now());
    },
    getOverlapDay(el) {
      const widths = this.$refs.days.map(
        day => (this.$mezr.intersection(day.$el, el) || {}).width
      );
      const index = widths.indexOf(Math.max(...widths.filter(w => !!w)));
      return index >= 0 && this.$refs.days[index].$el.dataset.day;
    },
    updateGuideLine(top, el) {
      this.guideTop = top;
      this.overlapDay = el && this.getOverlapDay(el);
    }
  }
};
</script>

<style scoped lang="scss">
.calendar-container {
  display: flex;
  pointer-events: auto;
  position: relative;
  box-shadow: -3px 0 3px #00000005;
}
</style>
