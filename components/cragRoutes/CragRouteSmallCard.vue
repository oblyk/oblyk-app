<template>
  <div>
    <v-card
      link
      flat
      :class="bordered ? 'border' : null"
      :to="linkable ? cragRoute.app_path : null"
    >
      <v-list-item>
        <crag-route-avatar
          :crag-route="cragRoute"
          base-font-size="1rem"
          class="mr-2"
        />
        <v-list-item-content>
          <v-list-item-title>
            <climbing-style-icon
              :climbing-style="cragRoute.climbing_type"
              small
              class="vertical-align-text-top"
              style="padding-top: 3px"
            />
            <client-only>
              <ascent-crag-route-status-icon
                v-if="$auth.loggedIn"
                :crag-route="cragRoute"
                class="mb-1"
              />
            </client-only>
            {{ cragRoute.name }}
            <crag-route-note
              :route="cragRoute"
              class="mb-1"
            />
            <v-icon
              v-if="cragRoute.photos_count > 0"
              :title="$tc('components.photo.countInfos', cragRoute.photos_count, { count: cragRoute.photos_count } )"
              small
              class="ml-3"
            >
              {{ mdiCamera }}
            </v-icon>
            <v-icon
              v-if="cragRoute.videos_count > 0"
              :title="$tc('components.video.countInfos', cragRoute.videos_count, { count: cragRoute.videos_count } )"
              small
              class="ml-3"
            >
              {{ mdiFilmstrip }}
            </v-icon>
            <v-icon
              v-if="cragRoute.comments_count > 0"
              :title="$tc('components.comment.countInfos', cragRoute.comments_count, { count: cragRoute.comments_count } )"
              small
              class="ml-3"
            >
              {{ mdiComment }}
            </v-icon>
            <small
              v-if="cragRoute.ascents_count > 0"
              class="ml-2 d-inline-block rounded border py-1 px-2"
              :title="$tc('components.ascent.countInfos', cragRoute.ascents_count, { count: cragRoute.ascents_count } )"
            >
              {{ cragRoute.ascents_count }}
              <v-icon
                class="vertical-align-sub"
                small
              >
                {{ mdiCheckAll }}
              </v-icon>
            </small>
          </v-list-item-title>
          <v-list-item-subtitle class="span-comma">
            {{ cragRoute.crag.name }}
            <span v-if="cragRoute.crag_sector">
              / {{ cragRoute.crag_sector.name }}
            </span>
            <span v-if="cragRoute.opener">
              {{ $t('common.by') }} {{ cragRoute.opener }}
            </span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import { mdiCheckAll, mdiCamera, mdiFilmstrip, mdiComment } from '@mdi/js'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import AscentCragRouteStatusIcon from '@/components/ascentCragRoutes/AscentCragRouteStatusIcon'
import ClimbingStyleIcon from '~/components/crags/ClimbingStyleIcon'
import CragRouteAvatar from '~/components/cragRoutes/partial/CragRouteAvatar'
import CragRouteNote from '~/components/cragRoutes/partial/CragRouteNote'

export default {
  name: 'CragRouteSmallCard',
  components: { CragRouteNote, ClimbingStyleIcon, CragRouteAvatar, AscentCragRouteStatusIcon },
  mixins: [ImageVariantHelpers],
  props: {
    cragRoute: {
      type: Object,
      required: true
    },
    linkable: {
      type: Boolean,
      required: false,
      default: true
    },
    small: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      mdiCheckAll,
      mdiCamera,
      mdiFilmstrip,
      mdiComment
    }
  }
}
</script>
