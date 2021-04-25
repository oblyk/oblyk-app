<template>
  <div>

    <!-- Load notification -->
    <spinner v-if="loadingNotification" />

    <!-- Notification list -->
    <v-list
      two-line
      v-if="!loadingNotification && notifications.length > 0"
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
      class="text-center grey--text mb-10 mt-10"
      v-if="notifications.length === 0 && !loadingNotification"
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
  name: 'NotificationsView',
  components: { LoadingMore, NotificationItemList, Spinner },
  data () {
    return {
      loadingNotification: true,
      notifications: []
    }
  },

  mounted () {
    this.getAllNotification()
  },

  methods: {
    getAllNotification: function (page = 1) {
      NotificationApi
        .all(page, 'false')
        .then(resp => {
          for (const notification of resp.data) {
            this.notifications.push(new Notification(notification))
          }
          if (resp.data.length === 0) this.$root.$emit('nothingMoreToLoad')
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
