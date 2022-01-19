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
          fab
          small
          v-on="on"
        >
          <v-icon small>
            mdi-shape-square-plus
          </v-icon>
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
          fab
          small
          class="ml-3"
          v-on="on"
        >
          <v-icon small>
            mdi-source-branch-plus
          </v-icon>
        </v-btn>
      </template>
      <span>
        {{ $t('actions.addRoute') }}
      </span>
    </v-tooltip>
  </div>
</template>

<script>
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

  methods: {
    newRoutePath () {
      if (this.cragSector) {
        return `/a${this.cragSector.path}/routes/new`
      } else {
        return `/a${this.crag.path}/routes/new`
      }
    }
  }
}
</script>
