<template>
  <section class="calendar-content">
    <calendar-hours />
    <div v-if="hasToday">
      <calendar-ruler
        :top="currentTimeLineTop"
        class="today-ruler"
        color="#eb4f34"
      />
    </div>
    <calendar-ruler
      v-if="guideRulerTop"
      :top="guideRulerTop"
      class="guide-ruler"
      color="#2e99b0"
      show-time
    />
    <calendar-day
      v-for="day in days"
      ref="days"
      :data-day="day"
      :class="{ overlapped: isSameDay(overlappedDay, day) }"
      :overlapped-day="overlappedDay"
      :key="`${day}`"
      :day="day"
      @dragging="dragging"
      @drop="drop"
    />
  </section>
</template>

<script>
import CalendarHours from '@/components/organisms/calendar-hours';
import CalendarRuler from '@/components/organisms/calendar-ruler';
import CalendarDay from '@/components/organisms/calendar-day';
import PxMinConvertable from '@/plugins/mixins/px-min-convertable';
import {
  format,
  isSameDay,
  isToday,
  getHours,
  getMinutes,
  parse
} from 'date-fns';

function getMaxIndex(values) {
  const maxValue = Math.max(...values.filter(value => !!value));
  return values.indexOf(maxValue);
}

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
      guideRulerTop: undefined,
      overlappedDay: undefined,
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
    getOverlappedDay(el) {
      if (!el) return;
      const days = this.$refs.days;
      const getWidth = $el => (this.$mezr.intersection($el, el) || {}).width;
      const maxIndex = getMaxIndex(days.map(({ $el }) => getWidth($el)));
      if (maxIndex >= 0) return days[maxIndex].$el.dataset.day;
    },
    dragging({ el, guideRulerTop }) {
      this.overlappedDay = this.getOverlappedDay(el);
      this.guideRulerTop = guideRulerTop;
      this.$emit('dragging', el);
    },
    drop(el) {
      this.overlappedDay = undefined;
      this.guideRulerTop = undefined;
      this.$emit('drop', el);
    }
  }
};
</script>

<style scoped lang="scss">
.calendar-content {
  display: flex;
  pointer-events: auto;
  position: relative;
  box-shadow: -3px 0 3px #00000005;
}
</style>
