export default {
  inject: ['pxPerMin'],
  methods: {
    toPx(min) {
      return min * this.pxPerMin;
    },
    toMin(px) {
      return px / this.pxPerMin;
    }
  }
};
