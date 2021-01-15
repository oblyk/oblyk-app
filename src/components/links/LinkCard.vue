<template>
  <v-card>
    <v-card-title class="link-card-title">
      {{ link.name }}
    </v-card-title>

    <v-card-text>
      <p class="mb-1">
        <v-icon small left>mdi-link</v-icon>
        <a :href="link.url">{{ link.url }}</a>
      </p>
      <p v-if="link.description">
        <v-icon small left>mdi-format-align-justify</v-icon>
        {{ link.description }}
      </p>
    </v-card-text>

    <v-card-actions v-if="isLoggedIn">
      <v-spacer/>
      <v-btn
        :to="`${link.editUrl()}?redirect_to=${redirectTo}`"
        text
        color="primary"
      >
        {{ $t('actions.edit') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { SessionConcern } from '@/concerns/SessionConcern'

export default {
  name: 'LinkCard',
  mixins: [SessionConcern],
  props: {
    link: Object
  },

  data () {
    return {
      redirectTo: this.$route.fullPath
    }
  }
}
</script>

<style lang="scss" scoped>
.link-card-title {
  font-size: 1em;
  padding-bottom: 0;
}
</style>
