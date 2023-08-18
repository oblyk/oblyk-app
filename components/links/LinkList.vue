<template>
  <div>
    <v-skeleton-loader
      v-if="loadingLinks"
      class="mx-auto"
      type="list-item-two-line, list-item-two-line"
    />

    <!-- Link list -->
    <div v-else>
      <div
        v-for="link in links"
        :key="link.id"
        class="mt-3"
      >
        <link-card
          :link="link"
          :get-links="getLinks"
        />
      </div>

      <!-- No link -->
      <p
        v-if="links.length === 0"
        class="text--disabled text-center mt-10"
      >
        {{ $t('components.link.noLink') }}
      </p>
    </div>

    <!-- Add link-->
    <client-only>
      <div
        v-if="$auth.loggedIn"
        class="text-right mt-4"
      >
        <v-btn
          :to="`/links/${linkableType}/${linkableId}/new?redirect_to=${redirectTo}`"
          text
          color="primary"
        >
          <v-icon left>
            {{ mdiLinkVariantPlus }}
          </v-icon>
          {{ $t('actions.addLink') }}
        </v-btn>
      </div>
    </client-only>
  </div>
</template>

<script>
import { mdiLinkVariantPlus } from '@mdi/js'
import LinkCard from '@/components/links/LinkCard'
import LinkApi from '~/services/oblyk-api/LinkApi'
import Link from '@/models/Link'

export default {
  name: 'LinkList',
  components: { LinkCard },
  props: {
    linkableId: {
      type: [String, Number],
      required: true
    },
    linkableType: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      links: [],
      loadingLinks: true,
      redirectTo: this.$route.fullPath,

      mdiLinkVariantPlus
    }
  },

  mounted () {
    this.getLinks()
  },

  methods: {
    getLinks () {
      this.loadingLinks = true
      new LinkApi(this.$axios, this.$auth)
        .allInLinkable(this.linkableType, this.linkableId)
        .then((resp) => {
          this.links = []
          for (const link of resp.data) {
            this.links.push(new Link({ attributes: link }))
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'link')
        })
        .then(() => {
          this.loadingLinks = false
        })
    }
  }
}
</script>
