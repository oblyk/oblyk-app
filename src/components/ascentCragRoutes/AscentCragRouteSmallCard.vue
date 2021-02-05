<template>
  <v-card
    flat
    class="mb-3"
  >
    <v-card-text>
      <div>
        {{ $t('components.ascentCragRoute.ascentMadeOn', { date: humanizeDate(ascentCragRoute.released_at) }) }}
        <v-btn
          small
          icon
          @click="deleteAscent"
        >
          <v-icon small>mdi-delete</v-icon>
        </v-btn>
        <edit-ascent-btn
          :crag-route="cragRoute"
          :ascent-crag-route="ascentCragRoute"
        />
      </div>
      <ascent-crag-route-status-icon
        :crag-route="cragRoute"
        :ascent-status="ascentCragRoute.ascent_status"
      />
      {{ $t(`models.ascentStatus.${ascentCragRoute.ascent_status}`) }}
      <span v-if="cragRoute.isRopable()">
        , {{ $t('common.in') }} {{ $t(`models.ropingStatus.${ascentCragRoute.roping_status}`) }}
      </span>
      <div v-if="ascentCragRoute.attempt" v-html="$t('components.ascentCragRoute.numberOfAttempt', { number: ascentCragRoute.attempt})" />
      <div v-if="ascentCragRoute.comment">
        <v-divider class="mb-2 mt-2" />
        {{ ascentCragRoute.comment }}
        <div v-if="ascentCragRoute.note" class="mt-2">
          <note :note="ascentCragRoute.note" /> {{ $t(`models.note.${noteText(ascentCragRoute.note)}`)}}
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { DateHelpers } from '@/mixins/DateHelpers'
import AscentCragRouteStatusIcon from '@/components/ascentCragRoutes/AscentCragRouteStatusIcon'
import Note from '@/components/notes/Note'
import NoteClass from '@/models/Note'
import AscentCragRouteApi from '@/services/oblyk-api/AscentCragRouteApi'
import store from '@/store'
import EditAscentBtn from '@/components/ascentCragRoutes/EditAscentBtn'

export default {
  name: 'AscentCragRouteSmallCard',
  mixins: [DateHelpers],
  components: { EditAscentBtn, Note, AscentCragRouteStatusIcon },
  props: {
    ascentCragRoute: Object,
    cragRoute: Object
  },

  methods: {
    noteText: function () {
      return new NoteClass().valueToText(this.ascentCragRoute.note)
    },

    deleteAscent: function () {
      if (confirm(this.$t('actions.areYouSur'))) {
        AscentCragRouteApi
          .delete(this.ascentCragRoute.id)
          .then(resp => {
            store.dispatch('auth/updateAscentCragRoutes', {
              ascent_crag_routes: resp.data
            })
            this.$root.$emit('reloadAscentCragRoute')
          })
          .catch(err => {
            this.$root.$emit('alertFromApiError', err, 'ascentCragRoute')
          })
      }
    }
  }
}
</script>
