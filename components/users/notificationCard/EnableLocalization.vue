<template>
  <v-card v-if="showNotification">
    <v-card-title>
      <v-icon left color="green darken-3">
        {{ mdiMapMarker }}
      </v-icon>
      {{ $t('components.user.activateLocalization') }}
    </v-card-title>
    <v-card-text>
      <p class="mb-1">
        {{ $t('components.user.activateLocalizationExplain') }}
      </p>
      <p class="mb-0">
        <strong>{{ $t('common.tip') }} :</strong>
        {{ $t('components.user.youControlYourLocation') }}
        <v-icon small color="primary">
          {{ mdiMapMarker }}
        </v-icon>
        {{ $t('components.user.youControlYourLocationInAppDrawer') }}
      </p>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        right
        text
        small
        @click="IUnderstand"
      >
        {{ $t('actions.IUnderstand') }}
      </v-btn>
      <v-btn
        right
        text
        color="primary"
        @click="openLocalizationPopup"
      >
        {{ $t('components.localization.activateLocation') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mdiMapMarker } from '@mdi/js'

export default {
  name: 'EnableLocalization',

  data () {
    return {
      showNotification: false,

      mdiMapMarker
    }
  },

  mounted () {
    const answer = localStorage.getItem('dontAskMeAgainAboutLocalization')

    if (answer !== 'true') {
      this.showNotification = true
    }
  },

  methods: {
    openLocalizationPopup () {
      this.$root.$emit('ShowLocalizationPopup', true)
    },

    IUnderstand () {
      localStorage.setItem('dontAskMeAgainAboutLocalization', 'true')
      this.showNotification = false
    }
  }
}
</script>
