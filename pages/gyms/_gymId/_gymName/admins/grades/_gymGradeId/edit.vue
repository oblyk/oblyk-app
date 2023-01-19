<template>
  <div>
    <spinner v-if="loadingGymGrade" />

    <v-container v-if="!loadingGymGrade">
      <v-breadcrumbs :items="breadcrumbs" />
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('actions.edit') }}
            "{{ gymGrade.name }}"
          </h2>
          <gym-grade-form
            :gym-id="$route.params.gymId"
            :gym-grade="gymGrade"
            submit-methode="put"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import GymGradeForm from '~/components/gymGrades/forms/GymGradeForm'
import { GymGradeConcern } from '~/concerns/GymGradeConcern'
import Spinner from '~/components/layouts/Spiner'

export default {
  meta: { orphanRoute: true },
  components: { Spinner, GymGradeForm },
  mixins: [GymGradeConcern],
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Modifier le system de cotation'
      },
      en: {
        metaTitle: 'Edit grade system'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  computed: {
    gym () {
      return this.gymGrade?.Gym
    },

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
        },
        {
          text: this.gymGrade.name,
          to: `${this.gym?.adminPath}/grades/${this.gymGrade.id}`,
          exact: true
        },
        {
          text: this.$t('actions.edit'),
          to: `${this.gym?.adminPath}/grades/${this.gymGrade.id}/edit`,
          exact: true
        }
      ]
    }
  }
}
</script>
