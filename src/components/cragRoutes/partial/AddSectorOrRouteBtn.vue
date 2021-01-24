<template>
  <div>
    <v-tooltip
      bottom
      v-if="!cragSector"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          :to="crag.path('sectors/new')"
          v-bind="attrs"
          v-on="on"
          color="primary"
          fab
          small
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
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          :to="newRoutePath()"
          v-bind="attrs"
          v-on="on"
          color="primary"
          fab
          small
          class="ml-3"
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
    crag: Object,
    cragSector: Object
  },

  methods: {
    newRoutePath: function () {
      if (this.cragSector) {
        return this.cragSector.path('routes/new')
      } else {
        return this.crag.path('routes/new')
      }
    }
  }
}
</script>
