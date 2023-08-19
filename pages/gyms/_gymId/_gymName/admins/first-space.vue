<template>
  <v-container
    v-if="gym"
    class="global-form-width"
  >
    <v-row>
      <v-col v-if="currentUserIsGymAdmin()">
        <p class="text-center mb-7">
          <v-icon x-large>
            {{ mdiMapLegend }}
          </v-icon>
        </p>
        <p class="text-center">
          {{ $t('components.gym.firstSpaceExplain') }}
        </p>

        <div v-if="gym.gym_grades_count === 0">
          <p class="text-center">
            {{ $t('components.gym.createDifficultyFirst') }}
          </p>

          <p class="text-center">
            <v-btn
              elevation="0"
              color="primary"
              :to="`${gym.adminPath}/first-difficulty-system`"
            >
              {{ $t('components.gym.difficultySystem') }}
            </v-btn>
          </p>
        </div>
        <p v-if="gym.gym_grades_count > 0" class="text-center mt-10">
          <v-btn
            color="primary"
            :to="`${gym.spacePath}/new`"
          >
            {{ $t('components.gym.createFirstSpace') }}
          </v-btn>
        </p>
      </v-col>

      <v-col v-else>
        <p class="text--disabled text-center">
          {{ $t('components.gym.administratorRequired') }}
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiMapLegend } from '@mdi/js'
import { GymConcern } from '@/concerns/GymConcern'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'

export default {
  meta: { orphanRoute: true },
  mixins: [GymConcern, GymRolesHelpers],

  data () {
    return {
      mdiMapLegend
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Créer le premier espace de %{name}',
        metaDescription: "commencez à créer votre topo d'escalade indoor en créant le première espace de %{name}"
      },
      en: {
        metaTitle: 'Create the first space for %{name}',
        metaDescription: 'Start creating your indoor climbing map by creating the first %{name} space'
      }
    }
  },

  head () {
    return {
      title: this.firstSpaceMetaTitle,
      meta: [
        { hid: 'description', name: 'description', content: this.firstSpaceMetaDescription },
        { hid: 'og:title', property: 'og:title', content: this.firstSpaceMetaTitle },
        { hid: 'og:description', property: 'og:description', content: this.firstSpaceMetaDescription },
        { hid: 'og:url', property: 'og:url', content: this.firstSpaceMetaUrl }
      ]
    }
  },

  computed: {
    firstSpaceMetaTitle () {
      return this.$t('metaTitle', { name: this.gym?.name })
    },

    firstSpaceMetaDescription () {
      return this.$t('metaDescription', { name: this.gym?.name })
    },

    firstSpaceMetaUrl () {
      return `${process.env.VUE_APP_OBLYK_APP_URL}${this.gym?.path}/first-space`
    }
  }
}
</script>
