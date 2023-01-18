<template>
  <div>
    <spinner v-if="loadingGymGrade || loadingGymGradeLine" />

    <v-container v-if="!loadingGymGrade && !loadingGymGradeLine">
      <v-breadcrumbs :items="breadcrumbs" />
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('actions.edit') }}
            "{{ gymGradeLine.name }}"
          </h2>

          <gym-grade-line-form
            :gym-grade="gymGrade"
            :gym-grade-line="gymGradeLine"
            submit-methode="put"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import GymGradeLineForm from '~/components/gymGrades/forms/GymGradeLineForm'
import Spinner from '~/components/layouts/Spiner'
import { GymGradeConcern } from '~/concerns/GymGradeConcern'
import { GymGradeLineConcern } from '~/concerns/GymGradeLineConcern'

export default {
  meta: { orphanRoute: true },
  components: { Spinner, GymGradeLineForm },
  mixins: [GymGradeConcern, GymGradeLineConcern],
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Modifier le niveau'
      },
      en: {
        metaTitle: 'Edit level'
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
          text: this.gymGradeLine.name,
          disabled: true
        },
        {
          text: this.$t('actions.edit'),
          to: `${this.gym?.adminPath}/grades/${this.gymGrade.id}/grade-lines/${this.gymGradeLine.id}/edit`,
          exact: true
        }
      ]
    }
  }
}
</script>
