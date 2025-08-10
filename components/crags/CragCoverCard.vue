<template>
  <nuxt-link
    :to="crag.path"
    class="discrete-link"
  >
    <v-img
      :src="imageVariant(crag.attachments.cover, { fit: 'scale-down', width: 720, height: 720 })"
      height="170"
      class="rounded-sm mb-2 d-flex align-end"
      :alt="crag.name"
      gradient="to bottom, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.6) 100%"
      dark
    >
      <div class="flex-grow-1 pl-2">
        <div class="d-flex align-center">
          <div class="flex-grow-1">
            <p class="mb-n1 text-truncate font-weight-bold">
              {{ crag.name }}
            </p>
            <p class="mb-0 text-truncate text-subtitle-2">
              <crag-climb-icons
                :crag="crag"
                class="vertical-align-text-bottom"
              />
              | {{ crag.city }} - <cite>{{ crag.country }}</cite>
            </p>
          </div>
          <subscribe-btn
            :subscribe-id="crag.id"
            subscribe-type="Crag"
            class="flex-shrink-0"
            :large="false"
          />
        </div>
        <p class="mb-0 pb-1 text-truncate">
          <v-chip
            v-if="crag.ascent_users_count"
            small
            outlined
          >
            <v-icon small left>
              {{ oblykPartner }}
            </v-icon>
            {{ $tc('components.search.count.user', crag.ascent_users_count, { count: crag.ascent_users_count }) }}
          </v-chip>
          <v-chip
            v-if="crag.ascents_count"
            small
            outlined
          >
            <v-icon small left>
              {{ mdiCheckAll }}
            </v-icon>
            {{ $tc('components.logBook.figures.ascents', crag.ascents_count, { count: crag.ascents_count }) }}
          </v-chip>
        </p>
      </div>
    </v-img>
  </nuxt-link>
</template>
<script>
import { mdiCheckAll } from '@mdi/js'
import { oblykPartner } from '~/assets/oblyk-icons'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import SubscribeBtn from '~/components/forms/SubscribeBtn.vue'
import CragClimbIcons from '~/components/crags/CragClimbIcons.vue'

export default {
  name: 'CragCoverCard',
  components: { CragClimbIcons, SubscribeBtn },
  mixins: [ImageVariantHelpers],
  props: {
    crag: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiCheckAll,
      oblykPartner
    }
  }
}
</script>
