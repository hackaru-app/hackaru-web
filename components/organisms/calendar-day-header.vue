<template>
  <header :class="{ today: isToday(day) }">
    <button @click="click">
      <h1>{{ format(day, 'DD') }}</h1>
      <small>{{ format(day, 'dd', { locale: locale }) }}</small>
    </button>
  </header>
</template>

<script>
import { format, isToday } from 'date-fns';

export default {
  props: {
    day: {
      type: Date,
      required: true
    },
    locale: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      format,
      isToday
    };
  },
  methods: {
    click() {
      this.$emit('click', this.day);
    }
  }
};
</script>

<style scoped lang="scss">
header {
  flex: 1;
  width: 1px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 65px;
  box-sizing: border-box;
  border-left: 1px $border solid;
}
header button {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border: 0;
  background: none;
  cursor: pointer;
  transition: all 0.3s ease;
  &:active {
    transform: scale(0.9);
  }
}
header h1 {
  display: flex;
  font-weight: normal;
  font-size: 16px;
  margin: 0;
  padding: 0;
  justify-content: center;
  align-items: flex-end;
  color: $text;
}
header small {
  color: $text-light;
  padding-left: 5px;
}
header.today h1,
header.today small {
  color: $cyan;
}
@include mq(small) {
  header button {
    flex-direction: column;
  }
  header small {
    padding: 0;
  }
}
</style>
