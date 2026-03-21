<template>
  <v-list-item
    link
    :to="notification.app_path"
    @click="markedAsRead()"
  >
    <v-list-item-avatar
      v-if="notification.notifiable.attachments?.avatar?.attached"
    >
      <v-img :src="imageVariant(notification.notifiable.attachments.avatar, { fit: 'crop', height: 100, width: 100 })" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title :class="notification.read_at === null ? 'blue--text font-weight-medium' : null">
        <v-icon
          :color="notification.read_at === null ? 'blue' : null"
          left
          small
        >
          {{ notificationIcons[notification.notification_type] }}
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
  mdiHeart,
  mdiReply
} from '@mdi/js'
import { oblykOutdoorPanel } from '~/assets/oblyk-icons'
import { DateHelpers } from '@/mixins/DateHelpers'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import OblykApi from '~/services/oblyk-api/OblykApi'

export default {
  name: 'NotificationItemList',
  mixins: [DateHelpers, ImageVariantHelpers],
  props: {
    notification: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      notificationIcons: {
        new_message: mdiMessageText,
        new_follower: mdiStarPlus,
        subscribe_accepted: mdiStarCheck,
        request_for_follow_up: mdiStarPlusOutline,
        new_like: mdiHeart,
        new_reply: mdiReply,
        new_publication: oblykOutdoorPanel
      }
    }
  },

  computed: {
    notificationText () {
      const type = this.$t(`components.like.type.${this.notification.notifiable.likeable_type}`)
      return this.$t(`components.notification.type.${this.notification.notification_type}`, { name: this.notification.name, type })
    }
  },

  methods: {
    markedAsRead () {
      new OblykApi(this.$axios, this.$auth).put(`/notifications/${this.notification.id}/read`)
    }
  }
}
</script>
