<template>
  <v-container v-if="gym">
    <v-breadcrumbs :items="breadcrumbs" />
    <v-row justify="center">
      <v-col class="global-form-width">
        <h3 class="mb-3 mt-2">
          Nouvelle fiche
        </h3>
        <p
          v-if="loadingTreeRoutes"
          class="text-center py-5 text--disabled"
        >
          {{ $t('common.loading') }}
        </p>
        <div v-else>
          <indoor-subscription-lock-alert
            v-if="gym.plan === 'free'"
            feature="openingSheet"
            :gym="gym"
          />
          <gym-opening-sheet-form
            v-else
            :gym="gym"
            :tree-routes="treeRoutes"
            submit-methode="post"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import GymOpeningSheetForm from '~/components/gymOpeningSheets/forms/GymOpeningSheetForm'
import GymSpaceApi from '~/services/oblyk-api/GymSpaceApi'
import IndoorSubscriptionLockAlert from '~/components/indoorSubscription/IndoorSubscriptionLockAlert.vue'

export default {
  components: { IndoorSubscriptionLockAlert, GymOpeningSheetForm },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern],
  middleware: ['auth', 'gymAdmin'],

  i18n: {
    messages: {
      fr: {
        metaTitle: "Créer une fiche d'ouverture"
      },
      en: {
        metaTitle: 'Create opening sheet'
      }
    }
  },

  data () {
    return {
      loadingTreeRoutes: true,
      treeRoutes: null
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
          text: this.$t('components.gymAdmin.openingSheet'),
          to: `${this.gym?.adminPath}/opening-sheets`,
          exact: true
        },
        {
          text: this.$t('actions.new'),
          exact: true
        }
      ]
    }
  },

  mounted () {
    this.getTreeRoutes()
  },

  methods: {
    getTreeRoutes () {
      this.loadingTreeRoutes = true
      new GymSpaceApi(this.$axios, this.$auth)
        .treeSectors(this.$route.params.gymId)
        .then((resp) => {
          this.treeRoutes = resp.data
        })
        .finally(() => {
          this.loadingTreeRoutes = false
        })
    }
  }
}
</script>
