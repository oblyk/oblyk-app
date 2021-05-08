<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="loved-by-king text-center mt-5">
        {{ $t('common.pages.partner.title') }}
      </h1>
      <h4 class="subtitle-1 text-center">
        {{ $t('common.pages.partner.howIsWork') }}
      </h4>
      <p class="text-center mt-10 mb-10">
        {{ $t('common.pages.partner.explain') }}
      </p>

      <div v-if="!isLoggedIn">
        <p class="text-center font-weight-bold">
          {{ $t('common.pages.partner.connect') }}
        </p>
        <p class="text-center">
          <v-btn
            outlined
            color="primary"
            to="sign-up"
          >
            {{ $t('actions.signUp') }}
          </v-btn>
        </p>
      </div>

      <partner-figures />

      <!-- Profile -->
      <v-row class="about-partner-row mt-16">
        <v-col class="col-12 col-md-6" order-md="last">
          <p class="font-weight-bold">{{ $t('common.pages.partner.steps.configuration.title') }}</p>
          <p v-html="$t('common.pages.partner.steps.configuration.body')"/>
          <p class="text-right" v-if="isLoggedIn">
            <v-btn outlined color="primary" :to="`/me/${loggedInUser.slugName}/settings/partner`">
              <v-icon left>mdi-human</v-icon>
              {{ $t('common.pages.partner.steps.configuration.action') }}
            </v-btn>
          </p>
        </v-col>
        <v-col class="col-12 col-md-6">
          <v-img src="/img/svg/partner-configuration.svg" />
        </v-col>
      </v-row>

      <!-- Location -->
      <v-row class="about-partner-row">
        <v-col class="col-12 col-md-6">
          <p class="font-weight-bold">{{ $t('common.pages.partner.steps.location.title') }}</p>
          <p v-html="$t('common.pages.partner.steps.location.body')"/>
          <p class="text-right" v-if="isLoggedIn">
            <v-btn outlined color="primary" :to="`/me/${loggedInUser.slugName}/settings/partner`">
              <v-icon left>mdi-map-marker-radius</v-icon>
              {{ $t('common.pages.partner.steps.location.action') }}
            </v-btn>
          </p>
        </v-col>
        <v-col class="col-12 col-md-6">
          <v-img src="/img/svg/partner-location.svg" />
        </v-col>
      </v-row>

      <!-- Map Climbers -->
      <v-row class="about-partner-row">
        <v-col class="col-12 col-md-6" order-md="last">
          <p class="font-weight-bold">{{ $t('common.pages.partner.steps.climberMap.title') }}</p>
          <p v-html="$t('common.pages.partner.steps.climberMap.body')"/>
          <p class="text-right">
            <v-btn outlined color="primary" to="/maps/climbers">
              <v-icon left>mdi-map</v-icon>
              {{ $t('common.pages.partner.steps.climberMap.action') }}
            </v-btn>
          </p>
        </v-col>
        <v-col class="col-12 col-md-6">
          <v-img src="/img/svg/partner-climber-map.svg" />
        </v-col>
      </v-row>

      <!-- Messenger -->
      <v-row class="about-partner-row">
        <v-col class="col-12 col-md-6">
          <p class="font-weight-bold">{{ $t('common.pages.partner.steps.contact.title') }}</p>
          <p v-html="$t('common.pages.partner.steps.contact.body')"/>
          <p class="text-right" v-if="isLoggedIn">
            <v-btn outlined color="primary" :to="`/me/${loggedInUser.slugName}/messenger`">
              <v-icon left>mdi-forum</v-icon>
              {{ $t('common.pages.partner.steps.contact.action') }}
            </v-btn>
          </p>
        </v-col>
        <v-col class="col-12 col-md-6">
          <v-img src="/img/svg/partner-contact.svg" />
        </v-col>
      </v-row>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppFooter from '@/components/layouts/AppFooter'
import { SessionConcern } from '@/concerns/SessionConcern'
import PartnerFigures from '@/components/partners/PartnerFigures'

export default {
  name: 'AboutPartnerView',
  components: { PartnerFigures, AppFooter },
  mixins: [SessionConcern]
}
</script>

<style lang="scss" scoped>
.about-partner-row {
  margin-bottom: 7em;
}
</style>
