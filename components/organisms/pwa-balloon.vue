<i18n src="@/assets/locales/components/organisms/pwa-ballon.json" />

<template>
  <transition
    enter-active-class="fadeInUp"
    leave-active-class="fadeOutDown"
    appear
  >
    <div
      v-if="visibility && $platform.isIOS() && !$platform.isPWA()"
      class="pwa-balloon"
    >
      <base-button type="button" class="has-icon close-button" @click="close">
        <icon name="x-icon" />
      </base-button>
      <div class="content">
        <section class="logo">
          <img src="@/assets/logo.svg" />
        </section>
        <section class="about">
          <h1>{{ $t('title') }}</h1>
          <i18n path="about" tag="p">
            <icon name="share-icon" class="share-icon" />
          </i18n>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
import Icon from '@/components/atoms/icon';
import BaseButton from '@/components/atoms/base-button';

export default {
  components: {
    Icon,
    BaseButton
  },
  data() {
    return {
      visibility: false
    };
  },
  mounted() {
    this.visibility = !localStorage.hidePwaBallon;
  },
  methods: {
    close() {
      this.visibility = false;
      localStorage.setItem('hidePwaBallon', true);
    }
  }
};
</script>

<style scoped lang="scss">
.pwa-balloon {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  right: 15px;
  top: 15px;
  width: 100vw;
  max-width: 400px;
  padding: 15px;
  box-sizing: border-box;
  z-index: index($z, pwa-ballon);
}
.content {
  position: relative;
  justify-content: center;
  display: flex;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 3px 10px 0 #00000010;
  &::before {
    content: '';
    position: absolute;
    top: -15px;
    margin-left: 75px;
    width: 0;
    height: 0;
    border-right: 15px solid transparent;
    border-bottom: 15px solid #fff;
    border-left: 15px solid transparent;
    filter: drop-shadow(0 -4px 4px #00000010);
  }
}
.logo {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  display: flex;
  background: $background-dark;
  border-radius: 3px;
  margin-right: 20px;
  justify-content: center;
  align-items: center;
  .icon {
    color: $yellow;
  }
}
.about {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: column;
  h1 {
    font-size: $font-size;
    margin: 0;
    padding: 0;
    font-weight: normal;
    margin-bottom: 3px;
  }
  p {
    padding: 0;
    margin: 0;
    font-size: 13px;
    color: $text-light;
  }
}
.share-icon {
  margin: 0 5px;
}
.close-button {
  position: absolute;
  right: 15px;
  top: 15px;
  padding: 20px;
  margin: -20px;
  .icon {
    color: $grey-999;
  }
}
@include mq(small) {
  .pwa-balloon {
    top: auto;
    right: auto;
    bottom: 15px;
  }
  .content::before {
    border: 0;
    top: auto;
    bottom: -15px;
    margin: 0;
    border-top: 15px solid #fff;
    border-right: 15px solid transparent;
    border-left: 15px solid transparent;
    filter: drop-shadow(0 4px 4px #00000010);
  }
}
</style>
