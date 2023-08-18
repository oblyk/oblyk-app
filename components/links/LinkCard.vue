<template>
  <v-card>
    <v-card-title class="link-card-title">
      {{ link.name }}
    </v-card-title>

    <v-card-text>
      <p class="mb-1">
        <v-icon small left>
          {{ mdiLink }}
        </v-icon>
        <a :href="link.url">{{ link.url }}</a>
      </p>
      <p v-if="link.description">
        <v-icon small left>
          {{ mdiFormatAlignJustify }}
        </v-icon>
        {{ link.description }}
      </p>
      <owner-label
        :owner="link.creator"
        :history="link.history"
        :edit-path="`${link.path}/edit?redirect_to=${redirectTo}`"
        :delete-function="deleteLink"
        :reports="{ type: 'Link', id: link.id }"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiLink, mdiFormatAlignJustify } from '@mdi/js'
import OwnerLabel from '@/components/users/OwnerLabel'
import LinkApi from '~/services/oblyk-api/LinkApi'

export default {
  name: 'LinkCard',
  components: { OwnerLabel },
  props: {
    link: {
      type: Object,
      required: true
    },
    getLinks: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      redirectTo: this.$route.fullPath,

      mdiLink,
      mdiFormatAlignJustify
    }
  },

  methods: {
    deleteLink () {
      if (confirm(this.$t('actions.areYouSur'))) {
        new LinkApi(this.$axios, this.$auth)
          .delete(this.link.id)
          .then(() => {
            this.getLinks()
          })
          .catch((err) => {
            this.$root.$emit('alertFromApiError', err, 'link')
          })
      }
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
