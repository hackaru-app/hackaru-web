<template>
  <article>
    <heading class="is-small">
      <slot name="heading" />
    </heading>
    <slot />
  </article>
</template>

<script>
import Icon from '@/components/atoms/icon';
import Heading from '@/components/atoms/heading';

export default {
  components: {
    Icon,
    Heading
  }
};
</script>

<style scoped lang="scss">
article {
  margin: 0 40px;
  padding-bottom: 40px;
  background-color: $white;
  border-bottom: 1px $border solid;
  h1 {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: normal;
    margin: 0;
    margin-top: 5px;
    height: 90px;
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
