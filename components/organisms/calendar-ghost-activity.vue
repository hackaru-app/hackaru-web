<template>
  <resizer
    v-show="visibility"
    ref="resizer"
    :style="{ top: `${top}px` }"
    :height.sync="height"
    class="calendar-ghost-activity"
  >
    <calendar-event title="New Activity" color="#cccfd9" class="ghost-event" />
  </resizer>
</template>

<script>
import CalendarEvent from '@/components/atoms/calendar-event';
import Resizer from '@/components/atoms/resizer';
import PxMinConvertable from '@/plugins/mixins/px-min-convertable';
import { startOfDay, addMinutes } from 'date-fns';

export default {
  components: {
    CalendarEvent,
    Resizer
  },
  mixins: [PxMinConvertable],
  props: {
    day: {
      type: Date,
      required: true
    },
    updateGuideLine: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      height: 20,
      top: 0,
      visibility: false
    };
  },
  methods: {
    drag({ e }) {
      this.visibility = true;
      const pageY = (e.touches ? e.touches[0] : e).pageY;
      this.top = pageY - this.$mezr.offset(e.target).top;
      this.$refs.resizer.drag(e);
      this.updateGuideLine(this.top + this.height, this.$el);
    },
    dragging(e) {
      this.$refs.resizer.dragging(e);
      this.updateGuideLine(this.top + this.height, this.$el);
    },
    async drop(e) {
      this.$refs.resizer.drop(e);
      this.updateGuideLine();
      await this.addActivity();
      this.visibility = false;
      this.height = 20;
    },
    async addActivity(params) {
      const date = addMinutes(startOfDay(this.day), this.toMin(this.top));
      await this.$store.dispatch('activities/addActivity', {
        startedAt: date,
        stoppedAt: addMinutes(date, this.toMin(this.height))
      });
      this.$ga.event('activity', 'addActivity');
    }
  }
};
</script>

<style scoped>
.calendar-ghost-activity {
  opacity: 0.6;
  position: relative;
  box-shadow: 0 3px 3px #00000020;
  display: flex;
  flex: 1;
  overflow: hidden;
}
</style>
