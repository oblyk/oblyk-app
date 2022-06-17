<template>
  <v-sheet
    elevation="0"
    class="pa-4 --bordered-card"
  >
    <div v-if="loadingAscents">
      <v-skeleton-loader type="list-item-avatar" />
    </div>
    <div v-else>
      <div
        v-if="ascents.length > 0"
        :class="collapse ? 'subscribes-ascents-collapsed' : ''"
      >
        <div>
          <div
            v-for="(ascent, ascentIndex) in ascents"
            :key="`ascent-index-${ascentIndex}`"
          >
            <p
              v-if="ascentIndex === 0 || ascent.user.id !== ascents[ascentIndex -1].user.id"
              class="mb-0"
              :class="ascentIndex !== 0 ? 'mt-5' : ''"
            >
              <nuxt-link
                class="text-decoration-none"
                :to="userToObject(ascent.user).path"
              >
                {{ ascent.user.first_name }}
              </nuxt-link>
              <span :title="humanizeDate(ascent.history.created_at)">
                {{ dateFromNow(ascent.history.created_at) }}
              </span>
            </p>
            <crag-route-small-line :route="cragRouteToObject(ascent.crag_route)" />
            <div
              v-if="!ascent.private_comment"
              class="pl-16 ml-5 mb-2"
            >
              <p class="mb-0">
                {{ ascent.comment }}
              </p>
              <note
                v-if="ascent.note"
                :note="ascent.note"
              />
            </div>
          </div>
          <div
            v-if="!noMoreAscents"
            class="text-center"
          >
            <v-btn
              text
              :loading="loadingMoreAscents"
              @click="getSubscribesAscents"
            >
              {{ $t('components.subscribesAscents.nextAscents') }}
            </v-btn>
          </div>
        </div>
        <div
          v-if="collapse"
          class="show-more-subscribes-ascents"
        >
          <v-btn
            text
            @click="collapse = false"
          >
            {{ $t('actions.see') }}
          </v-btn>
        </div>
      </div>
      <div v-else>
        <p class="text-center font-italic mb-0">
          {{ $t('components.subscribesAscents.noAscents') }}
        </p>
      </div>
    </div>
  </v-sheet>
</template>

<script>
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'
import CragRoute from '~/models/CragRoute'
import CragRouteSmallLine from '~/components/cragRoutes/CragRouteSmallLine'
import { DateHelpers } from '~/mixins/DateHelpers'
import User from '~/models/User'
import Note from '~/components/notes/Note'

export default {
  name: 'SubscribesAscentsCard',
  components: { Note, CragRouteSmallLine },
  mixins: [DateHelpers],
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingAscents: true,
      loadingMoreAscents: false,
      noMoreAscents: false,
      page: 1,
      ascents: [],
      collapse: true
    }
  },

  mounted () {
    this.getSubscribesAscents()
  },

  methods: {
    getSubscribesAscents () {
      if (this.page !== 1) { this.loadingMoreAscents = true }

      new CurrentUserApi(this.$axios, this.$auth)
        .subscribesAscents(this.page)
        .then((resp) => {
          if (resp.data.length < 25) { this.noMoreAscents = true }
          for (const ascent of resp.data) {
            this.ascents.push(ascent)
          }
          this.page += 1
        })
        .finally(() => {
          this.loadingAscents = false
          this.loadingMoreAscents = false
        })
    },

    cragRouteToObject (cragRoute) {
      return new CragRoute({ attributes: cragRoute })
    },

    userToObject (user) {
      return new User({ attributes: user })
    }
  }
}
</script>

<style lang="scss" scoped>
.subscribes-ascents-collapsed {
  .show-more-subscribes-ascents {
    display: none;
  }
}
.theme--dark {
  .subscribes-ascents-collapsed .show-more-subscribes-ascents {
    background: linear-gradient(rgba(30, 30, 30, 0) 0%, rgba(30, 30, 30, 0.8) 50%, rgba(30, 30, 30, 1) 100%);
  }
}
.theme--light {
  .subscribes-ascents-collapsed .show-more-subscribes-ascents {
    background: linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 1) 100%);
  }
}
@media only screen and (max-width: 600px) {
  .subscribes-ascents-collapsed {
    height: 200px;
    overflow-y: hidden;
    position: relative;
    .show-more-subscribes-ascents {
      display: block;
      position: absolute;
      bottom: 0;
      height: 150px;
      padding-top: 105px;
      padding-bottom: 10px;
      width: 100%;
      background: linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 1) 100%);
      text-align: center;
    }
  }
}
</style>
