<template>
  <div>
    <v-card
      link
      flat
      :to="linkable ? user.userPath : null"
      @click="callback ? callback(user) : null"
    >
      <v-list-item
        :two-line="small"
        :three-line="!small"
      >
        <v-list-item-avatar
          :size="small ? 40 : 70"
          :class="small ? 'mt-1 mb-1' : ''"
        >
          <v-avatar
            color="grey"
            :size="small ? 40 : 70"
            tile
          >
            <v-img :src="user.thumbnailAvatarUrl" />
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content :class="small ? 'pt-0 pb-0' : ''">
          <v-list-item-title class="font-weight-bold">
            <span class="vertical-align-middle">
              {{ user.full_name }}
            </span>
            <subscribe-btn
              v-if="subscribable"
              subscribe-type="User"
              :subscribe-id="user.id"
              :unfollowed-icon="mdiAccountOutline"
              :followed-icon="mdiAccount"
              followed-color="green"
              :large="false"
            />
          </v-list-item-title>
          <v-list-item-subtitle
            v-if="!small"
            class="mt-n3 mb-4"
          >
            <v-alert
              dense
              text
              class="d-inline-block mr-1 mb-0 pl-2 pr-2 pt-0 pb-0"
            >
              {{ $t('components.user.type') }}
            </v-alert>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import { mdiAccountOutline, mdiAccount } from '@mdi/js'
import SubscribeBtn from '@/components/forms/SubscribeBtn'

export default {
  name: 'UserSmallCard',
  components: { SubscribeBtn },
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
