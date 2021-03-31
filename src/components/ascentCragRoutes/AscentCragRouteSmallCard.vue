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

      <!-- Ascent status, Roping status & difficulty appreciation -->
      <ascent-crag-route-status-icon
        :crag-route="cragRoute"
        :ascent-status="ascentCragRoute.ascent_status"
      />
      {{ $t(`models.ascentStatus.${ascentCragRoute.ascent_status}`) }}
      <span v-if="cragRoute.isRopable()">
        , {{ $t('common.in') }} {{ $t(`models.ropingStatus.${ascentCragRoute.roping_status}`) }}
      </span>
      <span v-if="ascentCragRoute.grade_appreciation_text">
        , {{ ascentCragRoute.grade_appreciation_text }}
      </span>

      <!-- Number of attempt -->
      <div v-if="ascentCragRoute.attempt" v-html="$t('components.ascentCragRoute.numberOfAttempt', { number: ascentCragRoute.attempt})" />

      <div
        class="mb-2"
      >
        {{ $t('components.ascentCragRoute.iWasWith') }} :
        <v-chip
          small
          close
          v-for="ascent_user in ascentCragRoute.ascent_users"
          :key="`${ascent_user.id}`"
          @click:close="removeAscentUser(ascent_user)"
          class="mr-1"
        >
          {{ ascent_user.user.first_name }}
        </v-chip>
        <v-dialog
          v-model="ascentUserDialog"
          width="500"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              icon
              v-bind="attrs"
              v-on="on"
              @click="getSubscribeUsers()"
            >
              <v-icon small>
                mdi-plus
              </v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="headline">
              {{ $t('components.ascentCragRoute.iWasWith') }}
            </v-card-title>

            <v-card-text>
              <spinner v-if="loadingSubscribes" :full-height="false" />
              <div
                v-else
                v-for="(subscribe, index) in subscribes"
                :key="`subscribe-${index}`"
              >
                <user-small-card
                  class="mb-2"
                  :user="subscribe"
                  :small="true"
                  :linkable="false"
                  :callback="addAscentUser"
                />
              </div>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>

      <div v-if="ascentCragRoute.CragRoute.sections_count > 1">
        <p
          class="text-decoration-underline"
          v-if="ascentCragRoute.CragRoute.sections_count === ascentCragRoute.sections.length"
        >
          {{ $t('components.ascentCragRoute.iMadeCountPitch', { count: ascentCragRoute.CragRoute.sections_count }) }}
        </p>
        <div v-else>
          <p class="mb-0 text-decoration-underline">
            {{ $t('components.ascentCragRoute.pitchMade') }} :
          </p>
          <ul class="list-style-none pl-3">
            <li
              v-for="(section, index) in ascentCragRoute.sections"
              :key="`ascent-section-${index}`"
            >
              <strong>L {{ section.index + 1 }} :</strong> {{ section.grade }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Comment -->
      <div v-if="ascentCragRoute.comment || ascentCragRoute.note">
        <v-divider class="mb-2 mt-2" />

        <!-- Comment -->
        <markdown-text :text="ascentCragRoute.comment" v-if="ascentCragRoute.comment" />

        <!-- Note -->
        <div v-if="ascentCragRoute.note" class="mt-2">
          <note :note="ascentCragRoute.note" /> {{ $t(`models.note.${noteText(ascentCragRoute.note)}`)}}
        </div>

        <!-- Public or private comment -->
        <div class="text--disabled" v-if="ascentCragRoute.private_comment">
          <v-icon x-small>
            mdi-lock
          </v-icon>
          <small>
            {{ $t('components.ascentCragRoute.privateComment') }}
          </small>
        </div>
        <div class="text--disabled" v-if="!ascentCragRoute.private_comment">
          <v-icon x-small>
            mdi-lock-open
          </v-icon>
          <small>
            {{ $t('components.ascentCragRoute.publicComment') }}
          </small>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { DateHelpers } from '@/mixins/DateHelpers'
import { RecordToObjectHelpers } from '@/mixins/RecordToObjectHelpers'
import AscentCragRouteStatusIcon from '@/components/ascentCragRoutes/AscentCragRouteStatusIcon'
import Note from '@/components/notes/Note'
import NoteClass from '@/models/Note'
import AscentCragRouteApi from '@/services/oblyk-api/AscentCragRouteApi'
import store from '@/store'
import EditAscentBtn from '@/components/ascentCragRoutes/EditAscentBtn'
import MarkdownText from '@/components/ui/MarkdownText'
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import UserSmallCard from '@/components/users/UserSmallCard'
import User from '@/models/User'
import Spinner from '@/components/layouts/Spiner'

export default {
  name: 'AscentCragRouteSmallCard',
  mixins: [DateHelpers, RecordToObjectHelpers],
  components: { Spinner, UserSmallCard, MarkdownText, EditAscentBtn, Note, AscentCragRouteStatusIcon },
  props: {
    ascentCragRoute: Object,
    cragRoute: Object
  },

  data () {
    return {
      ascentUserDialog: false,
      subscribes: [],
      loadingSubscribes: true
    }
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
    },

    removeAscentUser: function (ascentUser) {
      AscentCragRouteApi
        .removeUser(
          this.ascentCragRoute.id,
          ascentUser.user.id
        ).then(() => {
          this.$root.$emit('reloadAscentCragRoute')
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'ascentUser')
        })
    },

    addAscentUser: function (user) {
      AscentCragRouteApi
        .addUser(
          this.ascentCragRoute.id,
          user.id
        ).then(() => {
          this.$root.$emit('reloadAscentCragRoute')
          this.ascentUserDialog = false
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'ascentUser')
        })
    },

    getSubscribeUsers: function () {
      this.loadingSubscribes = true
      CurrentUserApi
        .subscribes()
        .then(resp => {
          for (const subscribe of resp.data) {
            this.subscribes.push(new User(subscribe.followable_object))
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'user')
        })
        .finally(() => {
          this.loadingSubscribes = false
        })
    }
  }
}
</script>
