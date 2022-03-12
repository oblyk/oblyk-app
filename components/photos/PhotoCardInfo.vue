<template>
  <div
    v-click-outside="closeInfo"
    class="light-box-photo-info"
  >
    <div v-show="!info">
      <v-btn
        icon
        @click="info = true"
      >
        <v-icon>{{ mdiInformation }}</v-icon>
      </v-btn>
    </div>
    <v-card v-show="info" dark>
      <v-tabs
        v-model="tab"
        height="35"
      >
        <v-tab>
          <v-icon small>
            {{ mdiInformation }}
          </v-icon>
        </v-tab>
        <v-tab>
          <v-icon small>
            {{ mdiMap }}
          </v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab" dark>
        <v-tab-item>
          <photo-description
            :photo="photo"
            :illustrable-object="illustrableObject()"
          />
        </v-tab-item>
        <v-tab-item>
          <client-only>
            <photo-map :photo="photo" />
          </client-only>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import { mdiInformation, mdiMap } from '@mdi/js'
import PhotoDescription from '@/components/photos/PhotoDescription'
import Crag from '@/models/Crag'
import CragSector from '@/models/CragSector'
import CragRoute from '@/models/CragRoute'
const PhotoMap = () => import('@/components/photos/PhotoMap')

export default {
  name: 'PhotoCardInfo',
  components: { PhotoMap, PhotoDescription },

  props: {
    photo: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiInformation,
      mdiMap,
      info: false,
      tab: null
    }
  },

  methods: {
    closeInfo () {
      this.info = false
    },

    illustrableObject () {
      const object = this.photo.illustrable
      if (object.type === 'Crag') {
        return new Crag({ attributes: object })
      } else if (object.type === 'CragSector') {
        return new CragSector({ attributes: object })
      } else if (object.type === 'CragRoute') {
        return new CragRoute({ attributes: object })
      }
    }
  }
}
</script>
