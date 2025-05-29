<template>
  <div>
    <p>
      <u>
        {{ $t('components.user.updateEmailReport') }}
      </u>
    </p>
    <p
      v-if="loadingGymAdministrators"
      class="text--disabled text-center"
    >
      {{ $t('common.loading') }}
    </p>
    <div v-else>
      <div
        v-for="(gymAdministrator, gymAdministratorIndex) in gymAdministrators"
        :key="`gym-index-${gymAdministratorIndex}`"
      >
        <v-checkbox
          v-model="gymAdministrator.email_report"
          :label="gymAdministrator.gym.name"
          hide-details
          :disabled="updateAdministrator.includes(gymAdministrator.id)"
          @change="switchGymAdministrator(gymAdministrator.id)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'
import GymAdministrator from '~/models/GymAdministrator'

export default {
  name: 'GymEmailingReportForm',
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingGymAdministrators: true,
      gymAdministrators: [],
      updateAdministrator: []
    }
  },

  mounted () {
    if (this.user.administered_gyms.length > 0) {
      this.getGymAdministrators()
    }
  },

  methods: {
    getGymAdministrators () {
      this.gymAdministrators = []
      this.loadingGymAdministrators = true
      new CurrentUserApi(this.$axios, this.$auth)
        .gymAdministrators()
        .then((resp) => {
          for (const gymAdministrator of resp.data) {
            this.gymAdministrators.push(new GymAdministrator({ attributes: gymAdministrator }))
          }
        })
        .finally(() => {
          this.loadingGymAdministrators = false
        })
    },

    switchGymAdministrator (id) {
      this.updateAdministrator.push(id)
      new CurrentUserApi(this.$axios, this.$auth)
        .switchEmailReport(id)
        .finally(() => {
          const index = this.updateAdministrator.indexOf(id)
          if (index !== -1) {
            this.updateAdministrator.splice(index, 1)
          }
        })
    }
  }
}
</script>
