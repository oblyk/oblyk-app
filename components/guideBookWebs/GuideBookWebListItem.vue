<template>
  <v-list-item
    :class="bordered ? 'border rounded' : null"
    :href="guideBookWeb.url"
    target="_blank"
  >
    <v-list-item-avatar
      rounded="0"
      size="48"
    >
      <v-img
        src="/svg/web-guide-book-default.svg"
        contain
        max-width="48px"
        max-height="48px"
      />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>
        {{ guideBookWeb.name }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ guideBookWeb.url }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'GuideBookWebListItem',
  props: {
    guideBookWeb: {
      type: Object,
      required: true
    },
    bordered: {
      type: Boolean,
      default: false
    }
  }
}
</script>
