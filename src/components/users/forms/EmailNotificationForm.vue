<template>
  <div>
    <p class="grey--text" v-if="loadingUser">
      {{ $t('components.user.recoveryEmailNotificationSettings') }}
    </p>
    <email-notifiable-list-input
      v-else
      v-model="notificationsList"
    />
  </div>
</template>

<script>
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import EmailNotifiableListInput from '@/components/forms/EmailNotifiableListInput'
import { SessionConcern } from '@/concerns/SessionConcern'

export default {
  name: 'EmailNotificationForm',
  components: { EmailNotifiableListInput },
  mixins: [SessionConcern],

  data () {
    return {
      loadingUser: true,
      notificationsList: null
    }
  },

  mounted () {
    this
      .getLoggedInUser()
      .then(resp => {
        this.notificationsList = resp.email_notifiable_list
      }).finally(() => {
        this.loadingUser = false
      })
  },

  watch: {
    notificationsList: function () {
      if (!this.loadingUser) {
        this.updateUser()
      }
    }
  },

  methods: {
    updateUser: function () {
      CurrentUserApi.update({ email_notifiable_list: this.notificationsList })
    }
  }
}
</script>
