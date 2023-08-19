<template>
  <email-notifiable-list-input v-model="notificationsList" />
</template>

<script>
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'
import EmailNotifiableListInput from '@/components/forms/EmailNotifiableListInput'

export default {
  name: 'EmailNotificationForm',
  components: { EmailNotifiableListInput },

  data () {
    return {
      notificationsList: this.$auth.user.email_notifiable_list
    }
  },

  watch: {
    notificationsList () {
      this.updateUser()
    }
  },

  methods: {
    updateUser () {
      new CurrentUserApi(this.$axios, this.$auth)
        .update({ email_notifiable_list: this.notificationsList })
        .then(() => {
          this.$auth.fetchUser()
        })
    }
  }
}
</script>
