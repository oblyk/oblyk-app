<template>
  <v-container>
    <spinner v-if="!gym" />
    <div v-else>
      <v-breadcrumbs :items="breadcrumbs" />
      <h2 class="mb-3">
        {{ $t('components.gymClimbingStyles.title') }}
      </h2>
      <p v-html="$t('components.gymClimbingStyles.explain')" />
      <v-row>
        <v-col
          v-for="climbingType in climbingTypes"
          :key="`climbing-type-${climbingType}`"
          cols="12"
          md="4"
        >
          <v-card>
            <v-card-title class="pb-2 border-bottom">
              {{ $t(`models.climbs.${climbingType}`) }}
            </v-card-title>
            <v-card-text v-if="!loadingStyles">
              <gym-climbing-styles-form
                :gym-climbing-styles="gymClimbingStyles"
                :climbing-type="climbingType"
                :gym="gym"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <div class="border-top d-flex mt-6 pt-4">
        <v-btn
          text
          :to="`${gym.adminPath}/ranking-systems`"
        >
          <v-icon left>
            {{ mdiArrowLeft }}
          </v-icon>
          {{ $t('components.gymAdmin.rakingSystem') }}
        </v-btn>
        <v-btn
          text
          class="ml-auto"
          :to="`${gym.adminPath}/label-templates`"
        >
          {{ $t('components.gymAdmin.labelTemplate') }}
          <v-icon right>
            {{ mdiArrowRight }}
          </v-icon>
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mdiArrowRight, mdiArrowLeft } from '@mdi/js'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import Spinner from '~/components/layouts/Spiner.vue'
import GymClimbingStylesForm from '~/components/gymClimbingStyles/forms/GymClimbingStylesForm.vue'
import GymClimbingStyleApi from '~/services/oblyk-api/GymClimbingStyleApi'

export default {
  components: { GymClimbingStylesForm, Spinner },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern],
  middleware: ['auth', 'gymAdmin'],

  data () {
    return {
      loadingStyles: true,
      gymClimbingStyles: null,
      climbingTypes: [
        'bouldering',
        'sport_climbing',
        'pan'
      ],

      mdiArrowRight,
      mdiArrowLeft
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "Style d'escalade"
      },
      en: {
        metaTitle: 'Climbing styles'
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
          text: this.$t('components.gymAdmin.climbingStyle'),
          to: `${this.gym?.adminPath}/climbing-styles`,
          exact: true
        }
      ]
    }
  },

  mounted () {
    this.getClimbingStyles()
  },

  methods: {
    getClimbingStyles () {
      this.loadingStyles = true
      new GymClimbingStyleApi(this.$axios, this.$auth)
        .all(this.$route.params.gymId)
        .then((resp) => {
          this.gymClimbingStyles = resp.data
        })
        .finally(() => {
          this.loadingStyles = false
        })
    }
  }
}
</script>
