<template>
  <div>
    <spinner v-if="loadingGymOpener" />

    <v-container v-if="!loadingGymOpener">
      <v-breadcrumbs :items="breadcrumbs" />
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('actions.edit') }}
            {{ gymOpener.name }}
          </h2>
          <gym-opener-form
            :gym="gym"
            :gym-opener="gymOpener"
            submit-methode="put"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { GymOpenerConcern } from '~/concerns/GymOpenerConcern'
import Spinner from '~/components/layouts/Spiner'
import GymOpenerForm from '~/components/gyms/forms/GymOpenerForm.vue'

export default {
  meta: { orphanRoute: true },
  components: { GymOpenerForm, Spinner },
  mixins: [GymOpenerConcern],
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Modifier %{name}'
      },
      en: {
        metaTitle: 'Edit %{name}'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle', { name: this.gymOpener?.name })
    }
  },

  computed: {
    gym () {
      return this.gymOpener?.Gym
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
          text: this.$t('components.gymAdmin.openers'),
          to: `${this.gym?.adminPath}/openers`,
          exact: true
        },
        {
          text: this.gymOpener.name,
          to: `${this.gym?.adminPath}/openers/${this.gymOpener.id}`,
          exact: true
        }
      ]
    }
  }
}
</script>
