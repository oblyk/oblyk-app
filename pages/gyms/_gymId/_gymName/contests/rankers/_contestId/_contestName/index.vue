<template>
  <div class="contest-rankers">
    <div
      v-if="loadingResult"
      class="text-center py-10"
    >
      Préparation du mode présentation ...
      <div class="mt-2">
        <v-progress-linear
          color="deep-purple accent-4"
          indeterminate
          rounded
          class="ml-auto mr-auto"
          style="max-width: 265px"
          height="6"
        />
      </div>
    </div>
    <div
      v-else
      class="rankers px-4"
      @mousemove="resetAutoHider"
    >
      <div
        id="rankers-header"
        class="back-app-color px-4"
      >
        <v-chip
          small
          outlined
          class="font-weight-bold live-chip"
        >
          <v-icon
            left
            small
            :color="liveOn ? 'red darken-4' : 'grey darken-3'"
          >
            {{ mdiRecord }}
          </v-icon>
          {{ liveOn ? 'DIRECT' : 'DÉCONNECTÉ' }}
        </v-chip>
        <!-- Contest card -->
        <v-row
          v-if="contest"
          class="d-flex my-1 justify-center"
        >
          <v-col
            :cols="colsDivision * categoriesCount"
            class="pb-0"
          >
            <div class="d-flex">
              <div class="flex-grow-1">
                <v-list-item class="pl-0">
                  <v-list-item-avatar
                    tile
                    size="60"
                  >
                    <v-img
                      v-if="contest.attachments.banner.attached"
                      :src="imageVariant(contest.attachments.banner, { fit: 'crop', width: 100, height: 100 })"
                      class="rounded-sm"
                    />
                    <v-icon v-else>
                      {{ mdiTrophy }}
                    </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      <strong>{{ contest.name }}</strong>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ contest.gym.name }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </div>
              <v-scale-transition>
                <div
                  v-if="newResultsToLoad"
                  class="ml-auto rounded px-2 pb-0 pt-2 ranker-countdown"
                >
                  <v-icon
                    size="40"
                    color="#ffc107"
                    class="ranker-countdown-spark"
                  >
                    {{ mdiShimmer }}
                  </v-icon>
                  <div
                    class="text-center"
                    v-html="$tc('components.contest.newResultsCount', newResultCount, { count: newResultCount } )"
                  />
                  <div class="d-flex align-start">
                    <p class="text-right mr-2 mb-0 mt-1">
                      <small>Mise à jour dans</small>
                    </p>
                    <div class="text-center">
                      <span class="text-h4">{{ remainingTime }}"</span>
                    </div>
                  </div>
                </div>
              </v-scale-transition>
              <div
                v-if="reloading"
                class="ml-auto align-self-center mr-2"
              >
                <v-progress-circular
                  indeterminate
                  color="deep-purple accent-4"
                />
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- Participants category -->
        <v-row
          class="mt-0"
          justify="center"
        >
          <v-col
            v-for="(categoryGenre, categoryGenreIndex) in results"
            :key="`category-participant-genre-index-${categoryGenreIndex}`"
            :cols="colsDivision"
          >
            <p class="font-weight-bold mb-2 pl-1">
              {{ categoryGenre.category_name }}
              <span v-if="!categoryGenre.unisex"> - {{ $t(`models.genres.${categoryGenre.genre}`) }}</span> -
              <small>{{ categoryGenre.participants.length }} participants</small>
            </p>
          </v-col>
        </v-row>
      </div>

      <!-- Participants list -->
      <v-row
        id="rankers-list"
        justify="center"
        class="mx-0"
      >
        <v-col
          v-for="(categoryGenre, categoryGenreIndex) in results"
          :key="`category-genre-index-${categoryGenreIndex}`"
          :cols="colsDivision"
          class="pt-0"
          :class="categoryGenreIndex === 0 ? 'pl-0' : categoryGenreIndex === results.length - 1 ? 'pr-0' : ''"
        >
          <contest-ranker-participant
            :participants="categoryGenre.participants"
          />
        </v-col>
      </v-row>

      <!-- Toolbar -->
      <v-fade-transition>
        <v-toolbar
          v-if="showToolbar"
          dense
          class="rankers-tools rounded-pill"
        >
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                :to="(contest || {}).adminPath"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>
                  {{ mdiArrowLeft }}
                </v-icon>
              </v-btn>
            </template>
            <span>Retour à l'administration</span>
          </v-tooltip>

          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                @click="dark = !dark"
              >
                <v-icon>
                  {{ dark ? mdiWeatherSunny : mdiWeatherSunny }}
                </v-icon>
              </v-btn>
            </template>
            <span v-text="dark ? 'Thème clair' : 'Thème sombre'" />
          </v-tooltip>
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                @click="fullscreen"
              >
                <v-icon>
                  {{ inFullscreen ? mdiArrowCollapse : mdiArrowExpand }}
                </v-icon>
              </v-btn>
            </template>
            <span v-text="inFullscreen ? 'Sortir du plein écran' : 'Plein écran'" />
          </v-tooltip>
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                @click="autoScrollSwitch"
              >
                <v-icon>
                  {{ autoScroll ? mdiMouse : mdiMouseOff }}
                </v-icon>
              </v-btn>
            </template>
            <span v-text="autoScroll ? 'Désactiver l\'auto-défilement' : 'Activer l\'auto-défilement'" />
          </v-tooltip>
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                :loading="reloading"
                v-bind="attrs"
                v-on="on"
                @click="refreshResults"
              >
                <v-icon>
                  {{ mdiRefresh }}
                </v-icon>
              </v-btn>
            </template>
            <span>Rafraichir les résultats</span>
          </v-tooltip>
        </v-toolbar>
      </v-fade-transition>

      <!-- Autoscroll indicator -->
      <div
        v-if="autoScroll"
        class="autoscroll-indicator-container"
      >
        <v-row
          no-gutters
          class="autoscroll-progresses"
        >
          <v-col
            v-for="n in maxScrollParts"
            :key="`progress-${n}`"
            class="px-1"
            @click="scrollToPart(n - 1)"
          >
            <v-progress-linear
              :value="n < scrollPart ? 100 : scrollPart === n ? progressStep : 0"
              rounded
              height="5"
              color="deep-purple accent-4"
            />
          </v-col>
        </v-row>
      </div>

      <div class="notifications-area">
        <v-slide-x-transition group>
          <div
            v-for="(notification, notificationIndex) in notifications"
            :key="`notification-index-${notificationIndex}`"
            class="mt-1"
          >
            <v-chip :ripple="false">
              <v-icon
                left
                size="20"
                :color="notification.color"
              >
                {{ notification.icon }}
              </v-icon>
              {{ notification.message }}
            </v-chip>
          </div>
        </v-slide-x-transition>
      </div>

      <v-dialog
        v-model="tombolaDialog"
        width="500"
      >
        <v-card>
          <v-card-title>
            <div class="ml-auto mr-auto">
              🎲 Tombola !! 🎲
            </div>
          </v-card-title>
          <div class="px-4 pb-4 pt-0">
            <p class="mb-0">Le ou la gagnant·e est ...</p>
            <v-sheet
              rounded
              class="text-center text-h4 back-app-color pa-4"
              :class="tombolaLaunched ? 'text--disabled' : null"
            >
              {{ tombolaWinner === null ? '...' : tombolaWinner }}
            </v-sheet>
          </div>
        </v-card>
      </v-dialog>
    </div>
    <p
      v-if="categoriesCount === 0 && !loadingResult"
      class="text-center mt-10"
    >
      Cette page sera plus intéressante quand le contest aura commencé 😉
    </p>
  </div>
