<template>
  <div>
    <spinner v-if="loadingGymAdministrators" />

    <v-container v-if="!loadingGymAdministrators">
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

      <div class="mt-3">
        <v-btn
          icon
          left
          :to="`/gym-admins/${gymId}/${gymName}`"
        >
          <v-icon>
            {{ mdiArrowLeft }}
          </v-icon>
        </v-btn>

        <v-btn
          class="float-right"
          color="primary"
          outlined
          :to="`/a/gyms/${gymId}/${gymName}/administrators/new`"
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

export default {
  components: { Spinner },

  data () {
    return {
      mdiDelete,
      mdiArrowLeft,
      loadingGymAdministrators: true,
      gymAdministrators: [],
      gymId: this.$route.params.gymId,
      gymName: this.$route.params.gymName
    }
  },

  head () {
    return {
      title: this.$t('meta.gym.newAdministrator')
    }
  },

  created () {
    this.getGymAdministrators()
  },

  methods: {
    getGymAdministrators () {
      new GymAdministratorApi(this.$axios, this.$auth)
        .all(this.gymId)
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
          .delete(this.gymId, administratorId)
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
