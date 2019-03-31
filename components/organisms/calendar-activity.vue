<template>
  <dragger
    ref="dragger"
    :top.sync="top"
    :left.sync="left"
    :class="['dragger', { dragging }]"
    :style="{ height: `${height}px` }"
    @start="moveStart"
    @moving="moving"
    @end="moveEnd"
    @cancel="moveCancel"
  >
    <div @mousedown="mousedown" @mouseup="mouseup">
      <resizer
        ref="resizer"
        :height.sync="height"
        :disabled="dragging"
        :min-height="minHeight"
        :handle-color="color"
        class="resizer"
        @resizing="resizing"
        @end="resizeEnd"
        @cancel="resizeCancel"
      >
        <calendar-event
          :title="title"
          :color="color"
          :started-at="startedAt"
          :stopped-at="stoppedAt"
        />
      </resizer>
    </div>
  </dragger>
</template>

<script>
import Dragger from '@/components/atoms/dragger';
import Resizer from '@/components/atoms/resizer';
import CalendarEvent from '@/components/atoms/calendar-event';
import PxMinConvertable from '@/plugins/mixins/px-min-convertable';
import {
  startOfDay,
  addSeconds,
  differenceInMinutes,
  addMinutes
} from 'date-fns';

export default {
  components: {
    CalendarEvent,
    Dragger,
    Resizer
  },
  mixins: [PxMinConvertable],
  props: {
    id: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    stoppedAt: {
      type: String,
      required: true
    },
    day: {
      type: Date,
      required: true
    },
    startedAt: {
      type: String,
      required: true
    },
    getOverlapDay: {
      type: Function,
      required: true
    },
    updateGuideLine: {
      type: Function,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    minHeight: {
      type: Number,
      default: 20
    },
    project: {
      type: Object,
      default: () => undefined
    }
  },
  data() {
    return {
      dragging: false,
      resizeMoved: false,
      top: this.getInitialTop(),
      height: this.getInitialHeight(),
      left: 0
    };
  },
  computed: {
    title() {
      return this.project ? this.project.name : 'No Project';
    },
    color() {
      return this.project ? this.project.color : '#cccfd9';
    }
  },
  watch: {
    startedAt: function() {
      this.resetPosition();
    },
    duration: function() {
      this.resetPosition();
    }
  },
  methods: {
    getInitialTop() {
      return this.toPx(
        differenceInMinutes(this.startedAt, startOfDay(this.day))
      );
    },
    getInitialHeight() {
      return Math.max(this.toPx(this.duration / 60), this.minHeight);
    },
    resetPosition() {
      this.top = this.getInitialTop();
      this.height = this.getInitialHeight();
      this.left = 0;
    },
    moveStart(e) {
      this.dragging = true;
      this.updateGuideLine(this.top, this.$el);
    },
    moving(e) {
      this.updateGuideLine(this.top, this.$el);
    },
    moveEnd(e) {
      this.updateGuideLine();

      const day = this.getOverlapDay(this.$el);
      if (!day) return this.resetPosition();

      const date = addMinutes(startOfDay(day), this.toMin(this.top));
      this.update({
        startedAt: date,
        stoppedAt: addSeconds(date, this.duration)
      });
    },
    moveCancel(e) {
      this.updateGuideLine();
    },
    resizing(e) {
      this.resizeMoved = true;
      this.updateGuideLine(this.top + this.height, this.$el);
    },
    resizeEnd(e) {
      this.updateGuideLine();
      const stoppedAt = addMinutes(this.startedAt, this.toMin(this.height));
      this.update({ stoppedAt });
    },
    resizeCancel(e) {
      this.updateGuideLine();
    },
    mousedown(e) {
      this.resizeMoved = false;
      this.dragging = false;
    },
    mouseup(e) {
      if (!this.resizeMoved && !this.dragging) {
        this.showModal();
      }
      this.resizeMoved = false;
      this.dragging = false;
    },
    showModal() {
      this.$modal.show('activity', {
        id: this.id,
        description: this.description,
        startedAt: this.startedAt,
        stoppedAt: this.stoppedAt,
        project: this.project
      });
    },
    async update(payload) {
      await this.$store.dispatch('activities/updateActivity', {
        id: this.id,
        ...payload
      });
      this.$ga.event('activity', 'updateActivity');
    }
  }
};
</script>

<style scoped lang="scss">
.dragger {
  flex: 1;
  position: relative;
  box-sizing: border-box;
  display: flex;
  padding: 0;
  align-items: center;
  overflow: hidden;
  pointer-events: auto;
  transition: box-shadow 0.3s, opacity 0.3s;
  &:hover,
  &:active {
    opacity: 0.8;
  }
}
.dragger.dragging {
  opacity: 1;
  box-shadow: 0 3px 8px -3px #00000020;
}
.resizer {
  align-items: center;
}
div {
  display: flex;
  flex: 1;
  width: 100%;
  overflow: hidden;
  align-items: center;
}
h1 {
  font-size: 12px;
  line-height: 20px;
  margin: 0;
  padding: 0 10px;
  font-weight: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
@include mq(small) {
  h1 {
    font-size: 9px;
    padding: 0 5px;
  }
}
</style>
