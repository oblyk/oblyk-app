<template>
  <v-container v-if="gym">
    <v-breadcrumbs :items="breadcrumbs" />
    <v-row>
      <v-col cols="12" md="4">
        <v-alert v-if="threeDAsset && threeDAsset.picture_url === null">
          Pour prendre une capture de votre décoration, placer la au mieux dans le cadre si contre
          et cliquez sur le bouton d'appareille photo en bas à droite
        </v-alert>
        <gym-three-d-asset-form
          v-if="threeDAsset"
          :gym="gym"
          :gym-three-d-asset="threeDAsset"
          submit-methode="put"
        />
      </v-col>
      <v-col>
        <client-only>
          <div
            class="border rounded"
            style="height: 600px; width: 600px"
          >
            <gym-asset-three-d
              v-if="threeDAsset"
              :gym-three-d-asset="threeDAsset"
            />
          </div>
        </client-only>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import GymThreeDAssetForm from '~/components/gymThreeDAssets/forms/GymThreeDAssetForm'
import GymThreeDAsset from '~/models/GymThreeDAsset'
import GymThreeDAssetApi from '~/services/oblyk-api/GymThreeDAssetApi'
const GymAssetThreeD = () => import('~/components/gymThreeDAssets/GymAssetThreeD')

export default {
  components: { GymAssetThreeD, GymThreeDAssetForm },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern],
  middleware: ['auth', 'gymAdmin'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Éditer la décoration'
      },
      en: {
        metaTitle: 'Edit asset'
      }
    }
  },

  data () {
    return {
      loadingAsset: true,
      threeDAsset: null
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
          text: this.$t('components.gymAdmin.assets'),
          exact: true
        },
        {
          text: this.$t('actions.edit'),
          exact: true
        }
      ]
    }
  },

  mounted () {
    this.getThreeDAsset()
  },

  methods: {
    getThreeDAsset () {
      this.loadingAsset = true
      new GymThreeDAssetApi(this.$axios, this.$auth)
        .find(this.$route.params.gymId, this.$route.params.threeDAssetId)
        .then((resp) => {
          this.threeDAsset = new GymThreeDAsset({ attributes: resp.data })
        })
        .finally(() => {
          this.loadingAsset = false
        })
    }
  }
}
</script>
