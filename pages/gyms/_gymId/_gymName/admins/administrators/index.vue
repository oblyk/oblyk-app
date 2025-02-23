<template>
  <div>
    <spinner v-if="loadingGymAdministrators && !gym" />

    <v-container v-if="!loadingGymAdministrators && gym">
      <v-breadcrumbs :items="breadcrumbs" />

      <v-simple-table>
        <template #default>
          <thead>
            <tr>
              <th rowspan="2" class="text-left border-bottom">
                {{ $t('models.user.name') }}
              </th>
              <th rowspan="2" class="border-bottom border-right" />
              <th
                class="text-center border-bottom"
                colspan="6"
              >
                {{ $t('models.gymAdministrator.roles') }}
              </th>
              <th
                v-if="gymAuthCan(gym, 'manage_team_member')"
                class="border-bottom border-left"
                rowspan="2"
              />
            </tr>
            <tr>
              <th
                v-for="(role, roleIndex) in roles"
                :key="`role-th-index-${roleIndex}`"
                class="text-center"
              >
                {{ $t(`models.roles.${role}`) }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(gymAdministrator, gymAdministratorIndex) in gymAdministrators"
              :key="`gym-administrator-index-${gymAdministratorIndex}`"
            >
              <td class="border-right">
                <span v-if="gymAdministrator.user">
                  {{ `${gymAdministrator.user.full_name}` }}
                </span>
                <span
                  v-if="!gymAdministrator.user"
                >
                  ~ {{ gymAdministrator.requested_email }}
                </span>
                <v-chip
                  v-if="!gymAdministrator.user"
                  color="amber lighten-4"
                >
                  en attente de confirmation
                </v-chip>
              </td>
              <td class="border-right">
                <v-tooltip bottom>
                  <template
                    v-if="gymAdministrator.email_report"
                    #activator="{ on, attrs }"
                  >
                    <v-icon
                      v-bind="attrs"
                      v-on="on"
                    >
                      {{ mdiFileChart }}
                    </v-icon>
                  </template>
                  <span>
                    Inscrit au rapport mensuel
                  </span>
                </v-tooltip>
              </td>
              <td
                v-for="(role, roleIndex) in roles"
                :key="`role-index-${roleIndex}`"
                class="text-center"
              >
                <v-icon :color="gymAdministrator.roles.includes(role) ? 'green' : 'red lighten-3'">
                  {{ gymAdministrator.roles.includes(role) ? mdiCheckBold : mdiCloseThick }}
                </v-icon>
              </td>
              <td
                v-if="gymAuthCan(gym, 'manage_team_member')"
                class="text-right text-no-wrap border-left"
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

      <gym-administrator-rights-card />

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
import {
  mdiDelete,
  mdiArrowLeft,
  mdiPencil,
  mdiCheckBold,
  mdiCloseThick,
  mdiFileChart
} from '@mdi/js'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import Spinner from '@/components/layouts/Spiner'
import GymAdministratorApi from '@/services/oblyk-api/GymAdministratorApi'
import GymAdministrator from '~/models/GymAdministrator'
import GymAdministratorRightsCard from '~/components/gymAdministrators/GymAdministratorRightsCard'

export default {
  meta: { orphanRoute: true },
  components: { GymAdministratorRightsCard, Spinner },
  mixins: [GymFetchConcern, GymRolesHelpers],
  middleware: ['auth', 'gymAdmin'],

  data () {
    return {
      loadingGymAdministrators: true,
      gymAdministrators: [],
      roles: [
        'manage_gym',
        'manage_space',
        'manage_opening',
        'manage_team_member',
        'manage_opener',
        'manage_subscription'
      ],

      mdiDelete,
      mdiArrowLeft,
      mdiPencil,
      mdiCheckBold,
      mdiCloseThick,
      mdiFileChart
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