</template>

<script>
import {
  mdiArrowLeft,
  mdiWeatherSunny,
  mdiWeatherNight,
  mdiArrowExpand,
  mdiArrowCollapse,
  mdiRefresh,
  mdiMouse,
  mdiMouseOff,
  mdiTrophy,
  mdiLinkVariant,
  mdiLinkVariantOff,
  mdiCreation,
  mdiPen,
  mdiShimmer,
  mdiRecord
} from '@mdi/js'
import ContestApi from '~/services/oblyk-api/ContestApi'
import Contest from '~/models/Contest'
import ContestRankerParticipant from '~/components/contests/ContestRankerParticipant'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  components: { ContestRankerParticipant },
  mixins: [ImageVariantHelpers],
  meta: { orphanRoute: true },
  layout: 'contest',

  data () {
    return {
      dark: false,
      results: null,
      loadingResult: true,
      contest: null,
      inFullscreen: false,
      hiderTimeout: null,
      scrollTimeout: null,
      showToolbar: true,
      reloading: false,
      newResultsToLoad: false,
      autoScroll: false,
      scrollPart: 1,
      maxScrollParts: 1,
      progressStep: 0,
      stepTimeInterval: null,
      notifications: [],
      clearNotificationTimeout: null,
      newResultCount: 0,
      remainingTime: 31,
      reRankTimeout: null,
      tombolaDialog: false,
      tombolaWinner: null,
      tombolaTimeInterval: null,
      tombolaTimeout: null,
      tombolaLaunched: false,
      liveOn: false,

      mdiArrowLeft,
      mdiWeatherSunny,
      mdiWeatherNight,
      mdiArrowExpand,
      mdiArrowCollapse,
      mdiRefresh,
      mdiMouse,
      mdiMouseOff,
      mdiTrophy,
      mdiShimmer,
      mdiRecord
    }
  },

  head () {
    return {
      title: this.contest?.name,
      meta: [
        { hid: 'description', name: 'description', content: this.contest?.name },
        { hid: 'og:title', property: 'og:title', content: this.contest?.name },
        { hid: 'og:description', property: 'og:description', content: this.contest?.name }
      ]
    }
  },

  computed: {
    categoriesCount () {
      if (this.results) {
        return this.results.length
      } else {
        return 0
      }
    },

    colsDivision () {
      if (this.categoriesCount === 1) {
        return 8
      } else if (this.categoriesCount >= 2 && this.categoriesCount <= 3) {
        return 4
      } else if (this.categoriesCount === 4) {
        return 3
      } else if (this.categoriesCount >= 5 && this.categoriesCount <= 6) {
        return 2
      } else {
        return 1
      }
    }
  },

  channels: {
    ContestRankersChannel: {
      connected () {
        this.pushNotification({ message: 'Connecté au contest', icon: mdiLinkVariant, color: 'deep-purple accent-4' })
        this.liveOn = true
      },
      received (data) {
        this.newResultsFromChanel(data)
      },
      disconnected () {
        this.pushNotification({ message: 'Déconnecté du contest', icon: mdiLinkVariantOff, color: 'red' })
        this.liveOn = false
      }
    }
  },

  watch: {
    dark () {
      this.$vuetify.theme.dark = this.dark
      this.$store.dispatch('theme/changeTheme', this.dark ? 'dark' : 'light')
    }
  },

  mounted () {
    this.getRank()
    this.getContest()
    this.dark = this.$store.getters['theme/getTheme'] === 'dark'
    this.cableContestSubscribe()
  },

  beforeDestroy () {
    clearTimeout(this.hiderTimeout)
    clearTimeout(this.scrollTimeout)
    clearTimeout(this.clearNotificationTimeout)
    clearInterval(this.stepTimeInterval)
    clearInterval(this.reRankTimeout)
    this.cableContestUnsubscribe()
  },

  methods: {
    getRank () {
      this.loadingResult = true
      new ContestApi(this.$axios, this.$auth)
        .results(
          this.$route.params.gymId,
          this.$route.params.contestId
        )
        .then((resp) => {
          this.results = resp.data
        })
        .finally(() => {
          this.loadingResult = false
        })
    },

    refreshResults () {
      this.reloading = true
      new ContestApi(this.$axios, this.$auth)
        .results(
          this.$route.params.gymId,
          this.$route.params.contestId
        )
        .then((resp) => {
          this.results = resp.data
          this.pushNotification({ message: 'Classement actualisé', icon: mdiRefresh, color: 'blue' })
        })
        .finally(() => {
          this.reloading = false
        })
    },

    newResultsFromChanel (data) {
      if (data.type === 'AscentsUpdate' || data.type === 'UpdateParticipant') {
        if (!this.newResultsToLoad) {
          this.newResultsToLoad = true
          this.rankTimer()
        }
        this.newResultCount += 1
        if (data.type === 'AscentsUpdate') {
          this.pushNotification({ message: `${data.first_name}, nouveaux résultats !`, icon: mdiCreation, color: 'amber' })
        } else if (data.type === 'UpdateParticipant') {
          this.pushNotification({ message: `${data.first_name}, profil mise à jour`, icon: mdiPen, color: 'grey darken-2' })
        }
      } else if (data.type === 'OpenTombolaModal') {
        this.tombolaWinner = null
        this.tombolaDialog = true
      } else if (data.type === 'CloseTombolaModal') {
        this.tombolaDialog = false
      } else if (data.type === 'LaunchTombola') {
        this.randomizeParticipants(data.winner)
      }
    },

    rankTimer () {
      if (this.remainingTime <= 1) {
        this.newResultsToLoad = false
        this.remainingTime = 31
        this.newResultCount = 0
        this.refreshResults()
      } else {
        this.remainingTime -= 1
        this.reRankTimeout = setTimeout(() => { this.rankTimer() }, 1000)
      }
    },

    cableContestSubscribe () {
      this.$cable.subscribe(
        {
          channel: 'ContestRankersChannel',
          contest_id: this.$route.params.contestId
        }
      )
    },

    cableContestUnsubscribe () {
      this.$cable.unsubscribe('ContestRankersChannel')
    },

    getContest () {
      new ContestApi(this.$axios, this.$auth)
        .find(
          this.$route.params.gymId,
          this.$route.params.contestId
        )
        .then((resp) => {
          this.contest = new Contest({ attributes: resp.data })
        })
    },

    fullscreen () {
      const element = document.querySelector('#app')
      element.style.overflowY = 'scroll'
      if (this.inFullscreen) {
        document.exitFullscreen()
      } else {
        element.requestFullscreen()
      }
      this.inFullscreen = !this.inFullscreen
    },

    autoScrollSwitch () {
      if (this.autoScroll) {
        clearTimeout(this.scrollTimeout)
        this.autoScroll = false
      } else {
        const scrollContainer = this.inFullscreen ? document.querySelector('#app') : document.documentElement
        clearTimeout(this.scrollTimeout)
        scrollContainer.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
        this.scrollTimeout = setTimeout(() => this.scrollToPart(1), 15000)
        this.initStepProgress(15000)
        this.scrollPart = 1
        this.initScrollIndicator()
        this.autoScroll = true
      }
    },

    scrollToPart (part) {
      const scrollContainer = this.inFullscreen ? document.querySelector('#app') : document.documentElement
      const docHeight = scrollContainer.scrollHeight
      const viewHeight = Math.ceil((document.documentElement.clientHeight - 140) / 62) * 62
      clearTimeout(this.scrollTimeout)
      this.initScrollIndicator()
      if (viewHeight * part > docHeight) {
        scrollContainer.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
        this.scrollPart = 1
        this.scrollTimeout = setTimeout(() => this.scrollToPart(this.scrollPart), 10000)
        this.initStepProgress(10000)
      } else {
        scrollContainer.scrollTo({
          top: viewHeight * part,
          left: 0,
          behavior: 'smooth'
        })
        this.scrollPart = part + 1
        this.scrollTimeout = setTimeout(() => this.scrollToPart(this.scrollPart), 8000)
        this.initStepProgress(8000)
      }
    },

    initStepProgress (time) {
      clearInterval(this.stepTimeInterval)
      this.progressStep = 0
      this.stepTimeInterval = setInterval(() => { this.progressStep += 1 }, time / 100)
    },

    initScrollIndicator () {
      const scrollContainer = this.inFullscreen ? document.querySelector('#app') : document.documentElement
      const docHeight = scrollContainer.scrollHeight
      const viewHeight = Math.ceil((document.documentElement.clientHeight - 140) / 62) * 62
      this.maxScrollParts = Math.ceil(docHeight / viewHeight)
    },

    resetAutoHider () {
      if (this.hiderTimeout) {
        clearTimeout(this.hiderTimeout)
      }
      this.showToolbar = true
      this.hiderTimeout = setTimeout(() => { this.showToolbar = false }, 3000)
    },

    pushNotification (data) {
      clearTimeout(this.clearNotificationTimeout)
      this.notifications.push(data)
      this.clearNotificationTimeout = setTimeout(() => {
        this.notifications = []
      }, 5000)
    },

    randomizeParticipants (winner) {
      const participants = []
      this.tombolaLaunched = true
      for (const category of this.results) {
        for (const participant of category.participants) {
          participants.push(`${participant.first_name} ${participant.last_name}`)
        }
      }
      this.tombolaTimeInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * participants.length)
        this.tombolaWinner = participants[randomIndex]
      }, 50)
      this.tombolaTimeout = setTimeout(() => {
        this.tombolaLaunched = false
        clearInterval(this.tombolaTimeInterval)
        this.tombolaWinner = `${winner} !`
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
.live-chip {
  position: absolute;
  right: 5px;
  top: 5px
}
.contest-rankers {
  min-height: calc(100vh - 140px);
  padding-bottom: 15px;
  .ranker-countdown {
    border-color: #ffc107;
    border-style: solid;
    border-width: 2px;
    position: relative;
    .ranker-countdown-spark {
      position: absolute;
      right: -21px;
      top: -22px;
    }
  }
  .rankers-tools {
    position: fixed;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
  .autoscroll-indicator-container {
    position: fixed;
    bottom: 1px;
    left: 0;
    width: 100vw;
    height: 5px;
    .autoscroll-progresses {
      height: 5px;
    }
  }

  #rankers-header {
    height: 140px;
    width: 100vw;
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
  }

  #rankers-list {
    margin-top: 140px;
  }

  .notifications-area {
    width: auto;
    position: fixed;
    bottom: 7px;
    left: 3px;
    z-index: 3;
  }
}
</style>
