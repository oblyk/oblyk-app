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
          <v-icon small>
            {{ mdiDelete }}
          </v-icon>
        </v-btn>
        <edit-crag-ascent-btn
          :crag-route="cragRoute"
          :ascent-crag-route="ascentCragRoute"
        />
      </div>

      <!-- Ascent status, Roping status & difficulty appreciation -->
      <ascent-crag-route-status-icon
        v-if="$auth.loggedIn"
        :crag-route="cragRoute"
        :ascent-status="ascentCragRoute.ascent_status"
      />
      {{ $t(`models.ascentStatus.${ascentCragRoute.ascent_status}`) }}
      <span v-if="isRopable(cragRoute.climbing_type)">
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
          v-for="ascent_user in ascentCragRoute.ascent_users"
          :key="`${ascent_user.id}`"
          small
          close
          class="mr-1"
          @click:close="removeAscentUser(ascent_user)"
        >
          {{ ascent_user.user.first_name }}
        </v-chip>
        <v-dialog
          v-model="ascentUserDialog"
          width="500"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              small
              icon
              v-bind="attrs"
              v-on="on"
              @click="getSubscribeUsers()"
            >
              <v-icon small>
                {{ mdiPlus }}
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
                v-for="(subscribe, index) in subscribes"
                v-else
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
          v-if="ascentCragRoute.CragRoute.sections_count === ascentCragRoute.sections.length"
          class="text-decoration-underline"
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
        <markdown-text
          v-if="ascentCragRoute.comment"
          :text="ascentCragRoute.comment"
        />

        <!-- Note -->
        <div v-if="ascentCragRoute.note" class="mt-2">
          <note :note="ascentCragRoute.note" /> {{ $t(`models.note.${noteText(ascentCragRoute.note)}`) }}
        </div>

        <!-- Public or private comment -->
        <div v-if="ascentCragRoute.private_comment" class="text--disabled">
          <v-icon x-small>
            {{ mdiLock }}
          </v-icon>
          <small>
            {{ $t('components.ascentCragRoute.privateComment') }}
          </small>
        </div>
        <div v-if="!ascentCragRoute.private_comment" class="text--disabled">
          <v-icon x-small>
            {{ mdiLockOpen }}
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
import { mdiDelete, mdiPlus, mdiLock, mdiLockOpen } from '@mdi/js'
import { DateHelpers } from '@/mixins/DateHelpers'
import { CragRouteHelpers } from '~/mixins/CragRouteHelpers'
import AscentCragRouteStatusIcon from '@/components/ascentCragRoutes/AscentCragRouteStatusIcon'
import Note from '@/components/notes/Note'
import NoteClass from '@/models/Note'
import AscentCragRouteApi from '~/services/oblyk-api/AscentCragRouteApi'
import EditCragAscentBtn from '@/components/ascentCragRoutes/EditCragAscentBtn'
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'
import UserSmallCard from '@/components/users/UserSmallCard'
import User from '@/models/User'
import Spinner from '@/components/layouts/Spiner'
const MarkdownText = () => import('@/components/ui/MarkdownText')

export default {
  name: 'AscentCragRouteSmallCard',
  components: {
    Spinner,
    UserSmallCard,
    MarkdownText,
    EditCragAscentBtn,
    Note,
    AscentCragRouteStatusIcon
  },
  mixins: [
    DateHelpers,
    CragRouteHelpers
  ],
  props: {
    ascentCragRoute: {
      type: Object,
      required: true
    },
    cragRoute: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      ascentUserDialog: false,
      subscribes: [],
      loadingSubscribes: true,

      mdiDelete,
      mdiPlus,
      mdiLock,
      mdiLockOpen
    }
  },

  methods: {
    noteText () {
      return new NoteClass().valueToText(this.ascentCragRoute.note)
    },

    deleteAscent () {
      if (confirm(this.$t('actions.areYouSur'))) {
        new AscentCragRouteApi(this.$axios, this.$auth)
          .delete(this.ascentCragRoute.id)
          .then((resp) => {
            this.$auth.fetchUser().then(() => {
              this.$root.$emit('reloadAscentCragRoute')
            })
          })
          .catch((err) => {
            this.$root.$emit('alertFromApiError', err, 'ascentCragRoute')
          })
      }
    },

    removeAscentUser (ascentUser) {
      new AscentCragRouteApi(this.$axios, this.$auth)
        .removeUser(
          this.ascentCragRoute.id,
          ascentUser.user.id
        ).then(() => {
          this.$auth.fetchUser().then(() => {
            this.$root.$emit('reloadAscentCragRoute')
          })
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'ascentUser')
        })
    },

    addAscentUser (user) {
      new AscentCragRouteApi(this.$axios, this.$auth)
        .addUser(
          this.ascentCragRoute.id,
          user.id
        )
        .then(() => {
          this.$root.$emit('reloadAscentCragRoute')
          this.ascentUserDialog = false
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'ascentUser')
        })
    },

    getSubscribeUsers () {
      this.loadingSubscribes = true
      new CurrentUserApi(this.$axios, this.$auth)
        .subscribes()
        .then((resp) => {
          for (const subscribe of resp.data) {
            this.subscribes.push(new User({ attributes: subscribe.followable_object }))
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'user')
        })
        .finally(() => {
          this.loadingSubscribes = false
        })
    }
  }
}
</script>
