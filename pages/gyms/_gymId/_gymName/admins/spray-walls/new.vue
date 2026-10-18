<template>
  <v-container v-if="gym">
    <v-breadcrumbs :items="breadcrumbs" />
    <spray-wall-form
      :gym="gym"
      submit-methode="post"
      style="max-width: 600px"
      class="mx-auto"
    />
  </v-container>
</template>

<script>
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import SprayWallForm from '~/components/sprayWalls/forms/SprayWallForm'

export default {
  components: { SprayWallForm },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern],
  middleware: ['auth', 'gymAdmin'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Créer un Spray Wall'
      },
      en: {
        metaTitle: 'Create Spray Wall'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  computed: {
    breadcrumbs () {
      return [
        {
          text: this.gym?.name,
          disable: true
        },
        {
          text: this.$t('components.gymAdmin.home'),
          to: `${this.gym?.adminPath}`,
          exact: true
        },
        {
          text: this.$t('components.gymAdmin.sprayWalls'),
          to: `${this.gym?.adminPath}/spray-walls`,
          exact: true
        },
        {
          text: this.$t('actions.new'),
          to: `${this.gym?.adminPath}/spray-walls/new`,
          exact: true
        }
      ]
    }
  }
}
</script>
