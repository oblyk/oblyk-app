<template>
  <div>

    <div v-if="editingPolygon">
      <p>
        Cliquez sur la carte, ou déplacez les poignets blanche pour éditer le tracer du secteur sur le plan,<br>
        Une fois fini cliquez sur terminer
      </p>
      <p class="text-center">
        <v-btn
          @click="stopEditingSectorPolygon()"
        >
          Terminer
        </v-btn>
      </p>
    </div>

    <div v-if="!editingPolygon">
      <p
        v-for="sector in gymSpace.GymSectors"
        :key="sector.id"
      >
        {{ sector.group_sector_name }}, {{ sector.name }}
        <v-btn
          :to="sector.url('edit')"
          icon
          small
        >
          <v-icon small>
            mdi-pencil
          </v-icon>
        </v-btn>

        <v-btn
          :to="sector.url('routes/new')"
          icon
          small
        >
          <v-icon small>
            mdi-tag-plus
          </v-icon>
        </v-btn>

        <v-btn
          icon
          small
          @click="startEditSectorPolygon(sector.id)"
        >
          <v-icon small>
            mdi-shape-polygon-plus
          </v-icon>
        </v-btn>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GymSectorList',
  props: {
    gymSpace: Object
  },

  data () {
    return {
      editingPolygon: false
    }
  },

  methods: {
    startEditSectorPolygon: function (gymSectorId) {
      this.$root.$emit('startEditSectorPolygon', gymSectorId)
      this.editingPolygon = true
    },

    stopEditingSectorPolygon: function () {
      this.$root.$emit('stopEditingSectorPolygon')
      this.editingPolygon = false
    }
  }
}
</script>
