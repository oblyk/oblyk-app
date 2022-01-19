<template>
  <div class="enable-localization-card">
    <!-- If localisation is accepted -->
    <p v-if="localisationStatus === 'accepted'" class="caption">
      <v-icon x-small left>
        mdi-map-marker
      </v-icon> {{ $t('components.user.localizationActivated') }} <span v-if="showLocalization">{{ userForLocalisation.localization }}</span>
      <v-btn
        text
        x-small
        color="primary"
        @click="no()"
      >
        {{ $t('actions.disable') }}
      </v-btn>
    </p>

    <!-- If localisation is refused -->
    <p v-if="localisationStatus === 'refused'" class="caption">
      <v-icon x-small left>
        mdi-map-marker-off
      </v-icon> {{ $t('components.user.localizationDeactivated') }}
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
    <v-card v-if="localisationStatus === 'undefined'">
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
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'
import { LocalizationHelpers } from '@/mixins/LocalizationHelpers'

export default {
  name: 'EnableLocalization',
  mixins: [LocalizationHelpers],
  props: {
    user: {
      type: Object,
      required: true
    },
    showLocalization: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      userForLocalisation: this.user,
      localisationStatus: null
    }
  },

  watch: {
    currentLocalization () {
      if (this.currentLocalization !== this.userForLocalisation.localization) {
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
    setLocalizationStatus () {
      const answer = localStorage.getItem('answerForLocalization')
      if (answer === 'yes') {
        this.localisationStatus = 'accepted'
      } else if (answer === 'no') {
        this.localisationStatus = 'refused'
      } else {
        this.localisationStatus = 'undefined'
      }
    },

    yes () {
      localStorage.setItem('answerForLocalization', 'yes')
      this.setLocalizationStatus()
      this.getCurrentLocation()
    },

    no () {
      localStorage.setItem('answerForLocalization', 'no')
      this.setLocalizationStatus()
    },

    updateUserLocalization () {
      new CurrentUserApi(this.$axios, this.$auth)
        .update({
          latitude: this.currentLatitude,
          longitude: this.currentLongitude,
          localization: this.currentLocalization
        })
        .then((resp) => {
          this.userForLocalisation.localization = resp.data.localization
        })
        .catch((err) => {
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
