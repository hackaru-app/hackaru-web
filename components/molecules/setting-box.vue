<template>
  <article>
    <heading class="is-small">
      <slot name="heading" />
    </heading>
    <slot />
  </article>
</template>

<script>
import Heading from '~/components/atoms/heading';

export default {
  components: {
    Heading,
  },
};
</script>

<style scoped lang="scss">
article {
  border-bottom: 1px $border solid;
  margin: 0 40px;
  padding-bottom: 40px;
  h1 {
    align-items: center;
    display: flex;
    font-size: 16px;
    font-weight: normal;
    height: 90px;
    margin: 0;
    margin-top: 5px;
  }
}
article form {
  display: flex;
  flex-direction: column;
  button {
    align-self: flex-start;
    margin-top: 10px;
  }
}

@include mq(small) {
  article {
    margin-left: 30px;
    margin-right: 30px;
  }
}
</style>
