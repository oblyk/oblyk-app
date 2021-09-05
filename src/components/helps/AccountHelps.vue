<template>
  <div>
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
                v-if="currentUser && isLoggedIn"
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
  </div>
</template>

<script>
import { CurrentUserConcern } from '@/concerns/CurrentUserConcern'

export default {
  name: 'AccountHelps',
  mixins: [CurrentUserConcern]
}
</script>
