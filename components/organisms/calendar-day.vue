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
    <section ref="events" class="events">
      <div class="row">
        <calendar-event
          v-show="ghostVisibility"
          :style="{
            top: `${ghostTop}px`,
            height: `${ghostHeight}px`
          }"
          class="ghost-activity"
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
import Resizer from '@/components/atoms/resizer';
import CalendarEvent from '@/components/atoms/calendar-event';
import CalendarActivity from '@/components/organisms/calendar-activity';
import { format, startOfDay, addMinutes, parseISO } from 'date-fns';

export default {
  components: {
    Resizer,
    CalendarEvent,
    CalendarActivity
  },
  props: {
    day: {
      type: String,
      required: true
    },
    minHeight: {
      type: Number,
      default: 20
    },
    overlappedDay: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      format,
      ghostTop: 0,
      ghostHeight: 30,
      ghostVisibility: false
    };
  },
  computed: {
    calendar() {
      return this.$store.getters['activities/getCalendar'](
        this.day,
        this.$toMin
      );
    }
  },
  methods: {
    ghostDrag(e) {
      const pageY = (e.touches ? e.touches[0] : e).pageY;
      this.ghostVisibility = true;
      this.ghostTop = pageY - this.$mezr.offset(this.$el).top;
      this.dragging({
        el: this.$el,
        guideRulerTop: this.ghostTop + this.ghostHeight
      });
    },
    ghostDragging(e) {
      this.dragging({
        el: this.$el,
        guideRulerTop: this.ghostTop + this.ghostHeight
      });
    },
    async ghostDrop(e) {
      this.drop(this.$el);
      await this.addActivity();
      this.ghostVisibility = false;
      this.ghostHeight = 20;
    },
    dragging({ el, guideRulerTop }) {
      this.$emit('dragging', {
        el,
        guideRulerTop
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
      await this.$store.dispatch('activities/add', {
        startedAt,
        stoppedAt: addMinutes(startedAt, this.$toMin(this.ghostHeight))
      });
      this.$gtm.trackEvent({
        name: 'add_activity',
        component: 'calendar_day'
      });
    }
  }
};
</script>

<style scoped lang="scss">
.calendar-day {
  flex: 1;
  border-left: 1px $border solid;
  box-sizing: border-box;
  user-select: none;
  max-width: 100%;
  &.overlapped {
    background: $grey-fafafa;
  }
}
.events {
  flex: 1;
  display: flex;
  position: relative;
  flex-direction: column;
  margin-right: 5px;
  height: 100%;
}
.row {
  flex: 1;
  position: absolute;
  display: flex;
  width: 100%;
  pointer-events: none;
}
</style>
