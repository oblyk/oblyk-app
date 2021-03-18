<template>
    <v-list-item two-line>
      <v-list-item-avatar
        rounded="0"
        size="40"
      >
        <v-img
          :src="guideBookWeb.coverUrl()"
          contain
          max-width="40px"
          max-height="40px"
        />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="font-weight-bold">
          <span class="vertical-align-middle">
            {{ guideBookWeb.name }}
          </span>
        </v-list-item-title>
        <v-list-item-subtitle class="mb-1 mt-0 text-truncate">
          <a :href="guideBookWeb.url" class="vertical-align-middle">
            {{ guideBookWeb.url }}
          </a>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
</template>

<script>
export default {
  name: 'GuideBookWebFeedCard',
  props: {
    guideBookWeb: Object
  }
}
</script>
