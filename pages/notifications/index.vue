<template>
  <div>
    <page-header
      :title="$t('components.notification.title')"
      back-to="/home"
    />
    <v-container>
      <h1 content="mt-5 mb-5">
        {{ $t('components.notification.title') }}
      </h1>

      <!-- Load notification -->
      <v-skeleton-loader
        v-if="loadingNotification"
        type="list-item-avatar-two-line"
      />

      <!-- Notification list -->
      <div v-else>
        <v-btn
          color="primary"
          text
          small
          outlined
          @click="markedAllAsRead()"
        >
          <v-icon small left>
            {{ mdiBellCheck }}
          </v-icon>
          {{ $t('components.notification.markedAllAsRead') }}
        </v-btn>

        <v-list
          v-if="notifications.length > 0"
          class="mt-3 rounded"
          two-line
        >
          <div
            v-for="(notification, index) in notifications"
            :key="`notification-${index}`"
          >
            <notification-item-list :notification="notification" />
          </div>
          <loading-more
            :get-function="getAllNotification"
            :loading-more="loadingMoreData"
            :no-more-data="noMoreDataToLoad"
          />
        </v-list>
      </div>

      <!-- if notification is empty -->
      <p
        v-if="notifications.length === 0 && !loadingNotification"
        class="text-center grey--text mb-10 mt-10"
      >
        {{ $t('components.notification.empty') }}
      </p>
    </v-container>
  </div>
</template>

<script>
import { mdiBellCheck } from '@mdi/js'
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import OblykApi from '~/services/oblyk-api/OblykApi'
import NotificationItemList from '@/components/notifications/NotificationItemList'
import LoadingMore from '@/components/layouts/LoadingMore'
import PageHeader from '~/components/layouts/PageHeader'

export default {
  components: { PageHeader, LoadingMore, NotificationItemList },
  mixins: [LoadingMoreHelpers],

  data () {
    return {
      loadingNotification: true,
      notifications: [],

      mdiBellCheck
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Mes notifications'
      },
      en: {
        metaTitle: 'My notifications'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  mounted () {
    this.getAllNotification()
  },

  methods: {
    getAllNotification () {
      new OblykApi(this.$axios, this.$auth)
        .get('/notifications', { page: this.page, unread_only: false })
        .then((resp) => {
          for (const notification of resp.data) {
            this.notifications.push(notification)
          }
          this.successLoadingMore(resp)
        })
        .catch(() => {
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.loadingNotification = false
          this.finallyMoreIsLoaded()
        })
    },

    markedAllAsRead () {
      new OblykApi(this.$axios, this.$auth).put('/notifications/read_all')
    }
  }
}
</script>
