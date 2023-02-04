<template>
  <div>
    <spinner v-if="loadingGymGrades" />

    <v-container v-if="!loadingGymGrades">
      <v-breadcrumbs :items="breadcrumbs" />
      <div
        v-for="gymGrade in gymGrades"
        :key="gymGrade.id"
        class="mb-4"
      >
        <gym-grade-card :gym-grade="gymGrade" />
      </div>

      <p
        v-if="gymGrades.length === 0"
        class="text-center mt-10 mb-10"
      >
        {{ $t('components.gymGrade.noSystem') }}
      </p>

      <div
        class="mt-3"
        :class="gymGrades.length === 0 ? 'text-center' : 'text-right'"
      >
        <v-btn
          color="primary"
          text
          :to="`/gyms/${gymId}/${gymName}/admins/grades/new`"
        >
          <v-icon left>
            {{ mdiPlus }}
          </v-icon>
          {{ $t('actions.addSystem') }}
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mdiPlus } from '@mdi/js'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import Spinner from '@/components/layouts/Spiner'
import GymGradeApi from '@/services/oblyk-api/GymGradeApi'
import GymGradeCard from '@/components/gymGrades/GymGradeCard'
import GymGrade from '@/models/GymGrade'

export default {
  meta: { orphanRoute: true },
  components: { GymGradeCard, Spinner },
  mixins: [GymFetchConcern],

  data () {
    return {
      loadingGymGrades: true,
      gymGrades: [],
      gymId: this.$route.params.gymId,
      gymName: this.$route.params.gymName,

      mdiPlus
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Les systèmes de difficultés'
      },
      en: {
        metaTitle: 'Difficulty systems'
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
          to: this.gym?.adminPath,
          exact: true
        },
        {
          text: this.$t('components.gymAdmin.difficultySystem'),
          to: `${this.gym?.adminPath}/grades`,
          exact: true
        }
      ]
    }
  },

  created () {
    this.getGymGrades()
  },

  methods: {
    getGymGrades () {
      new GymGradeApi(this.$axios, this.$auth)
        .all(this.gymId)
        .then((resp) => {
          for (const gymGrade of resp.data) {
            this.gymGrades.push(new GymGrade({ attributes: gymGrade }))
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymGrade')
        })
        .finally(() => {
          this.loadingGymGrades = false
        })
    }
  }
}
</script>
