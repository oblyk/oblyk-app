<template>
  <div
    v-click-outside="closeInfo"
  >
    <div v-show="!info">
      <v-btn
        icon
        @click="info = true"
      >
        <v-icon>mdi-information</v-icon>
      </v-btn>
    </div>
    <v-card v-show="info">
      <v-tabs
        height="35"
        v-model="tab"
      >
        <v-tab>
          <v-icon small>mdi-information</v-icon>
        </v-tab>
        <v-tab>
          <v-icon small>mdi-map</v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <photo-description
            :photo="photo"
            :illustrable-object="illustrableObject()"
          />
        </v-tab-item>
        <v-tab-item>
          <photo-map :photo="photo" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import PhotoDescription from '@/components/photos/PhotoDescription'
import Crag from '@/models/Crag'
import CragSector from '@/models/CragSector'
import CragRoute from '@/models/CragRoute'
import PhotoMap from '@/components/photos/PhotoMap'

export default {
  name: 'PhotoCardInfo',
  components: { PhotoMap, PhotoDescription },

  props: {
    photo: Object
  },

  data () {
    return {
      info: false,
      tab: null
    }
  },

  methods: {
    closeInfo: function () {
      this.info = false
    },

    illustrableObject: function () {
      const object = this.photo.illustrable
      if (object.type === 'Crag') {
        return new Crag(object)
      } else if (object.type === 'CragSector') {
        return new CragSector(object)
      } else if (object.type === 'CragRoute') {
        return new CragRoute(object)
      }
    }
  }
}
</script>
