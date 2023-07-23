<template>
  <v-list-item
    link
    :to="notificationLink"
    @click="markedAsRead()"
  >
    <v-list-item-avatar>
      <v-img :src="notification.thumbnailImageUrl" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>
        <v-icon
          :color="notification.read_at === null ? 'primary' : null"
          left
          small
        >
          {{ notificationIcon }}
        </v-icon>
        {{ notificationText }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ dateFromNow(notification.posted_at) }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import {
  mdiMessageText,
  mdiStarPlus,
  mdiStarCheck,
  mdiStarPlusOutline,
  mdiNewspaperVariantMultipleOutline,
  mdiHeart,
  mdiBell
} from '@mdi/js'
import { DateHelpers } from '@/mixins/DateHelpers'
import NotificationApi from '~/services/oblyk-api/NotificationApi'

export default {
  name: 'NotificationItemList',
  mixins: [DateHelpers],
  props: {
    notification: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiMessageText,
      mdiStarPlus,
      mdiStarCheck,
      mdiStarPlusOutline,
      mdiNewspaperVariantMultipleOutline,
      mdiHeart,
      mdiBell
    }
  },

  computed: {
    notificationText () {
      if (this.notification.notification_type === 'new_message') {
        return this.$t('components.notification.type.new_message', { name: this.notification.Parent.first_name })
      } else if (this.notification.notification_type === 'new_follower') {
        return this.$t('components.notification.type.new_follower', { name: this.notification.Notifiable.first_name })
      } else if (this.notification.notification_type === 'subscribe_accepted') {
        return this.$t('components.notification.type.subscribe_accepted', { name: this.notification.Notifiable.first_name })
      } else if (this.notification.notification_type === 'request_for_follow_up') {
        return this.$t('components.notification.type.request_for_follow_up', { name: this.notification.Notifiable.first_name })
      } else if (this.notification.notification_type === 'new_article') {
        return this.$t('components.notification.type.new_article', { name: this.notification.Notifiable.name })
      } else if (this.notification.notification_type === 'new_like') {
        return this.$t('components.notification.type.new_like', {
          name: this.notification.Parent.first_name,
          type: this.$t(`components.like.type.${this.notification.Notifiable.likeable_type}`)
        })
      } else {
        return this.notification.notification_type
      }
    },

    notificationIcon () {
      if (this.notification.notification_type === 'new_message') {
        return mdiMessageText
      } else if (this.notification.notification_type === 'new_follower') {
        return mdiStarPlus
      } else if (this.notification.notification_type === 'subscribe_accepted') {
        return mdiStarCheck
      } else if (this.notification.notification_type === 'request_for_follow_up') {
        return mdiStarPlusOutline
      } else if (this.notification.notification_type === 'new_article') {
        return mdiNewspaperVariantMultipleOutline
      } else if (this.notification.notification_type === 'new_like') {
        return mdiHeart
      } else {
        return mdiBell
      }
    },

    notificationLink () {
      if (this.notification.notification_type === 'new_message') {
        return `/home/messenger/${this.notification.Notifiable.conversation_id}`
      } else if (['new_follower', 'subscribe_accepted', 'request_for_follow_up'].includes(this.notification.notification_type)) {
        return `/climbers/${this.notification.Notifiable.slug_name}`
      } else if (this.notification.notification_type === 'new_article') {
        return `/articles/${this.notification.Notifiable.id}/${this.notification.Notifiable.slug_name}`
      } else if (this.notification.notification_type === 'new_like') {
        if (this.notification.Notifiable.likeable_type === 'Comment') {
          return `/comments/${this.notification.Notifiable.likeable_id}`
        } else if (this.notification.Notifiable.likeable_type === 'Photo') {
          return `/photos/${this.notification.Notifiable.likeable_id}`
        } else if (this.notification.Notifiable.likeable_type === 'Video') {
          return `/videos/${this.notification.Notifiable.likeable_id}`
        } else {
          return ''
        }
      } else {
        return '/'
      }
    }
  },

  methods: {
    markedAsRead () {
      new NotificationApi(this.$axios, this.$auth).read(this.notification.id)
    }
  }
}
</script>
