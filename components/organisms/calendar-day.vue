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
          class="ghost-event"
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
          :get-overlap-day="getOverlapDay"
          :update-guide-line="updateGuideLine"
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
import { format } from 'date-fns';

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
    updateGuideLine: {
      type: Function,
      required: true
    },
    getOverlapDay: {
      type: Function,
      required: true
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
      this.ghostVisibility = true;
      const pageY = (e.touches ? e.touches[0] : e).pageY;
      this.ghostTop = pageY - this.$mezr.offset(this.$el).top;
      this.updateGuideLine(this.ghostTop + this.ghostHeight, this.$el);
      this.$emit('ghost-drag', e);
    },
    ghostDragging(e) {
      this.updateGuideLine(this.ghostTop + this.ghostHeight, this.$el);
    },
    ghostDrop(e) {
      this.ghostVisibility = false;
      this.ghostHeight = 20;
      this.updateGuideLine();
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
