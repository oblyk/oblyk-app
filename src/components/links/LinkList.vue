<template>
  <div>
    <spinner v-if="loadingLinks" />

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
    <div class="text-right mt-4">
      <v-btn
        :to="`/links/${linkableType}/${linkableId}/new?redirect_to=${redirectTo}`"
        text
        color="primary"
      >
        <v-icon left>mdi-link-variant-plus</v-icon>
        {{ $t('actions.addLink') }}
      </v-btn>
    </div>
  </div>
</template>
<script>
import LinkCard from '@/components/links/LinkCard'
import Spinner from '@/components/layouts/Spiner'
import LinkApi from '@/services/oblyk-api/LinkApi'
import Link from '@/models/Link'

export default {
  name: 'LinkList',
  components: { Spinner, LinkCard },
  props: {
    linkableId: [String, Number],
    linkableType: String
  },

  data () {
    return {
      links: [],
      loadingLinks: true,
      redirectTo: this.$route.fullPath
    }
  },

  mounted () {
    this.getLinks()
  },

  methods: {
    getLinks: function () {
      this.loadingLinks = true
      LinkApi
        .allInLinkable(this.linkableType, this.linkableId)
        .then(resp => {
          this.links = []
          for (const link of resp.data) {
            this.links.push(new Link(link))
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'link')
        })
        .then(() => {
          this.loadingLinks = false
        })
    }
  }
}
</script>
