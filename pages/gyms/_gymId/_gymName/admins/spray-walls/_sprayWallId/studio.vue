<template>
  <div>
    <div v-if="!gym || !sprayWall">
      Chargement ...
    </div>
    <div
      v-else
      class="app-height"
    >
      <client-only>
        <spray-wall-map-editor
          v-if="sprayWall"
          :gym="gym"
          :spray-wall="sprayWall"
          :spray-wall-holds="sprayWallHolds"
          :spray-wall-pipelines="sprayWallPipelines"
        />
      </client-only>
    </div>
  </div>
</template>

<script>
import Jsona from 'jsona'
import { mdiArrowLeft, mdiCreation } from '@mdi/js'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import OblykApi from '~/services/oblyk-api/OblykApi'
const SprayWallMapEditor = () => import('~/components/sprayWalls/SprayWallMapEditor')

export default {
  components: { SprayWallMapEditor },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern, ImageVariantHelpers],
  middleware: ['auth', 'gymAdmin'],

  data () {
    return {
      sprayWall: null,
      autoDetectionIsLaunch: false,
      runningPipeline: false,
      sprayWallPipelines: [],
      sprayWallHolds: [],
      pipelines: [],

      mdiArrowLeft,
      mdiCreation
    }
  },

  channels: {
    SprayWallPipelineChannel: {
      connected () {},
      received (data) {
        const pipeline = new Jsona().deserialize(data)
        const index = this.sprayWallPipelines.findIndex(item => item.id === pipeline.id)
        if (index !== -1) {
          this.sprayWallPipelines.splice(index, 1, pipeline)
        } else {
          this.sprayWallPipelines.push(pipeline)
        }
      },
      disconnected () {}
    },

    SprayWallHoldChannel: {
      connected () {},
      received (data) {
        if (data.action === 'destroy') {
          const index = this.sprayWallHolds.findIndex(item => item.id === data.id)
          this.sprayWallHolds.splice(index, 1)
        } else {
          const hold = new Jsona().deserialize(data)
          const index = this.sprayWallHolds.findIndex(item => item.id === hold.id)
          if (index !== -1) {
            this.sprayWallHolds.splice(index, 1, hold)
          } else {
            this.sprayWallHolds.push(hold)
          }
        }
        if (this.sprayWallHolds.length > 1) {
          this.sprayWallHolds.sort((a, b) => b.area - a.area)
        }
      },
      disconnected () {}
    }
  },

  mounted () {
    this.getSprayWall()
    this.getSprayWallPipelines()

    this.$cable.subscribe(
      {
        channel: 'SprayWallPipelineChannel',
        spray_wall_id: this.$route.params.sprayWallId
      }
    )
    this.$cable.subscribe(
      {
        channel: 'SprayWallHoldChannel',
        spray_wall_id: this.$route.params.sprayWallId
      }
    )
  },

  beforeDestroy () {
    this.cableSprayWallPipelineUnsubscribe()
    this.cableSprayWallHoldUnsubscribe()
  },

  methods: {
    getSprayWall () {
      new OblykApi(this.$axios, this.$auth)
        .get(`/gyms/${this.$route.params.gymId}/spray_walls/${this.$route.params.sprayWallId}`)
        .then((resp) => {
          this.sprayWall = resp.data
          this.sprayWallHolds = resp.data.spray_wall_holds
        })
    },

    getSprayWallPipelines () {
      new OblykApi(this.$axios, this.$auth)
        .get(`/gyms/${this.$route.params.gymId}/spray_walls/${this.$route.params.sprayWallId}/spray_wall_pipelines`)
        .then((resp) => {
          this.sprayWallPipelines = resp.data
        })
    },

    cableSprayWallPipelineUnsubscribe () {
      this.$cable.unsubscribe('SprayWallPipelineChannel')
    },

    cableSprayWallHoldUnsubscribe () {
      this.$cable.unsubscribe('SprayWallHoldChannel')
    }
  }
}
</script>
