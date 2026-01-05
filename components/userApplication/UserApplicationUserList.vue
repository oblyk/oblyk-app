<template>
  <div>
    <v-skeleton-loader
      v-if="loadApplication"
      type="list"
    />
    <div v-else>
      <template v-for="(application, applicationIndex) in applications">
        <application-my-compet
          v-if="application.type === 'UserApplicationMyCompet'"
          :key="`application-index-${applicationIndex}`"
          :application="application"
          :get-application-callback="getApplications"
          class="mb-4"
        />
      </template>
    </div>
    <p
      v-if="!loadApplication && applications.length === 0"
      class="text-center text--disabled mt-4 mb-8"
    >
      Vous n'avez pas encore d'application externe connecté a votre compte
    </p>
  </div>
</template>

<script>
import UserApplicationApi from '~/services/oblyk-api/UserApplicationApi'
import UserApplication from '~/models/UserApplication'
import ApplicationMyCompet from '~/components/userApplication/ApplicationMyCompet'

export default {
  name: 'UserApplicationUserList',
  components: { ApplicationMyCompet },
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      applications: [],
      loadApplication: true
    }
  },

  mounted () {
    this.getApplications()
  },

  methods: {
    getApplications () {
      this.loadApplication = true
      new UserApplicationApi(this.$axios, this.$auth)
        .all()
        .then((resp) => {
          this.applications = []
          for (const application of resp.data) {
            this.applications.push(new UserApplication({ attributes: application }))
          }
        })
        .finally(() => {
          this.loadApplication = false
        })
    }
  }
}
</script>
