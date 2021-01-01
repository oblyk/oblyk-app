<template>
  <div>
    <spinner v-if="loadingGymAdministrators"></spinner>

    <v-container v-if="!loadingGymAdministrators">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                {{ $t('models.user.name') }}
              </th>
              <th class="text-left">
                {{ $t('models.user.email') }}
              </th>
              <th></th>
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
                  @click="deleteAdministrator(gymAdministrator.id)"
                  :title="$t('actions.delete')"
                >
                  <v-icon>mdi-delete</v-icon>
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
          :to="`/gyms/${gymId}/${gymSlug}/admin`"
        >
          <v-icon>
            mdi-arrow-left
          </v-icon>
        </v-btn>

        <v-btn
          class="float-right"
          color="primary"
          outlined
          :to="`/gyms/${gymId}/${gymSlug}/administrators/new`"
        >
          {{ $t('actions.addMember') }}
        </v-btn>
      </div>
    </v-container>
  </div>
</template>
<script>
import Spinner from '@/components/layouts/Spiner'
import GymAdministratorApi from '@/services/oblyk-api/gymAdministratorApi'

export default {
  name: 'GymAdministratorsView',
  components: { Spinner },

  data () {
    return {
      loadingGymAdministrators: true,
      gymAdministrators: [],
      gymId: this.$route.params.gymId,
      gymSlug: this.$route.params.gymSlug
    }
  },

  created () {
    this.getGymAdministrators()
  },

  methods: {
    getGymAdministrators: function () {
      GymAdministratorApi
        .all(this.gymId)
        .then(resp => {
          this.gymAdministrators = resp.data
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          this.loadingGymAdministrators = false
        })
    },

    deleteAdministrator: function (administratorId) {
      if (confirm(this.$t('actions.areYouSur'))) {
        this.loadingGymAdministrators = true
        GymAdministratorApi
          .delete(this.gymId, administratorId)
          .then(() => {
            this.getGymAdministrators()
          })
          .catch(err => {
            this.loadingGymAdministrators = false
            console.error(err)
          })
      }
    }
  }
}
</script>
