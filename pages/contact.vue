<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="mt-5 mb-10 text-center">
        {{ $t('common.pages.contact.title') }}
      </h1>
      <v-row>
        <v-col class="col-md-6" order-md="last">
          <p v-html="$t('common.pages.contact.paragraphe')" />
          <p class="text-center">
            <a v-if="emailVisible" href="mailto:ekip@oblyk.org">
              ekip@oblyk.org
            </a>
            <v-btn
              v-if="!emailVisible"
              small
              text
              color="primary"
              @click="emailVisible = true"
            >
              {{ $t('actions.seeEmail') }}
            </v-btn>
          </p>
          <p class="text-center text--disabled">
            {{ $t('common.pages.contact.quickResponse') }}
          </p>
        </v-col>
        <v-col class="col-md-6">
          <v-img
            width="526"
            height="223"
            contain
            src="/svg/contact.svg"
          />
        </v-col>
      </v-row>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppFooter from '@/components/layouts/AppFooter'

export default {
  components: { AppFooter },

  data () {
    return {
      emailVisible: false
    }
  },

  head () {
    return {
      title: this.$t('meta.contact.title'),
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' },
        { hid: 'description', name: 'description', content: this.$t('meta.contact.description') },
        { hid: 'og:title', property: 'og:title', content: this.$t('meta.contact.title') },
        { hid: 'og:description', property: 'og:description', content: this.$t('meta.contact.description') },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg` }
      ]
    }
  }
}
</script>
