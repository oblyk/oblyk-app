<template>
  <v-container class="common-page-container">
    <v-sheet
      class="mt-2 pa-4"
      rounded
    >
      <v-row align="center">
        <v-col class="shrink">
          <v-avatar :size="70">
            <v-icon x-large>
              {{ mdiTimerSandEmpty }}
            </v-icon>
          </v-avatar>
        </v-col>
        <v-col class="grow">
          <p>
            {{ $t('components.session.sessionExpired') }}
          </p>
          <v-btn
            outlined
            text
            to="/"
          >
            <v-icon left>
              {{ mdiArrowLeft }}
            </v-icon>
            {{ $t('common.pages.thanks.action') }}
          </v-btn>
          <v-btn
            outlined
            text
            to="/sign-in"
          >
            <v-icon left>
              {{ mdiLogin }}
            </v-icon>
            {{ $t('actions.signIn') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>
<script>
import { mdiTimerSandEmpty, mdiLogin, mdiArrowLeft } from '@mdi/js'

export default {
  data () {
    return {
      mdiTimerSandEmpty,
      mdiLogin,
      mdiArrowLeft
    }
  },

  head () {
    return {
      title: 'Votre session a expirée',
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' }
      ]
    }
  }
}
</script>
