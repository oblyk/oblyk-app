<template>
  <v-container>
    <spinner v-if="!gym" />
    <div v-else>
      <v-breadcrumbs :items="breadcrumbs" />
      <h2 class="mb-0">
        {{ $t('components.levelAndGrades.title') }}
      </h2>
      <p
        class="subtitle-1 mb-5"
        v-html="$t('components.levelAndGrades.explain')"
      />
      <div v-if="gymLevels">
        <levels-form
          :gym="gym"
          :gym-levels="gymLevels"
        />
        <div class="border-top d-flex mt-4 pt-4">
          <v-btn
            text
            class="ml-auto"
            :to="`${gym.adminPath}/ranking-systems`"
          >
            {{ $t('components.gymAdmin.rakingSystem') }}
            <v-icon right>
              {{ mdiArrowRight }}
            </v-icon>
          </v-btn>
        </div>
      </div>
      <spinner v-else />
    </div>
  </v-container>
</template>

<script>
import { mdiArrowRight } from '@mdi/js'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import Spinner from '~/components/layouts/Spiner'
import LevelsForm from '~/components/gyms/forms/LevelsForm'
import GymLevelApi from '~/services/oblyk-api/GymLevelApi'
import GymLevel from '~/models/GymLevel'

export default {
  components: { LevelsForm, Spinner },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern],
  middleware: ['auth', 'gymAdmin'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Couleurs et cotations'
      },
      en: {
        metaTitle: 'Colors and grades'
      }
    }
  },

  data () {
    return {
      loadingGymLevels: true,
      gymLevels: null,

      mdiArrowRight
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
          text: this.$t('components.gymAdmin.levelsAndGardes'),
          to: `${this.gym?.adminPath}/levels`,
          exact: true
        }
      ]
    }
  },

  mounted () {
    this.getLevel()
  },

  methods: {
    getLevel () {
      this.loadingGymLevels = true
      new GymLevelApi(this.$axios, this.$auth)
        .all(this.$route.params.gymId)
        .then((resp) => {
          this.gymLevels = {
            sport_climbing: null,
            bouldering: null,
            pan: null
          }
          for (const gymLevel of resp.data) {
            this.gymLevels[gymLevel.climbing_type] = new GymLevel({ attributes: gymLevel })
          }
        })
        .finally(() => {
          this.loadingGymLevels = false
        })
    }
  }
}
</script>
