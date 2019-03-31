<template>
  <section>
    <div v-dragdrop="dragdrop" ref="events" class="events">
      <div class="row">
        <calendar-ghost-activity
          ref="ghost"
          :day="day"
          :update-guide-line="updateGuideLine"
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
    </div>
  </section>
</template>

<script>
import CalendarActivity from '@/components/organisms/calendar-activity';
import CalendarGhostActivity from '@/components/organisms/calendar-ghost-activity';
import PxMinConvertable from '@/plugins/mixins/px-min-convertable';

export default {
  components: {
    CalendarActivity,
    CalendarGhostActivity
  },
  mixins: [PxMinConvertable],
  props: {
    day: {
      type: Date,
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
      dragdrop: {
        drag: this.ghostDrag,
        dragging: this.ghostDragging,
        drop: this.ghostDrop,
        wait: 500
      }
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
      this.$refs.ghost.drag(e);
      this.$emit('ghost-drag', e);
    },
    ghostDragging(e) {
      this.$refs.ghost.dragging(e);
      this.$emit('ghost-dragging', e);
    },
    ghostDrop(e) {
      this.$refs.ghost.drop(e);
      this.$emit('ghost-drop', e);
    }
  }
};
</script>

<style scoped lang="scss">
section {
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
