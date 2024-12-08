<template>
  <v-container
    v-if="gym"
    class="global-form-width"
  >
    <v-card>
      <v-card-title>
        <v-btn
          icon
          right
          exact-path
          class="mr-2"
          :to="gym.adminPath"
        >
          <v-icon>
            {{ mdiArrowLeft }}
          </v-icon>
        </v-btn>
        {{ $t('components.gym.firstSpaceTitle') }}
      </v-card-title>
      <v-card-text>
        <p v-html="$t('components.gym.firstSpaceExplain1')" />
        <p class="mb-0">
          {{ $t('components.gym.firstSpaceExplain2') }}
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          outlined
          elevation="0"
          color="primary"
          :to="`${gym.spacePath}/new`"
        >
          {{ $t('actions.okIChose') }}
        </v-btn>
        <v-btn
          elevation="0"
          color="primary"
          class="ml-auto"
          :to="`${gym.adminPath}/levels`"
        >
          {{ $t('components.gym.difficultySystem') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mdiArrowLeft } from '@mdi/js'
import { GymConcern } from '@/concerns/GymConcern'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'

export default {
  meta: { orphanRoute: true },
  mixins: [GymConcern, GymRolesHelpers],
  middleware: ['auth', 'gymAdmin'],

  data () {
    return {
      mdiArrowLeft
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
