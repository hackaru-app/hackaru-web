<i18n src="@/assets/locales/pages/settings/licenses.json" />

<template>
  <div class="settings">
    <article>
      <heading class="is-small"
        ><icon name="zap-icon" class="icon" />Hackaru</heading
      >
      <ul>
        <li>
          <a
            href="https://github.com/ktmouk/hackaru"
            target="_blank"
            rel="noopener"
            >ktmouk/hackaru</a
          >
          -
          <a
            href="https://raw.githubusercontent.com/ktmouk/hackaru/master/LICENSE"
            target="_blank"
            rel="noopener"
            ><span>MIT</span></a
          >
        </li>
      </ul>
    </article>
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
  padding: 0 40px;
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
    padding-left: 30px;
    padding-right: 30px;
  }
}
</style>
