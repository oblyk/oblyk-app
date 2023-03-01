<template>
  <div>
    <spinner v-if="loadingGymAdministrators && !gym" />

    <v-container v-if="!loadingGymAdministrators && gym">
      <v-breadcrumbs :items="breadcrumbs" />

      <v-simple-table>
        <template #default>
          <thead>
            <tr>
              <th class="text-left">
                {{ $t('models.user.name') }}
              </th>
              <th class="text-left">
                {{ $t('models.gymAdministrator.roles') }}
              </th>
              <th v-if="gymAuthCan(gym, 'manage_team_member')" />
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(gymAdministrator, gymAdministratorIndex) in gymAdministrators"
              :key="`gym-administrator-index-${gymAdministratorIndex}`"
            >
              <td>
                <span v-if="gymAdministrator.user">
                  {{ `${gymAdministrator.user.full_name}` }}
                </span>
                <v-chip
                  v-else
                  color="amber"
                >
                  <b class="mr-1">{{ gymAdministrator.requested_email }}</b>
                  en attente de confirmation
                </v-chip>
              </td>
              <td>
                <v-chip
                  v-for="(role, roleIndex) in gymAdministrator.roles"
                  :key="`role-index-${roleIndex}`"
                  class="mr-1"
                >
                  {{ $t(`models.roles.${role}`) }}
                </v-chip>
              </td>
              <td
                v-if="gymAuthCan(gym, 'manage_team_member')"
                class="text-right text-no-wrap"
              >
                <v-btn
                  icon
                  :title="$t('actions.edit')"
                  :to="`${gym.adminPath}/administrators/${gymAdministrator.id}/edit`"
                >
                  <v-icon>{{ mdiPencil }}</v-icon>
                </v-btn>
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
        v-if="gym && gymAuthCan(gym, 'manage_team_member')"
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
import { mdiDelete, mdiArrowLeft, mdiPencil } from '@mdi/js'
import Spinner from '@/components/layouts/Spiner'
import GymAdministratorApi from '@/services/oblyk-api/GymAdministratorApi'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import GymAdministrator from '~/models/GymAdministrator'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'

export default {
  meta: { orphanRoute: true },
  components: { Spinner },
  mixins: [GymFetchConcern, GymRolesHelpers],

  data () {
    return {
      loadingGymAdministrators: true,
      gymAdministrators: [],

      mdiDelete,
      mdiArrowLeft,
      mdiPencil
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

  mounted () {
    this.getGymAdministrators()
  },

  methods: {
    getGymAdministrators () {
      this.gymAdministrators = []
      new GymAdministratorApi(this.$axios, this.$auth)
        .all(this.$route.params.gymId)
        .then((resp) => {
          for (const member of resp.data) {
            this.gymAdministrators.push(new GymAdministrator({ attributes: member }))
          }
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
