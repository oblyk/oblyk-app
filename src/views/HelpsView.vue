<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="loved-by-king mt-5 text-center">
        {{ $t('helps.title') }}
      </h1>

      <h3 class="mt-4 mb-2">
        {{ $t('helps.manageMyAccount.title') }}
      </h3>
      <v-expansion-panels focusable>

        <!-- Delete my account -->
        <v-expansion-panel>
          <v-expansion-panel-header v-html="$t('helps.manageMyAccount.deleteMyAccount.title')" />
          <v-expansion-panel-content class="pt-4">
            <p v-html="$t('helps.manageMyAccount.deleteMyAccount.explain')" />
            <p>
              <u>{{ $t('helps.manageMyAccount.deleteMyAccount.list') }}</u>
            </p>
            <ul>
              <li v-html="$t('helps.manageMyAccount.deleteMyAccount.beConnected')" />
              <li>
                {{ $t('helps.manageMyAccount.deleteMyAccount.goToSettings') }}
                <router-link
                  v-if="isLoggedIn"
                  :to="currentUser.currentUserPath('settings/others')"
                >
                  {{ $t('helps.manageMyAccount.deleteMyAccount.mySettings') }}
                </router-link> ;
              </li>
              <li v-html="$t('helps.manageMyAccount.deleteMyAccount.deployActions')" />
            </ul>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { CurrentUserConcern } from '@/concerns/CurrentUserConcern'
import AppFooter from '@/components/layouts/AppFooter'

export default {
  name: 'HelpsView',
  mixins: [CurrentUserConcern],
  components: { AppFooter },

  metaInfo () {
    return {
      title: this.$t('meta.helps.title'),
      meta: [
        { vmid: 'description', name: 'description', content: this.$t('meta.helps.description') },
        { vmid: 'og-title', property: 'og:title', content: this.$t('meta.helps.title') },
        { vmid: 'og-description', property: 'og:description', content: this.$t('meta.helps.description') },
        { vmid: 'og-image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/img/images/oblyk-og-image.jpg` }
      ]
    }
  }
}
</script>
