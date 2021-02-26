<template>
  <div>
    <v-card
      link
      flat
      :to="user.userPath()"
    >
      <v-list-item three-line>
        <v-list-item-avatar
          size="70"
        >
          <v-avatar
            color="grey"
            size="70"
            tile
          >
            <v-img :src="user.thumbnailAvatarUrl()" />
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            <span class="vertical-align-middle">
              {{ user.full_name }}
            </span>
            <subscribe-btn
              subscribe-type="User"
              :subscribe-id="user.id"
              unfollowed-icon="mdi-account-outline"
              followed-icon="mdi-account"
              followedColor="green"
              :large="false"
            />
          </v-list-item-title>
          <v-list-item-subtitle class="mt-n3 mb-4">
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
import SubscribeBtn from '@/components/forms/SubscribeBtn'

export default {
  name: 'UserSmallCard',
  components: { SubscribeBtn },
  props: {
    user: Object
  }
}
</script>
