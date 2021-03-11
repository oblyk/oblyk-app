<template>
  <div class="enable-localization-card">
    <!-- If localisation is accepted -->
    <p class="caption" v-if="this.localisationStatus === 'accepted' && showLocalization">
      <v-icon x-small left>mdi-map-marker</v-icon> {{ user.localization }}
    </p>

    <!-- If localisation is refused -->
    <p class="caption" v-if="this.localisationStatus === 'refused'">
      <v-icon x-small left>mdi-map-marker-off</v-icon> {{ $t('components.user.localizationDeactivated') }}
      <v-btn
        text
        x-small
        color="primary"
        @click="yes()"
      >
        {{ $t('actions.activate') }}
      </v-btn>
    </p>

    <!-- If I don't have an answer for localization -->
    <v-card v-if="this.localisationStatus === 'undefined'">
      <v-card-title>
        <v-icon left color="green darken-3">
          mdi-map-marker
        </v-icon>
        {{ $t('components.user.activateLocalization') }}
      </v-card-title>
      <v-card-text>
        {{ $t('components.user.activateLocalizationExplain') }}
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          right
          text
          color="primary"
          @click="no()"
        >
          {{ $t('actions.no') }}
        </v-btn>
        <v-btn
          right
          text
          color="primary"
          @click="yes()"
        >
          {{ $t('actions.yes') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import { LocalizationHelpers } from '@/mixins/LocalizationHelpers'

export default {
  name: 'EnableLocalization',
  mixins: [LocalizationHelpers],
  props: {
    user: Object,
    showLocalization: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      localisationStatus: null
    }
  },

  watch: {
    currentLocalization: function () {
      if (this.currentLocalization !== this.user.localization) {
        this.updateUserLocalization()
      }
    }
  },

  mounted () {
    this.setLocalizationStatus()

    if (this.localisationStatus === 'accepted') {
      this.getCurrentLocation()
    }
  },

  methods: {
    setLocalizationStatus: function () {
      const answer = localStorage.getItem('answerForLocalization')
      if (answer === 'yes') {
        this.localisationStatus = 'accepted'
      } else if (answer === 'no') {
        this.localisationStatus = 'refused'
      } else {
        this.localisationStatus = 'undefined'
      }
    },

    yes: function () {
      localStorage.setItem('answerForLocalization', 'yes')
      this.setLocalizationStatus()
      this.getCurrentLocation()
    },

    no: function () {
      localStorage.setItem('answerForLocalization', 'no')
      this.setLocalizationStatus()
    },

    updateUserLocalization: function () {
      CurrentUserApi
        .update({
          latitude: this.currentLatitude,
          longitude: this.currentLongitude,
          localization: this.currentLocalization
        })
        .then(resp => {
          this.user.localization = resp.data.localization
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'user')
        })
    }
  }
}
</script>

<style lang="scss" scoped >
.enable-localization-card {
  .caption {
    .v-icon, .v-btn {
      vertical-align: baseline;
    }
  }
}
</style>
