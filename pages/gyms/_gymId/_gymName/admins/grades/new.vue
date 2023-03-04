<template>
  <v-container>
    <v-breadcrumbs :items="breadcrumbs" />
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('components.gymGrade.add') }}
        </h2>
        <p class="subtitle-2 mb-3">
          {{ $t('components.gymGrade.explain') }}
        </p>
        <p class="subtitle-2 mb-8">
          {{ $t('common.seeDocumentation') }}
          <a
            href="https://oblyk.github.io/app-user-doc/docs/indoor/systeme-de-difficulte/concept"
            target="_blank"
          >
            {{ $t('common.documentation') }}
          </a>
        </p>

        <gym-grade-form
          :gym-id="$route.params.gymId"
          submit-methode="post"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GymGradeForm from '~/components/gymGrades/forms/GymGradeForm'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'

export default {
  meta: { orphanRoute: true },
  components: { GymGradeForm },
  mixins: [GymFetchConcern],
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Nouveau system de cotation'
      },
      en: {
        metaTitle: 'New grade system'
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
        },
        {
          text: this.$t('actions.new'),
          to: `${this.gym?.adminPath}/grades/new`,
          exact: true
        }
      ]
    }
  }
}
</script>
