<template>
  <v-container v-if="gym">
    <v-breadcrumbs :items="breadcrumbs" />
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.addMember') }}
        </h2>

        <gym-administrator-form
          :gym="gym"
          submit-methode="post"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GymAdministratorForm from '~/components/gymAdministrators/forms/gymAdministratorForm.vue'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'

export default {
  meta: { orphanRoute: true },
  components: { GymAdministratorForm },
  mixins: [GymFetchConcern],
  middleware: ['auth', 'gymAdmin'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Ajouter un administrateur'
      },
      en: {
        metaTitle: 'Add administrator'
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
          text: this.$t('components.gymAdmin.team'),
          to: `${this.gym?.adminPath}/administrators`,
          exact: true
        },
        {
          text: this.$t('actions.new'),
          to: `${this.gym?.adminPath}/administrators/new`,
          exact: true
        }
      ]
    }
  }
}
</script>
