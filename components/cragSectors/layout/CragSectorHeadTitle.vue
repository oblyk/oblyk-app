<template>
  <div>
    <h1
      class="font-weight-medium mb-2"
      style="line-height: 0.9em"
    >
      {{ cragSector.name }}
    </h1>
    <div>
      <nuxt-link
        class="discrete-link"
        :to="cragSector.Crag.path"
      >
        <v-icon small>
          {{ mdiTerrain }}
        </v-icon>
        {{ cragSector.crag.name }}
      </nuxt-link>
    </div>
    <div>
      {{ cragSector.crag.country }}, {{ cragSector.crag.region }}, {{ cragSector.crag.city }}
      <client-only>
        <v-btn
          v-if="$auth.loggedIn"
          :to="`${cragSector.Crag.path}/sectors/${cragSector.id}/${cragSector.slug_name}/edit`"
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
import { mdiTerrain, mdiPencil } from '@mdi/js'

export default {
  name: 'CragSectorHeadTitle',
  props: {
    cragSector: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiTerrain,
      mdiPencil
    }
  }
}
</script>
