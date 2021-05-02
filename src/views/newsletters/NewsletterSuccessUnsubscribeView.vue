<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="loved-by-king mt-16 mb-10 text-center">
        {{ $t('common.pages.newsletterUnsubscribe.successTitle') }}
      </h1>
      <p
        class="grey--text text-center"
        v-html="$t('common.pages.newsletterUnsubscribe.successParagraphe')"
      />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppFooter from '@/components/layouts/AppFooter'
export default {
  name: 'NewsletterSuccessUnsubscribeView',
  components: { AppFooter }
}
</script>
