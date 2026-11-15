<template>
  <v-list-item
    class="rounded-list-item pl-2"
    style="position: relative"
    @click="openSprayWallRoute"
  >
    <v-list-item-avatar size="65" class="my-1">
      <v-avatar
        rounded="pill"
        size="65"
        class="mt-0 mb-0"
        :style="itemStyle"
      >
        <spray-wall-route-avatar
          :spray-wall-route="sprayWallRoute"
          :spray-wall="sprayWall"
        />
      </v-avatar>
    </v-list-item-avatar>
    <v-list-item-content style="position: relative">
      <v-list-item-title class="d-flex">
        <div class="mr-auto text-truncate">
          {{ sprayWallRoute.name }}
        </div>
        <div class="pt-1 text-no-wrap">
          <gym-route-grade-and-point
            :gym-route="sprayWallRoute"
            inline
          />
          <gym-route-sub-level
            v-if="sprayWallRoute.sub_level"
            class="ml-1"
            :gym-route="sprayWallRoute"
          />
        </div>
      </v-list-item-title>
      <v-list-item-subtitle class="d-flex">
        <div class="mr-auto">
          <spray-wall-route-climbing-simple-style-icons :spray-wall-route="sprayWallRoute" />
        </div>
        <div>
          <!-- Likes -->
          <strong v-if="sprayWallRoute.likes_count && sprayWallRoute.likes_count > 0">
            <v-icon
              class="vertical-align-text-bottom"
              color="red"
              small
            >
              {{ mdiHeart }}
            </v-icon>
            {{ sprayWallRoute.likes_count }}
          </strong>

          <!-- videos -->
          <strong
            v-if="sprayWallRoute.videos_count || 0 !== 0"
            class="text--disabled"
          >
            <v-icon
              small
              class="ml-2 text--disabled vertical-align-top"
            >
              {{ mdiPlayBox }}
            </v-icon>
            {{ sprayWallRoute.videos_count || 0 }}
          </strong>

          <!-- comments -->
          <strong
            v-if="sprayWallRoute.all_comments_count || 0 !== 0"
            class="text--disabled"
          >
            <v-icon
              small
              class="ml-2 text--disabled"
            >
              {{ mdiComment }}
            </v-icon>
            {{ sprayWallRoute.all_comments_count || 0 }}
          </strong>

          <!-- Ascents -->
          <strong
            v-if="sprayWallRoute.ascents_count || 0 !== 0"
            class="text--disabled"
          >
            <v-icon
              small
              class="ml-2 text--disabled"
            >
              {{ mdiCheckAll }}
            </v-icon>
            {{ sprayWallRoute.ascents_count || 0 }}
          </strong>
        </div>
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { mdiHeart, mdiPlayBox, mdiComment, mdiCheckAll } from '@mdi/js'
import SprayWallRouteAvatar from '~/components/sprayWallRoutes/SprayWallRouteAvatar'
import GymRouteGradeAndPoint from '~/components/gymRoutes/partial/GymRouteGradeAndPoint'
import GymRouteSubLevel from '~/components/gymRoutes/GymRouteSubLevel'
import SprayWallRouteClimbingSimpleStyleIcons from '~/components/sprayWallRoutes/SprayWallRouteClimbingSimpleStyleIcons'

export default {
  name: 'SprayWallRouteItem',
  components: {
    SprayWallRouteClimbingSimpleStyleIcons,
    GymRouteSubLevel,
    GymRouteGradeAndPoint,
    SprayWallRouteAvatar
  },
  props: {
    sprayWall: {
      type: Object,
      required: true
    },
    sprayWallRoute: {
      type: Object,
      required: true
    },
    absolutePath: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      mdiHeart,
      mdiPlayBox,
      mdiComment,
      mdiCheckAll
    }
  },

  computed: {
    itemStyle () {
      const color = this.sprayWallRoute.level_index ? this.sprayWallRoute.level_color : this.sprayWallRoute.grade_color
      return `border-style: solid; border-width: 5px; border-color: ${color}`
    }
  },

  methods: {
    openSprayWallRoute () {
      const query = { ...this.$route.query }
      query.spray_wall_route = this.sprayWallRoute.id

      if (this.absolutePath) {
        this.$router.replace({ path: this.sprayWallRoute.app_path, query })
      } else {
        this.$router.replace({ path: this.$route.path, query })
      }
    }
  }
}
</script>
