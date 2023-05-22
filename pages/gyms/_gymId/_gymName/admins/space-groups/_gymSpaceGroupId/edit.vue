<template>
  <div v-if="gym">
    <spinner v-if="loadingGymSpaceGroup" />

    <v-container v-if="!loadingGymSpaceGroup">
      <v-breadcrumbs :items="breadcrumbs" />
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('actions.edit') }}
            {{ gymSpaceGroup.name }}
          </h2>
          <gym-space-group-form
            :gym="gym"
            :gym-space-group="gymSpaceGroup"
            submit-methode="put"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { GymSpaceGroupConcern } from '~/concerns/GymSpaceGroupConcern'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import Spinner from '~/components/layouts/Spiner'
import GymSpaceGroupForm from '~/components/gymSpaceGroups/forms/GymSpaceGroupForm.vue'

export default {
  meta: { orphanRoute: true },
  components: { GymSpaceGroupForm, Spinner },
  mixins: [GymSpaceGroupConcern, GymFetchConcern],
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
      title: this.$t('metaTitle', { name: this.gymSpaceGroup?.name })
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
          text: this.$t('components.gymAdmin.spaceGroups'),
          exact: true
        },
        {
          text: this.gymSpaceGroup.name,
          exact: true
        }
      ]
    }
  }
}
</script>
