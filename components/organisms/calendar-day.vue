<template>
  <resizer
    ref="resizer"
    :height.sync="ghostHeight"
    :min-height="20"
    :delay="500"
    class="calendar-day"
    @start="ghostDrag"
    @resizing="ghostDragging"
    @end="ghostDrop"
    @cancel="ghostDrop"
  >
    <section class="events">
      <div class="row">
        <calendar-event
          v-show="ghostVisibility"
          :style="{
            top: `${ghostTop}px`,
            height: `${ghostHeight}px`,
          }"
          data-test-id="ghost-activity"
          title="No Project"
          color="#cccfd9"
        />
      </div>
      <div
        v-for="(pack, index) in calendar"
        :key="index"
        class="row"
        @mousedown.stop
        @pointerdown.stop
        @touchstart.stop
      >
        <calendar-activity
          v-for="activity in pack"
          v-bind="activity"
          :key="activity.id"
          :day="day"
          :overlapped-day="overlappedDay"
          @dragging="dragging"
          @drop="drop"
        />
      </div>
    </section>
  </resizer>
</template>

<script>
import Resizer from '~/components/atoms/resizer';
import CalendarEvent from '~/components/atoms/calendar-event';
import CalendarActivity from '~/components/organisms/calendar-activity';
import {
  format,
  startOfDay,
  addMinutes,
  parseISO,
  formatISO,
  differenceInSeconds,
} from 'date-fns';

export default {
  components: {
    Resizer,
    CalendarEvent,
    CalendarActivity,
  },
  props: {
    day: {
      type: String,
      required: true,
    },
    minHeight: {
      type: Number,
      default: 20,
    },
    overlappedDay: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      format,
      ghostTop: 0,
      ghostHeight: 30,
      ghostVisibility: false,
    };
  },
  computed: {
    calendar() {
      return this.$store.getters['activities/getCalendar'](
        this.day,
        this.$toMin
      );
    },
  },
  methods: {
    ghostDrag(e) {
      const pageY = (e.touches ? e.touches[0] : e).pageY;
      this.ghostVisibility = true;
      this.ghostTop = pageY - this.$mezr.offset(this.$el).top;
      this.dragging({
        el: this.$el,
        guideRulerTop: this.ghostTop + this.ghostHeight,
      });
    },
    ghostDragging() {
      this.dragging({
        el: this.$el,
        guideRulerTop: this.ghostTop + this.ghostHeight,
      });
    },
    async ghostDrop() {
      this.drop(this.$el);
      await this.addActivity();
      this.ghostVisibility = false;
      this.ghostHeight = 20;
    },
    dragging({ el, guideRulerTop }) {
      this.$emit('dragging', {
        el,
        guideRulerTop,
      });
    },
    drop(el) {
      this.$emit('drop', el);
    },
    async addActivity() {
      const startedAt = addMinutes(
        startOfDay(parseISO(this.day)),
        this.$toMin(this.ghostTop)
      );
      const stoppedAt = addMinutes(startedAt, this.$toMin(this.ghostHeight));
      await this.$store.dispatch('activities/add', {
        startedAt,
        stoppedAt,
      });
      this.$mixpanel.track('Add activity', {
        component: 'calendar-day',
        descriptionLength: 0,
        startedAt: formatISO(startedAt),
        stoppedAt: formatISO(stoppedAt),
        duration: differenceInSeconds(stoppedAt, startedAt),
      });
      this.$ga.event({
        eventCategory: 'Activities',
        eventAction: 'add',
      });
    },
  },
};
</script>

<style scoped lang="scss">
.calendar-day {
  border-left: 1px $border-dark solid;
  box-sizing: border-box;
  flex: 1;
  max-width: 100%;
  user-select: none;

  &.overlapped {
    background: $background-hover;
  }
}

.events {
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  margin-right: 5px;
  position: relative;
}

.row {
  display: flex;
  flex: 1;
  pointer-events: none;
  position: absolute;
  width: 100%;
}
</style>
