<template>
  <v-list-item
    :to="url"
    link
  >
    <v-list-item-icon>
      <v-icon>{{ icon }}</v-icon>
    </v-list-item-icon>
    <v-list-item-title>
      {{ title }}
    </v-list-item-title>
  </v-list-item>
</template>
<script>
export default {
  name: 'AppDrawerItem',
  props: {
    url: String,
    icon: String,
    title: String
  }
}
</script>
