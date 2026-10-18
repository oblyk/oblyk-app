<template>
  <div>
    <div
      class="spray-wall-interface"
      :class="$vuetify.breakpoint.mobile ? '--mobile-interface sheet-background-color' : '--desktop-interface'"
    >
      <div
        class="spray-wall-picture"
        :class="$vuetify.breakpoint.mobile ? '--mobile-interface' : '--desktop-interface'"
      >
        photo du spray wall
      </div>
      <div
        class="spray-wall-left-side"
        :class="leftSideClass"
      >
        <h3>
          <v-icon left color="primary">
            {{ oblykSprayWall }}
          </v-icon>
          Spray Wall
        </h3>
        <div>
          <p>
            liste des blocs proposé par la communauté
          </p>
          <v-btn
            v-if="sprayWall"
            block
            :to="`${sprayWall.app_path}/spray-wall-routes/new`"
          >
            Proposer un bloc
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { oblykSprayWall } from 'assets/oblyk-icons'
import OblykApi from '@/services/oblyk-api/OblykApi'

export default {
  scrollToTop: true,

  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      sprayWall: null,
      loadingSprayWall: true,

      oblykSprayWall
    }
  },

  computed: {
    leftSideClass () {
      const leftClass = []
      if (this.$vuetify.breakpoint.mobile) {
        leftClass.push('--mobile-interface')
      } else {
        leftClass.push('--desktop-interface')
      }
      return leftClass.join(' ')
    }
  },

  mounted () {
    this.getSprayWall()
  },

  methods: {
    getSprayWall () {
      this.loadingSprayWall = true
      new OblykApi(this.$axios, this.$auth)
        .get(`/gyms/${this.gym.id}/spray_walls/${this.$route.params.sprayWallId}`)
        .then((resp) => {
          this.sprayWall = resp.data
        })
        .finally(() => {
          this.loadingSprayWall = false
        })
    }
  }
}
</script>

<style lang="scss">
.spray-wall-interface {
  position: relative;
  width: 100%;
  &.--desktop-interface { height: calc(100vh - 128px); }

  .spray-wall-left-side {
    position: relative;
    &.--desktop-interface {
      width: 350px;
      height: calc(100vh - 128px);
      overflow-y: auto;
      margin-top: 0;
      .spray-wall-problems {
        width: 350px;
      }
    }
    &.--mobile-interface {
      width: 100%;
      margin-top: calc(100vh - 322px);
    }
  }

  .spray-wall-picture {
    width: 100%;
    &.--desktop-interface {
      height: 100%;
      position: absolute;
      padding-left: 350px;
    }
    &.--mobile-interface {
      height: calc(100vh - 321px);
      position: fixed;
      top: 63px;
      right: 0;
    }
  }
}
</style>
