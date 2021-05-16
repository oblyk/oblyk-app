<template>
  <v-menu
    v-model="showNotification"
    :position-y="0"
    offset-y
    :min-width="400"
    max-width="100vw"
    bottom
    right
  >
    <template v-slot:activator="{ on, attrs }">
      <v-badge
        :value="haveUnreadNotification"
        color="red"
        dot
        overlap
        offset-x="18"
        offset-y="18"
      >
        <v-btn
          aria-label="open notification menu"
          v-bind="attrs"
          v-on="on"
          icon
        >
          <v-icon>mdi-bell</v-icon>
        </v-btn>
      </v-badge>
    </template>

    <v-card>
      <v-card-text>
        <spinner
          :full-height="false"
          :size="30"
          v-if="loadingNotification"
        />

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
        </v-list>

        <p
          class="text-center grey--text mb-0"
          v-if="notifications.length === 0 && !loadingNotification"
        >
          {{ $t('components.notification.newEmpty') }}
        </p>
      </v-card-text>
      <v-card-actions v-if="notifications.length > 0">
        <v-btn
          color="primary"
          text
          small
          @click="markedAllAsRead()"
        >
          <v-icon small left>mdi-bell-check</v-icon>
          {{ $t('components.notification.markedAllAsRead') }}
        </v-btn>
        <v-btn
          color="primary"
          text
          small
          to="/notifications"
        >
          <v-icon small left>mdi-open-in-new</v-icon>
          {{ $t('components.notification.title') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import Notification from '@/models/Notification'
import NotificationApi from '@/services/oblyk-api/NotificationApi'
import Spinner from '@/components/layouts/Spiner'
import NotificationItemList from '@/components/notifications/NotificationItemList'
import { NotificationChannel } from '@/channels/NotificationChannel'

export default {
  name: 'NotificationAppBar',
  mixins: [NotificationChannel],
  components: { NotificationItemList, Spinner },

  data () {
    return {
      haveUnreadNotification: false,
      showNotification: false,
      loadingNotification: true,
      notifications: []
    }
  },

  watch: {
    showNotification: function () {
      if (this.showNotification) {
        this.getNotifications()
      }
    }
  },

  mounted () {
    this.$root.$on('HaveNewUnreadNotification', (haveNew) => {
      this.haveNewUnreadNotification(haveNew)
    })
    this.cableNotificationSubscribe()
    this.getUnreadNotificationCount()
  },

  beforeDestroy () {
    this.cableNotificationUnsubscribe()
    this.$root.$off('HaveNewUnreadNotification')
  },

  methods: {
    cableNotificationSubscribe: function () {
      this.$cable.subscribe(
        {
          channel: 'NotificationChannel'
        }
      )
    },

    cableNotificationUnsubscribe: function () {
      this.$cable.unsubscribe('NotificationChannel')
    },

    getNotifications: function () {
      this.notifications = []
      this.loadingNotification = true
      NotificationApi
        .all()
        .then(resp => {
          for (const notification of resp.data) {
            this.notifications.push(new Notification(notification))
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'notification')
        })
        .finally(() => {
          this.loadingNotification = false
        })
    },

    getUnreadNotificationCount: function () {
      NotificationApi
        .unreadCount()
        .then(resp => {
          if (resp.data > 0) this.haveUnreadNotification = true
        })
    },

    haveNewUnreadNotification: function (haveNew) {
      this.haveUnreadNotification = haveNew
    },

    markedAllAsRead: function () {
      NotificationApi
        .readAll()
        .then(() => {
          this.haveUnreadNotification = false
        })
    }
  }
}
</script>
