<template>
  <div class="datetime-picker">
    <input
      ref="date"
      :value="date"
      data-test-id="date"
      class="date"
      type="date"
      step="1"
      @input="update"
    />
    <input
      ref="time"
      :value="time"
      data-test-id="time"
      class="time"
      type="time"
      step="1"
      @input="update"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  props: {
    value: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      date: '',
      time: '',
    };
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        if (!this.value) return;
        if (this.getDayJs().isSame(this.value)) return;
        this.date = dayjs(this.value).format('YYYY-MM-DD');
        this.time = dayjs(this.value).format('HH:mm:ss');
      },
    },
  },
  methods: {
    getDayJs() {
      if (this.$refs.date && this.$refs.time) {
        return dayjs([this.$refs.date.value, this.$refs.time.value].join(' '));
      } else {
        return dayjs();
      }
    },
    update() {
      const date = this.getDayJs();
      this.$emit('input', date.isValid() ? date.format() : undefined);
    },
  },
};
</script>

<style scoped lang="scss">
.datetime-picker {
  display: flex;
  flex: 1;
}
.datetime-picker input {
  margin-right: 10px;
  border: 0;
  width: 100%;
  max-width: 160px;
  height: 46px;
  border-radius: 0;
  background: none;
  border-bottom: 1px $border solid;
  &:last-child {
    margin-right: 0;
  }
}
</style>
