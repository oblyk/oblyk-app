<template>
  <div>
    <v-tooltip
      v-if="!cragSector"
      bottom
    >
      <template #activator="{ on, attrs }">
        <v-btn
          :to="`/a${crag.path}/sectors/new`"
          v-bind="attrs"
          color="primary"
          text
          small
          v-on="on"
        >
          <v-icon small class="mr-1">
            {{ mdiShapeSquarePlus }}
          </v-icon>
          {{ $t('actions.newSector') }}
        </v-btn>
      </template>
      <span>
        {{ $t('actions.addSector') }}
      </span>
    </v-tooltip>
    <v-tooltip bottom>
      <template #activator="{ on, attrs }">
        <v-btn
          :to="newRoutePath()"
          v-bind="attrs"
          color="primary"
          small
          text
          class="ml-3"
          v-on="on"
        >
          <v-icon small class="mr-1">
            {{ mdiSourceBranchPlus }}
          </v-icon>
          <span>
            {{ $t('actions.newRoute') }}
          </span>
        </v-btn>
      </template>
      <span>
        {{ $t('actions.addRoute') }}
      </span>
    </v-tooltip>
  </div>
</template>

<script>
import { mdiShapeSquarePlus, mdiSourceBranchPlus } from '@mdi/js'
export default {
  name: 'AddSectorOrRouteBtn',
  props: {
    crag: {
      type: Object,
      default: null
    },
    cragSector: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      mdiShapeSquarePlus,
      mdiSourceBranchPlus
    }
  },

  methods: {
    newRoutePath () {
      if (this.cragSector) {
        return `/a${this.cragSector.Crag.path}/routes/new`
      } else {
        return `/a${this.crag.path}/routes/new`
      }
    }
  }
}
</script>
