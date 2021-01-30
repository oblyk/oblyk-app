<template>
  <div>
    <v-tabs
      height="35"
      v-model="tab"
    >
      <v-tab>Infos</v-tab>
      <v-tab>Carte</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <photo-description :photo="photo" />
      </v-tab-item>
      <v-tab-item>
        <photo-map :photo="photo" />
      </v-tab-item>
    </v-tabs-items>

  </div>
</template>
<script>
import PhotoDescription from '@/components/photos/PhotoDescription'
import Crag from '@/models/Crag'
import CragSector from '@/models/CragSector'
import PhotoMap from '@/components/photos/PhotoMap'
export default {
  name: 'PhotoCardInfo',
  components: { PhotoMap, PhotoDescription },

  props: {
    photo: Object
  },

  data () {
    return {
      tab: null
    }
  },

  methods: {
    illustrableObject: function () {
      const object = this.photo.illustrable
      if (object.type === 'Crag') {
        return new Crag(object)
      } else if (object === 'CragSector') {
        return new CragSector(object)
      }
    }
  }
}
</script>
