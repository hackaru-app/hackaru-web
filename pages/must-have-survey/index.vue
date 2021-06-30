<i18n src="~/assets/locales/pages/must-have-survey/index.json"></i18n>

<template>
  <div class="wrapper">
    <login-guard />
    <header class="header">
      <div class="logo-container">
        <img src="~/assets/images/logo.svg" />
      </div>
      <h1>{{ $t('title') }}</h1>
      <p>
        {{ $t('description.0') }}<br />{{ $t('description.1') }}<br />{{
          $t('description.2')
        }}
      </p>
    </header>
    <form class="form" @submit.prevent="answer">
      <section class="questions">
        <section class="question">
          <h1 class="question-title">Q. {{ $t('q1.title') }}</h1>
          <label v-for="option in $t('q1.options')" :key="option.text"
            ><input
              v-model="mustHaveLevel"
              :value="option.value"
              type="radio"
              name="must-have-level"
              required
            />{{ option.text }}</label
          >
        </section>
      </section>

      <section class="questions">
        <section class="question">
          <h1 class="question-title">Q. {{ $t('q2.title') }}</h1>
          <label v-for="option in $t('q2.options')" :key="option.text"
            ><input
              v-model="alternativePresent"
              :value="option.value"
              type="radio"
              name="alternative-present"
              required
            />{{ option.text }}</label
          >
        </section>

        <section v-if="alternativePresent" class="sub-question">
          <h1 class="question-title">Q. {{ $t('q3.title') }}</h1>
          <input
            v-model="alternativeDetail"
            :placeholder="$t('q3.placeholder')"
            type="text"
            required
          />
        </section>
      </section>

      <section class="questions">
        <section class="question">
          <h1 class="question-title">Q. {{ $t('q4.title') }}</h1>
          <input
            v-model="coreValue"
            :placeholder="$t('q4.placeholder')"
            type="text"
            required
          />
        </section>
      </section>

      <section class="questions">
        <section class="question">
          <h1 class="question-title">Q. {{ $t('q5.title') }}</h1>
          <label v-for="option in $t('q5.options')" :key="option.text"
            ><input
              v-model="recommended"
              :value="option.value"
              type="radio"
              name="recommended"
              required
            />{{ option.text }}</label
          >
        </section>

        <section v-if="recommended" class="sub-question">
          <h1 class="question-title">Q. {{ $t('q6.title') }}</h1>
          <input
            v-model="recommendedDetail"
            :placeholder="$t('q6.placeholder')"
            type="text"
            required
          />
        </section>
      </section>

      <section class="questions">
        <section class="question">
          <h1 class="question-title">Q. {{ $t('q7.title') }}</h1>
          <input
            v-model="targetUserDetail"
            :placeholder="$t('q7.placeholder')"
            type="text"
            required
          />
        </section>
      </section>

      <section class="questions">
        <section class="question">
          <h1 class="question-title">Q. {{ $t('q8.title') }}</h1>
          <textarea
            v-model="featureRequest"
            :placeholder="$t('q8.placeholder')"
            type="text"
            required
          />
        </section>
      </section>

      <section class="questions">
        <section class="question">
          <h1 class="question-title">{{ $t('q9.title') }}</h1>
          <p v-if="!!$t('q9.description')" class="question-description">
            {{ $t('q9.description') }}
          </p>
          <label v-for="option in $t('q9.options')" :key="option.text"
            ><input
              v-model="interviewAccept"
              :value="option.value"
              type="radio"
              name="interview-accept"
              required
            />{{ option.text }}</label
          >
        </section>

        <section v-if="interviewAccept" class="sub-question">
          <h1 class="question-title">{{ $t('q10.title') }}</h1>
          <input
            v-model="email"
            :placeholder="$t('q10.placeholder')"
            type="email"
            required
          />
        </section>
      </section>

      <footer class="footer">
        <base-button type="submit" class="is-rounded is-primary">
          {{ $t('send') }}
        </base-button>
      </footer>
    </form>
  </div>
