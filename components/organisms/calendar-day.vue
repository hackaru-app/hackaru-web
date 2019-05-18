<template>
  <resizer
    :height.sync="ghostHeight"
    :min-height="20"
    :delay="500"
    class="calendar-day"
    @start="ghostDrag"
    @resizing="ghostDragging"
    @end="ghostDrop"
  >
    <section ref="events" class="events">
      <div class="row">
        <calendar-event
          v-show="ghostVisibility"
          :style="{
            top: `${ghostTop}px`,
            height: `${ghostHeight}px`
          }"
          title="New Activity"
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
          @update-guide-ruler-top="emitUpdateGuideRulerTop"
          @update-overlapped-day="emitUpdateOverlappedDay"
        />
      </div>
    </section>
  </resizer>
</template>

<script>
import Resizer from '@/components/atoms/resizer';
import CalendarEvent from '@/components/atoms/calendar-event';
import CalendarActivity from '@/components/organisms/calendar-activity';
import PxMinConvertable from '@/plugins/mixins/px-min-convertable';
import { format, startOfDay, addMinutes } from 'date-fns';

export default {
  components: {
    Resizer,
    CalendarEvent,
    CalendarActivity
  },
  mixins: [PxMinConvertable],
  props: {
    day: {
      type: String,
      required: true
    },
    minHeight: {
      type: Number,
      default: 20
    },
    guideRulerTop: {
      type: Number,
      default: undefined
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
      ghostHeight: 20,
      ghostVisibility: false
    };
  },
  computed: {
    calendar() {
      return this.$store.getters['activities/getCalendar'](
        this.day,
        this.toMin
      );
    }
  },
  methods: {
    ghostDrag(e) {
      const pageY = (e.touches ? e.touches[0] : e).pageY;
      this.ghostVisibility = true;
      this.ghostTop = pageY - this.$mezr.offset(this.$el).top;
      this.emitUpdateGuideRulerTop(this.ghostTop + this.ghostHeight);
      this.emitUpdateOverlappedDay(this.$el);
    },
    ghostDragging(e) {
      this.emitUpdateGuideRulerTop(this.ghostTop + this.ghostHeight);
      this.emitUpdateOverlappedDay(this.$el);
    },
    async ghostDrop(e) {
      this.emitUpdateGuideRulerTop(undefined);
      this.emitUpdateOverlappedDay(undefined);
      await this.addActivity();
      this.ghostVisibility = false;
      this.ghostHeight = 20;
    },
    emitUpdateOverlappedDay(el) {
      this.$emit('update-overlapped-day', el);
    },
    emitUpdateGuideRulerTop(top) {
      this.$emit('update:guideRulerTop', top);
    },
    async addActivity() {
      const startedAt = addMinutes(
        startOfDay(this.day),
        this.toMin(this.ghostTop)
      );
      await this.$store.dispatch('activities/addActivity', {
        startedAt,
        stoppedAt: addMinutes(startedAt, this.toMin(this.ghostHeight))
      });
      this.$ga.event('activity', 'addActivity');
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
