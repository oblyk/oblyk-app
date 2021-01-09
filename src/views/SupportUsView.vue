<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="loved-by-king mt-5 mb-10 text-center">
        {{ $t('common.pages.supportUs.title') }}
      </h1>
      <v-row>
        <v-col class="col-md-6">
          <v-img contain :src="require('@/assets/svgs/support-us.svg')" />
        </v-col>
        <v-col class="col-md-6">
          <p class="mt-2" v-html="$t('common.pages.supportUs.noLimite')" />
          <p class="mt-2 font-weight-bold" v-html="$t('common.pages.supportUs.freeBut')" />
          <p class="mt-2" v-html="$t('common.pages.supportUs.unfortunately')" />
        </v-col>
      </v-row>
      <p class="mt-2" v-html="$t('common.pages.supportUs.extraEuro')" />
      <pay-pal-form class="mt-10 mb-10" />
      <p class="text-center text--disabled">{{ $t('common.pages.supportUs.thanks') }}</p>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppFooter from '@/components/layouts/AppFooter'
import PayPalForm from '@/components/forms/PayPalForm'
export default {
  name: 'SupportUsView',
  components: { PayPalForm, AppFooter }
}
</script>
