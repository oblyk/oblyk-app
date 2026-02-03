<template>
  <div class="border rounded pa-3 pb-3 mb-4">
    <p class="font-weight-medium mb-1">
      {{ $t('components.input.emailNotifications') }}
    </p>
    <v-switch
      v-for="(notification, notificationIndex) in emailNotificationsList"
      :key="`notification-index-${notificationIndex}`"
      v-model="emailNotifications"
      :label="notification.text"
      color="#31994e"
      :value="notification.value"
      hide-details
      @change="onChange()"
    />
  </div>
</template>

<script>
export default {
  name: 'EmailNotifiableListInput',
  props: {
    value: {
      type: Array,
      default: null
    }
  },

  data () {
    return {
      emailNotificationsList: [
        { text: this.$t('models.emailNotifications.new_message'), value: 'new_message' },
        { text: this.$t('models.emailNotifications.new_publication'), value: 'new_publication' },
        { text: this.$t('models.emailNotifications.request_for_follow_up'), value: 'request_for_follow_up' },
        { text: this.$t('models.emailNotifications.new_article'), value: 'new_article' }
      ],
      emailNotifications: this.value ?? ['new_message', 'new_publication']
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.emailNotifications)
    }
  }
}
</script>
