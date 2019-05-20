<template>
  <dragger
    ref="dragger"
    :top.sync="top"
    :left.sync="left"
    :enabled="!resized"
    :class="['dragger', { dragging: dragged }]"
    :style="{ height: `${height}px` }"
    @start="moveStart"
    @moving="moving"
    @end="moveEnd"
    @cancel="moveCancel"
  >
    <div class="exclusiver" @mousedown="mousedown" @mouseup="mouseup">
      <calendar-event
        :style="{ height: `${height}px` }"
        :title="title"
        :color="color"
        :started-at="startedAt"
        :stopped-at="stoppedAt"
        class="event"
      />
      <resizer
        ref="resizer"
        :height.sync="height"
        :enabled="!dragged"
        :min-height="minHeight"
        :handle-color="color"
        class="resizer"
        @resizing="resizing"
        @end="resizeEnd"
        @cancel="resizeCancel"
      >
        <span class="handler" />
      </resizer>
    </div>
  </dragger>
</template>

<script>
import Dragger from '@/components/atoms/dragger';
import Resizer from '@/components/atoms/resizer';
import CalendarEvent from '@/components/atoms/calendar-event';

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
    overlappedDay: {
      type: String,
      default: undefined
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
    },
    guideTop: {
      type: Number,
      default: undefined
    }
  },
  data() {
    return {
      dragged: false,
      resized: false,
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
      return this.$toPx(
        differenceInMinutes(this.startedAt, startOfDay(this.day))
      );
    },
    getInitialHeight() {
      return Math.max(this.$toPx(this.duration / 60), this.minHeight);
    },
    resetPosition() {
      this.top = this.getInitialTop();
      this.height = this.getInitialHeight();
      this.left = 0;
    },
    moveStart(e) {
      this.dragged = true;
      this.$emit('dragging', {
        el: this.$el,
        guideRulerTop: this.top
      });
    },
    moving(e) {
      this.$emit('dragging', {
        el: this.$el,
        guideRulerTop: this.top
      });
    },
    moveEnd(e) {
      this.$emit('drop');

      if (!this.overlappedDay) {
        return this.resetPosition();
      }
      const date = addMinutes(
        startOfDay(this.overlappedDay),
        this.$toMin(this.top)
      );

      this.update({
        startedAt: date,
        stoppedAt: addSeconds(date, this.duration)
      });
    },
    moveCancel(e) {
      this.$emit('drop');
    },
    resizing(e) {
      this.resized = true;
      this.$emit('dragging', {
        el: this.$el,
        guideRulerTop: this.top + this.height
      });
    },
    resizeEnd(e) {
      this.$emit('drop');
      const stoppedAt = addMinutes(this.startedAt, this.$toMin(this.height));
      this.update({ stoppedAt });
    },
    resizeCancel(e) {
      this.$emit('drop');
    },
    mousedown(e) {
      this.resized = false;
      this.dragged = false;
    },
    mouseup(e) {
      const clickOnly = !this.resized && !this.dragged;
      if (clickOnly) this.showModal();
      this.resized = false;
      this.dragged = false;
    },
    showModal() {
      this.$modal.show('activity', {
        id: this.id,
        description: this.description,
        startedAt: this.startedAt,
        stoppedAt: this.stoppedAt,
        duration: this.duration,
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
.event {
  height: 100%;
}
.handler {
  position: absolute;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  padding: 5px;
  padding-top: 15px;
  right: 0;
  bottom: 0;
  width: 100%;
  cursor: s-resize;
}
@include mq(small) {
  .handler {
    left: auto;
    right: 0;
    width: 100%;
  }
}
.dragger.dragging {
  opacity: 1;
  box-shadow: 0 3px 8px -3px #00000020;
}
.resizer {
  align-items: center;
}
.exclusiver {
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
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
