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
      :class="['day', { overlapped: isOverlapped(day) }]"
      :overlapped-day="overlappedDay"
      :data-day="`${format(day, 'yyyy-MM-dd')}`"
      :key="`${format(day, 'yyyy-MM-dd HH:mm:ss')}`"
      :day="`${format(day, 'yyyy-MM-dd HH:mm:ss')}`"
      @dragging="dragging"
      @drop="drop"
    />
  </section>
</template>

<script>
import CalendarHours from '@/components/organisms/calendar-hours';
import CalendarRuler from '@/components/organisms/calendar-ruler';
import CalendarDay from '@/components/organisms/calendar-day';
import {
  format,
  isSameDay,
  isToday,
  getHours,
  getMinutes,
  parseISO
} from 'date-fns';

function getMaxValueIndex(values) {
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
  props: {
    days: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      format,
      parseISO,
      guideRulerTop: undefined,
      overlappedDay: undefined,
      currentDate: new Date()
    };
  },
  computed: {
    hasToday() {
      return this.days.find(day => isToday(day));
    },
    currentTimeLineTop() {
      return this.$toPx(
        getHours(this.currentDate) * 60 + getMinutes(this.currentDate)
      );
    }
  },
  methods: {
    isOverlapped(day) {
      return isSameDay(parseISO(this.overlappedDay), day);
    },
    updateCurrentDate() {
      this.currentDate = new Date();
    },
    getOverlappedDay(el) {
      if (!el) return;
      const days = this.$refs.days;
      const getWidth = $el => (this.$mezr.intersection($el, el) || {}).width;
      const index = getMaxValueIndex(days.map(({ $el }) => getWidth($el)));
      if (index >= 0) return days[index].$el.dataset.day;
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
  box-shadow: -3px 0 3px $shadow;
}
</style>
