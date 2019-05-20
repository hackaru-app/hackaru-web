<i18n src="@/assets/locales/pages/settings/licenses.json" />

<template>
  <div class="settings">
    <article>
      <heading class="is-small"
        ><icon name="gift-icon" class="icon" />{{ $t('title') }}</heading
      >
      <ul>
        <li v-for="(license, key) in licenses" :key="key">
          <a :href="license.licenseUrl" target="_blank" rel="noopener">
            {{ key }}
            <span> - {{ license.licenses }}</span>
          </a>
        </li>
      </ul>
    </article>
  </div>
</template>

<script>
import Icon from '@/components/atoms/icon';
import Heading from '@/components/atoms/heading';
import licenses from '@/assets/licenses';

export default {
  components: {
    Icon,
    Heading
  },
  data() {
    return {
      licenses
    };
  }
};
</script>

<style scoped lang="scss">
article {
  margin: 0 40px;
  padding-bottom: 50px;
  border-bottom: 1px $border solid;
  background-color: $white;
  h1 {
    display: flex;
    align-items: center;
    font-weight: normal;
    margin: 0;
    margin-top: 5px;
    height: 90px;
  }
}
ul {
  padding: 0;
  margin: 0;
  list-style-type: disc;
  list-style-position: inside;
}
li a {
  text-decoration: none;
  color: $text;
  &:hover {
    text-decoration: underline;
  }
  span {
    padding: 0;
    margin: 0;
    color: $text-light;
  }
}
@include mq(small) {
  article {
    margin-left: 30px;
    margin-right: 30px;
  }
}
</style>
