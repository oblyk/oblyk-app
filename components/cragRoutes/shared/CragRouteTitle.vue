<template>
  <div>
    <h1 class="font-weight-medium">
      <crag-route-avatar
        :crag-route="cragRoute"
        :size="57"
        :border-width="5"
        base-font-size="1.1rem"
      />
      {{ cragRoute.name }}
      <share-btn
        :title="cragRoute.name"
        :url="cragRoute.path"
      />
    </h1>
    <div>
      <nuxt-link
        class="discrete-link"
        :to="cragRoute.Crag.path"
      >
        <v-icon small>
          {{ mdiTerrain }}
        </v-icon>
        {{ cragRoute.crag.name }}
      </nuxt-link>
    </div>
    <div>
      {{ cragRoute.crag.country }}, {{ cragRoute.crag.region }}, {{ cragRoute.crag.city }}
      <client-only>
        <v-btn
          v-if="$auth.loggedIn"
          :to="`${cragRoute.aPath}/edit`"
          small
          icon
          :title="$t('actions.edit')"
          class="ml-1"
        >
          <v-icon small>
            {{ mdiPencil }}
          </v-icon>
        </v-btn>
      </client-only>
    </div>
  </div>
</template>

<script>
import { mdiPencil, mdiTerrain } from '@mdi/js'
import CragRouteAvatar from '~/components/cragRoutes/partial/CragRouteAvatar'
import ShareBtn from '~/components/ui/ShareBtn.vue'

export default {
  name: 'CragRouteTitle',
  components: { ShareBtn, CragRouteAvatar },
  props: {
    cragRoute: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiPencil,
      mdiTerrain
    }
  }
}
</script>
