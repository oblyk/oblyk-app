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
    <template #activator="{ on, attrs }">
      <v-badge
        :value="haveNewNotification"
        color="red"
        dot
        overlap
        offset-x="18"
        offset-y="18"
      >
        <v-btn
          aria-label="open notification menu"
          v-bind="attrs"
          icon
          v-on="on"
        >
          <v-icon>{{ mdiBellOutline }}</v-icon>
        </v-btn>
      </v-badge>
    </template>

    <v-card>
      <v-card-text>
        <spinner
          v-if="loadingNotification"
          :full-height="false"
          :size="30"
        />

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
        </v-list>

        <p
          v-if="notifications.length === 0 && !loadingNotification"
          class="text-center grey--text mb-0"
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
          <v-icon small left>
            {{ mdiBellCheck }}
          </v-icon>
          {{ $t('components.notification.markedAllAsRead') }}
        </v-btn>
        <v-btn
          color="primary"
          text
          small
          to="/notifications"
        >
          <v-icon small left>
            {{ mdiOpenInNew }}
          </v-icon>
          {{ $t('components.notification.title') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { mdiBellOutline, mdiBellCheck, mdiOpenInNew } from '@mdi/js'
import Notification from '@/models/Notification'
import NotificationApi from '~/services/oblyk-api/NotificationApi'
import Spinner from '@/components/layouts/Spiner'
import NotificationItemList from '@/components/notifications/NotificationItemList'

export default {
  name: 'NotificationAppBar',
  components: { NotificationItemList, Spinner },

  data () {
    return {
      mdiBellOutline,
      mdiBellCheck,
      mdiOpenInNew,
      showNotification: false,
      loadingNotification: true,
      notifications: []
    }
  },

  computed: {
    haveNewNotification () {
      return this.$store.state.notification.newNotification
    }
  },

  watch: {
    showNotification () {
      if (this.showNotification) {
        this.getNotifications()
      }
    }
  },

  methods: {
    getNotifications () {
      this.notifications = []
      this.loadingNotification = true
      new NotificationApi(this.$axios, this.$auth)
        .all()
        .then((resp) => {
          for (const notification of resp.data) {
            this.notifications.push(new Notification({ attributes: notification }))
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'notification')
        })
        .finally(() => {
          this.loadingNotification = false
        })
    },

    markedAllAsRead () {
      new NotificationApi(this.$axios, this.$auth)
        .readAll()
    }
  }
}
</script>
