<template>
  <div>
    <v-container class="common-page-container">
      <h1>{{ $t('termsOfUse.title') }}</h1>
      <h2 class="mt-10">
        {{ $t('termsOfUse.summary') }}
      </h2>
      <ul>
        <li>{{ $t('termsOfUse.article_1') }}</li>
        <li>{{ $t('termsOfUse.article_2') }}</li>
        <li>
          {{ $t('termsOfUse.article_3') }}
          <ul>
            <li>{{ $t('termsOfUse.article_3_1') }}</li>
            <li>{{ $t('termsOfUse.article_3_2') }}</li>
            <li>{{ $t('termsOfUse.article_3_3') }}</li>
          </ul>
        </li>
        <li>
          {{ $t('termsOfUse.article_4') }}
          <ul>
            <li>{{ $t('termsOfUse.article_4_1') }}</li>
            <li>{{ $t('termsOfUse.article_4_2') }}</li>
            <li>{{ $t('termsOfUse.article_4_3') }}</li>
          </ul>
        </li>
        <li>
          {{ $t('termsOfUse.article_5') }}
          <ul>
            <li>{{ $t('termsOfUse.article_5_1') }}</li>
            <li>{{ $t('termsOfUse.article_5_2') }}</li>
            <li>{{ $t('termsOfUse.article_5_3') }}</li>
          </ul>
        </li>
        <li>
          {{ $t('termsOfUse.article_6') }}
          <ul>
            <li>{{ $t('termsOfUse.article_6_1') }}</li>
            <li>{{ $t('termsOfUse.article_6_2') }}</li>
            <li>{{ $t('termsOfUse.article_6_3') }}</li>
          </ul>
        </li>
        <li>
          {{ $t('termsOfUse.article_7') }}
          <ul>
            <li>{{ $t('termsOfUse.article_7_1') }}</li>
            <li>{{ $t('termsOfUse.article_7_2') }}</li>
          </ul>
        </li>
        <li>
          {{ $t('termsOfUse.article_8') }}
          <ul>
            <li>{{ $t('termsOfUse.article_8_1') }}</li>
            <li>{{ $t('termsOfUse.article_8_2') }}</li>
          </ul>
        </li>
        <li>{{ $t('termsOfUse.article_9') }}</li>
      </ul>

      <h3>{{ $t('termsOfUse.article_1') }}</h3>
      <p v-html="$t('termsOfUse.para_1_1')" />
      <p v-html="$t('termsOfUse.para_1_2')" />
      <p v-html="$t('termsOfUse.para_1_3')" />

      <h3>{{ $t('termsOfUse.article_2') }}</h3>
      <p v-html="$t('termsOfUse.para_2_1')" />
      <p v-html="$t('termsOfUse.para_2_2')" />
      <p v-html="$t('termsOfUse.para_2_3')" />
      <p v-html="$t('termsOfUse.para_2_4')" />

      <h3>{{ $t('termsOfUse.article_3') }}</h3>

      <h4>{{ $t('termsOfUse.article_3_1') }}</h4>
      <p v-html="$t('termsOfUse.para_3_1_1')" />

      <h4>{{ $t('termsOfUse.article_3_2') }}</h4>
      <p v-html="$t('termsOfUse.para_3_2_1')" />
      <ul class="mb-6">
        <li v-html="$t('termsOfUse.li_3_2_1')" />
        <li v-html="$t('termsOfUse.li_3_2_2')" />
        <li v-html="$t('termsOfUse.li_3_2_3')" />
        <li v-html="$t('termsOfUse.li_3_2_4')" />
        <li v-html="$t('termsOfUse.li_3_2_5')" />
        <li v-html="$t('termsOfUse.li_3_2_6')" />
      </ul>

      <h4>{{ $t('termsOfUse.article_3_3') }}</h4>
      <p v-html="$t('termsOfUse.para_3_3_1')" />

      <h3>{{ $t('termsOfUse.article_4') }}</h3>

      <h4>{{ $t('termsOfUse.article_4_1') }}</h4>
      <p v-html="$t('termsOfUse.para_4_1_1')" />

      <h4>{{ $t('termsOfUse.article_4_2') }}</h4>
      <p v-html="$t('termsOfUse.para_4_2_1')" />

      <h4>{{ $t('termsOfUse.article_4_3') }}</h4>
      <p v-html="$t('termsOfUse.para_4_3_1')" />
      <p v-html="$t('termsOfUse.para_4_3_2')" />
      <p v-html="$t('termsOfUse.para_4_3_3')" />

      <h3>{{ $t('termsOfUse.article_5') }}</h3>

      <h4>{{ $t('termsOfUse.article_5_1') }}</h4>
      <p v-html="$t('termsOfUse.para_5_1_1')" />
      <p v-html="$t('termsOfUse.para_5_1_2')" />
      <p v-html="$t('termsOfUse.para_5_1_3')" />
      <p v-html="$t('termsOfUse.para_5_1_4')" />
      <p v-html="$t('termsOfUse.para_5_1_5')" />

      <h4>{{ $t('termsOfUse.article_5_2') }}</h4>
      <p v-html="$t('termsOfUse.para_5_2_1')" />
      <p v-html="$t('termsOfUse.para_5_2_2')" />

      <h4>{{ $t('termsOfUse.article_5_3') }}</h4>
      <p v-html="$t('termsOfUse.para_5_3_1')" />
      <p v-html="$t('termsOfUse.para_5_3_2')" />
      <p v-html="$t('termsOfUse.para_5_3_3')" />
      <p v-html="$t('termsOfUse.para_5_3_4')" />

      <h3>{{ $t('termsOfUse.article_6') }}</h3>
      <p v-html="$t('termsOfUse.para_6_1')" />

      <h4>{{ $t('termsOfUse.article_6_1') }}</h4>
      <p v-html="$t('termsOfUse.para_6_1_1')" />

      <h4>{{ $t('termsOfUse.article_6_2') }}</h4>
      <p v-html="$t('termsOfUse.para_6_2_1')" />

      <h4>{{ $t('termsOfUse.article_6_3') }}</h4>
      <p v-html="$t('termsOfUse.para_6_3_1')" />
      <p class="red--text" v-html="$t('termsOfUse.para_6_3_2')" />
      <p v-html="$t('termsOfUse.para_6_3_3')" />

      <h3>{{ $t('termsOfUse.article_7') }}</h3>
      <h4>{{ $t('termsOfUse.article_7_1') }}</h4>
      <p v-html="$t('termsOfUse.para_7_1_1')" />
      <ul class="mb-6">
        <li v-html="$t('termsOfUse.li_7_1_1')" />
        <li v-html="$t('termsOfUse.li_7_1_2')" />
        <li v-html="$t('termsOfUse.li_7_1_3')" />
      </ul>

      <h4>{{ $t('termsOfUse.article_7_2') }}</h4>
      <p v-html="$t('termsOfUse.para_7_2_1')" />

      <h3>{{ $t('termsOfUse.article_8') }}</h3>

      <h4>{{ $t('termsOfUse.article_8_1') }}</h4>
      <p v-html="$t('termsOfUse.para_8_1_1')" />

      <h4>{{ $t('termsOfUse.article_8_2') }}</h4>
      <p v-html="$t('termsOfUse.para_8_2_1')" />

      <h3>{{ $t('termsOfUse.article_9') }}</h3>
      <p v-html="$t('termsOfUse.para_9_1')" />
    </v-container>

    <app-footer />
  </div>
</template>

<script>
import AppFooter from '@/components/layouts/AppFooter'

export default {
  components: { AppFooter },

  head () {
    return {
      title: this.$t('meta.termsOfUse.title'),
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' },
        { hid: 'description', name: 'description', content: this.$t('meta.termsOfUse.description') },
        { hid: 'og:title', property: 'og:title', content: this.$t('meta.termsOfUse.title') },
        { hid: 'og:description', property: 'og:description', content: this.$t('meta.termsOfUse.description') },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg` }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
h3 {
  margin-top: 3em;
  margin-bottom: 0.5em;
}
p {
  text-align: justify;
  hyphens: auto;
}
</style>
