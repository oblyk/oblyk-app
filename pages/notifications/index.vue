<template>
  <div>
    <!-- Load notification -->
    <spinner v-if="loadingNotification" />

    <!-- Notification list -->
    <v-list
      v-if="!loadingNotification && notifications.length > 0"
      two-line
    >
      <div
        v-for="(notification, index) in notifications"
        :key="`notification-${index}`"
      >
        <notification-item-list :notification="notification" />
      </div>
      <loading-more :get-function="getAllNotification" />
    </v-list>

    <!-- if notification is empty -->
    <p
      v-if="notifications.length === 0 && !loadingNotification"
      class="text-center grey--text mb-10 mt-10"
    >
      {{ $t('components.notification.empty') }}
    </p>
  </div>
</template>

<script>
import Notification from '@/models/Notification'
import NotificationApi from '@/services/oblyk-api/NotificationApi'
import Spinner from '@/components/layouts/Spiner'
import NotificationItemList from '@/components/notifications/NotificationItemList'
import LoadingMore from '@/components/layouts/LoadingMore'

export default {
  components: { LoadingMore, NotificationItemList, Spinner },

  data () {
    return {
      loadingNotification: true,
      notifications: []
    }
  },

  head () {
    return {
      title: this.$t('meta.notifications.title')
    }
  },

  mounted () {
    this.getAllNotification()
  },

  methods: {
    getAllNotification (page = 1) {
      new NotificationApi(this.$axios, this.$auth)
        .all(page, 'false')
        .then((resp) => {
          for (const notification of resp.data) {
            this.notifications.push(new Notification({ attributes: notification }))
          }
          if (resp.data.length === 0) { this.$root.$emit('nothingMoreToLoad') }
        })
        .catch(() => {
          this.$root.$emit('nothingMoreToLoad')
        })
        .finally(() => {
          this.loadingNotification = false
          this.$root.$emit('moreIsLoaded')
        })
    }
  }
}
</script>
