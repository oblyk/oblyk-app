<template>
  <v-list-item two-line>
    <v-list-item-avatar
      size="50"
    >
      <v-avatar
        color="grey"
        size="50"
        tile
      >
        <v-img :src="gym.logoUrl" />
      </v-avatar>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title class="font-weight-bold">
        <span class="vertical-align-middle">
          {{ gym.name }}
        </span>
        <subscribe-btn subscribe-type="Gym" :subscribe-id="gym.id" :large="false" />
      </v-list-item-title>
      <v-list-item-subtitle class="mt-n1 mb-4">
        <v-alert
          dense
          text
          class="d-inline-block mr-1 mb-0 pl-2 pr-2 pt-0 pb-0"
        >
          {{ $t('components.gym.type') }}
        </v-alert>
        {{ gym.country }}, {{ gym.city }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import SubscribeBtn from '@/components/forms/SubscribeBtn'

export default {
  name: 'GymFeedCard',
  components: { SubscribeBtn },
  props: {
    gym: Object
  }
}
</script>
