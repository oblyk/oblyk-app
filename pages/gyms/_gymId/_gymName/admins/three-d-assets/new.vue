<template>
  <v-container v-if="gym">
    <v-breadcrumbs :items="breadcrumbs" />
    <v-row justify="center">
      <v-col class="global-form-width">
        <h3 class="mb-3 mt-2">
          {{ $t('actions.importAsset') }}
        </h3>
        <gym-three-d-asset-form
          :gym="gym"
          submit-methode="post"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import GymThreeDAssetForm from '~/components/gymThreeDAssets/forms/GymThreeDAssetForm'

export default {
  components: { GymThreeDAssetForm },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern],
  middleware: ['auth', 'gymAdmin'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Importer une décoration'
      },
      en: {
        metaTitle: 'Import asset'
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
          text: this.$t('components.gymAdmin.spaceGroups'),
          exact: true
        },
        {
          text: this.$t('actions.new'),
          exact: true
        }
      ]
    }
  }
}
</script>