</template>

<script>
import LoginGuard from '~/components/atoms/login-guard';
import BaseButton from '~/components/atoms/base-button';

export default {
  components: {
    LoginGuard,
    BaseButton,
  },
  data() {
    return {
      mustHaveLevel: undefined,
      alternativePresent: undefined,
      alternativeDetail: '',
      coreValue: '',
      recommended: undefined,
      recommendedDetail: '',
      targetUserDetail: '',
      featureRequest: '',
      interviewAccept: undefined,
      email: '',
    };
  },
  watch: {
    alternativePresent() {
      if (!this.alternativePresent) {
        this.alternativeDetail = '';
      }
    },
    recommended() {
      if (!this.recommended) {
        this.recommendedDetail = '';
      }
    },
    interviewAccept() {
      if (!this.interviewAccept) {
        this.email = '';
      }
    },
  },
  methods: {
    async answer() {
      const success = await this.$store.dispatch('must-have-survey/answer', {
        mustHaveLevel: this.mustHaveLevel,
        alternativePresent: this.alternativePresent,
        alternativeDetail: this.alternativeDetail,
        coreValue: this.coreValue,
        recommended: this.recommended,
        recommendedDetail: this.recommendedDetail,
        targetUserDetail: this.targetUserDetail,
        featureRequest: this.featureRequest,
        interviewAccept: this.interviewAccept,
        email: this.email,
        locale: this.$i18n.locale,
      });
      if (success) {
        this.$router.replace(this.localePath('/must-have-survey/answered'));
      }
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
}
.header {
  text-align: center;
  padding-top: 60px;
  padding-bottom: 40px;
}
.logo-container {
  background-color: $background-dark;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  border-radius: 3px;
  box-shadow: 0 3px 3px $shadow-dark;
}
.header h1 {
  font-size: 21px;
  margin-top: 30px;
  color: $text;
  font-weight: normal;
  margin-bottom: 10px;
}
.header p {
  color: $text-light;
  letter-spacing: 1px;
  margin: 0 auto;
}
.form {
  max-width: 600px;
  margin: 40px auto;
  margin-bottom: 100px;
}
.questions {
  background-color: $background-light;
  border: 1px solid $border;
  box-shadow: 0 5px 20px $shadow-dark;
  border-radius: 5px;
  margin-bottom: 30px;
}
.question-title {
  margin-bottom: 30px;
  font-size: 16px;
  vertical-align: top;
}
.question-description {
  margin-bottom: 30px;
  color: $text-light;
}
.question {
  padding: 40px;
}
.sub-question {
  padding: 40px;
  padding-left: 50px;
  border-top: 1px solid $border;
}
label {
  display: block;
  margin-bottom: 10px;
}
input[type='radio'] {
  margin-right: 10px;
}
input[type='text'],
input[type='email'] {
  min-width: 100%;
  border-bottom: 1px solid $border;
  height: 50px;
  &::placeholder {
    color: $text-light;
    opacity: 1;
  }
  &:focus {
    border-color: $yellow;
  }
  &:placeholder-shown {
    border-color: $border;
  }
  &:placeholder-shown:focus {
    border-color: $yellow;
  }
}
textarea {
  min-width: 100%;
  padding: 20px;
  border: 1px solid $border;
  &::placeholder {
    color: $text-light;
    opacity: 1;
  }
  &:focus {
    border-color: $yellow;
  }
  &:placeholder-shown {
    border-color: $border;
  }
  &:placeholder-shown:focus {
    border-color: $yellow;
  }
}
.footer {
  margin: 40px;
  button {
    width: 50%;
    margin: 20px auto;
  }
}
@include mq(small) {
  .header h1 {
    font-size: 18px;
  }
  .header p {
    padding: 0 40px;
  }
  .questions {
    border-radius: 0;
    border-left: 0;
    border-right: 0;
  }
  .question {
    padding: 40px 30px;
  }
}
</style>
