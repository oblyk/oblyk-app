<template>
  <div>
    <spinner v-if="!gymAdministrator" />

    <v-container v-if="gymAdministrator">
      <v-breadcrumbs :items="breadcrumbs" />
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('actions.edit') }}
            "{{ gymAdministrator.user.first_name }}"
          </h2>
          <gym-administrator-form
            :gym="gymAdministrator.Gym"
            :gym-administrator="gymAdministrator"
            submit-methode="put"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { GymAdministratorConcern } from '~/concerns/GymAdministratorConcern'
import Spinner from '~/components/layouts/Spiner'
import GymAdministratorForm from '~/components/gymAdministrators/forms/gymAdministratorForm.vue'

export default {
  meta: { orphanRoute: true },
  components: { GymAdministratorForm, Spinner },
  mixins: [GymAdministratorConcern],
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
    breadcrumbs () {
      return [
        {
          text: this.gymAdministrator?.gym?.name,
          disable: true
        },
        {
          text: this.$t('components.gymAdmin.home'),
          to: this.gymAdministrator?.Gym?.adminPath,
          exact: true
        },
        {
          text: this.$t('components.gymAdmin.team'),
          to: `${this.gymAdministrator?.Gym?.adminPath}/administrators`,
          exact: true
        },
        {
          text: this.gymAdministrator.user.first_name,
          exact: true
        },
        {
          text: this.$t('actions.edit'),
          to: `${this.gymAdministrator?.Gym?.adminPath}/administrators/${this.gymAdministrator.id}/edit`,
          exact: true
        }
      ]
    }
  }
}
</script>
