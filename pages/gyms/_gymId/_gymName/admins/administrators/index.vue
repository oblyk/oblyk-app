<template>
  <div>
    <spinner v-if="loadingGymAdministrators" />

    <v-container v-if="!loadingGymAdministrators">
      <v-breadcrumbs :items="breadcrumbs" />

      <v-simple-table>
        <template #default>
          <thead>
            <tr>
              <th class="text-left">
                {{ $t('models.user.name') }}
              </th>
              <th class="text-left">
                {{ $t('models.user.email') }}
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="gymAdministrator in gymAdministrators"
              :key="gymAdministrator.id"
            >
              <td>{{ gymAdministrator.user.name }}</td>
              <td>{{ gymAdministrator.user.email }}</td>
              <td class="text-right">
                <v-btn
                  v-if="gymAdministrators.length > 1"
                  icon
                  :title="$t('actions.delete')"
                  @click="deleteAdministrator(gymAdministrator.id)"
                >
                  <v-icon>{{ mdiDelete }}</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <div
        v-if="gym"
        class="mt-3"
      >
        <v-btn
          icon
          left
          :to="gym.adminPath"
        >
          <v-icon>
            {{ mdiArrowLeft }}
          </v-icon>
        </v-btn>

        <v-btn
          class="float-right"
          color="primary"
          outlined
          :to="`${gym.adminPath}/administrators/new`"
        >
          {{ $t('actions.addMember') }}
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mdiDelete, mdiArrowLeft } from '@mdi/js'
import Spinner from '@/components/layouts/Spiner'
import GymAdministratorApi from '@/services/oblyk-api/GymAdministratorApi'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'

export default {
  meta: { orphanRoute: true },
  components: { Spinner },
  mixins: [GymFetchConcern],

  data () {
    return {
      mdiDelete,
      mdiArrowLeft,
      loadingGymAdministrators: true,
      gymAdministrators: []
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Les administrateurs'
      },
      en: {
        metaTitle: 'Administrators'
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
        }
      ]
    }
  },

  created () {
    this.getGymAdministrators()
  },

  methods: {
    getGymAdministrators () {
      new GymAdministratorApi(this.$axios, this.$auth)
        .all(this.$route.params.gymId)
        .then((resp) => {
          this.gymAdministrators = resp.data
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymAdministrator')
        })
        .finally(() => {
          this.loadingGymAdministrators = false
        })
    },

    deleteAdministrator (administratorId) {
      if (confirm(this.$t('actions.areYouSur'))) {
        this.loadingGymAdministrators = true
        new GymAdministratorApi(this.$axios, this.$auth)
          .delete(this.$route.params.gymId, administratorId)
          .then(() => {
            this.getGymAdministrators()
          })
          .catch((err) => {
            this.$root.$emit('alertFromApiError', err, 'gymAdministrator')
            this.loadingGymAdministrators = false
          })
      }
    }
  }
}
</script>
