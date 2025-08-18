<template>
  <div>
    <v-card
      link
      flat
      class="hoverable-card"
      :class="bordered ? 'border' : ''"
      :to="linkable ? user.userPath : null"
      @click="callback ? callback(user) : null"
    >
      <v-list-item two-line>
        <v-list-item-avatar
          :size="small ? 40 : 70"
          :class="small ? 'mt-1 mb-1' : ''"
        >
          <v-avatar
            color="grey"
            :size="small ? 40 : 70"
            tile
          >
            <v-img :src="imageVariant(user.attachments.avatar, { fit: 'crop', width: 100, height: 100 })" />
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content :class="small ? 'pt-0 pb-0' : ''">
          <v-list-item-title class="font-weight-bold">
            <span class="vertical-align-middle">
              {{ user.full_name }}
            </span>
          </v-list-item-title>
          <v-list-item-subtitle>
            @{{ user.slug_name }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action
          v-if="subscribable"
        >
          <subscribe-btn
            subscribe-type="User"
            :subscribe-id="user.id"
            :unfollowed-icon="mdiAccountOutline"
            :followed-icon="mdiAccount"
            followed-color="primary"
            subscribe-label="actions.follow"
            unsubscribe-label="actions.followed"
            small
            large
          />
        </v-list-item-action>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import { mdiAccountOutline, mdiAccount } from '@mdi/js'
import SubscribeBtn from '@/components/forms/SubscribeBtn'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  name: 'UserSmallCard',
  components: { SubscribeBtn },
  mixins: [ImageVariantHelpers],
  props: {
    user: {
      type: Object,
      required: true
    },
    linkable: {
      type: Boolean,
      required: false,
      default: true
    },
    subscribable: {
      type: Boolean,
      default: true
    },
    small: {
      type: Boolean,
      default: false
    },
    callback: {
      type: Function,
      default: null
    },
    bordered: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      mdiAccountOutline,
      mdiAccount
    }
  }
}
</script>
