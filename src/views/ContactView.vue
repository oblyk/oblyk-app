<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="loved-by-king mt-5 mb-10 text-center">
        {{ $t('common.pages.contact.title') }}
      </h1>
      <v-row>
        <v-col class="col-md-6" order-md="last">
          <p v-html="$t('common.pages.contact.paragraphe')" />
          <p class="text-center">
            <a href="mailto:ekip@oblyk.org" v-if="emailVisible">
              ekip@oblyk.org
            </a>
            <v-btn
              small
              text
              color="primary"
              v-if="!emailVisible"
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
          <v-img contain src="/img/svg/contact.svg" />
        </v-col>
      </v-row>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppFooter from '@/components/layouts/AppFooter'
export default {
  name: 'ContactView',
  components: { AppFooter },

  data () {
    return {
      emailVisible: false
    }
  }
}
</script>
