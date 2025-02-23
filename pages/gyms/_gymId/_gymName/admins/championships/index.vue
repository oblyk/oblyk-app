<template>
  <v-container>
    <spinner v-if="loadingChampionships && !gym" />
    <div v-if="!loadingChampionships && gym">
      <v-breadcrumbs :items="breadcrumbs" />
      <indoor-subscription-lock-alert
        feature="championship"
        :gym="gym"
      />
      <v-list
        v-if="championships.length > 0"
        class="mb-4"
      >
        <div
          v-for="(championship, championshipIndex) in championships"
          :key="`championship-index-${championshipIndex}`"
        >
          <p
            v-if="archiveSeparator(championship, championshipIndex)"
            class="mt-4 pb-2 border-bottom pl-3 font-weight-bold"
          >
            <v-icon left>
              {{ mdiBookshelf }}
            </v-icon>
            Championnats archivés
          </p>
          <championship-item-list
            :championship="championship"
            :public-path="false"
            :archived="championship.archived_at !== null"
          />
        </div>
      </v-list>
      <p
        v-else
        class="text-center text--disabled py-5"
      >
        Pas de championnat
      </p>
      <div class="text-right">
        <v-btn
          elevation="0"
          color="primary"
          :disabled="gym.plan === 'free'"
          :to="`${gym.adminPath}/championships/new`"
        >
          <v-icon
            v-if="gym.plan === 'free'"
            left
          >
            {{ mdiLock }}
          </v-icon>
          Nouveau championnat
          <v-icon
            v-if="gym.plan === 'free_trial'"
            right
          >
            {{ mdiArrowUpBoldHexagonOutline }}
          </v-icon>
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mdiBookshelf, mdiArrowUpBoldHexagonOutline, mdiLock } from '@mdi/js'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'
import Spinner from '~/components/layouts/Spiner'
import ChampionshipApi from '~/services/oblyk-api/ChampionshipApi'
import ChampionshipItemList from '~/components/championships/ChampionshipItemList.vue'
import Championship from '~/models/Championship'
import IndoorSubscriptionLockAlert from '~/components/indoorSubscription/IndoorSubscriptionLockAlert.vue'

export default {
  components: { IndoorSubscriptionLockAlert, ChampionshipItemList, Spinner },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern, GymRolesHelpers],
  middleware: ['auth', 'gymAdmin'],

  data () {
    return {
      loadingChampionships: true,
      championships: [],

      mdiLock,
      mdiBookshelf,
      mdiArrowUpBoldHexagonOutline
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Les championnats'
      },
      en: {
        metaTitle: 'Championships'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  computed: {
    breadcrumbs () {
      return [
        {
          text: this.gym?.name,
          disable: true
        },
        {
          text: this.$t('components.gymAdmin.home'),
          to: `${this.gym?.adminPath}`,
          exact: true
        },
        {
          text: this.$t('components.gymAdmin.championships'),
          to: `${this.gym?.adminPath}/championships`,
          exact: true
        }
      ]
    }
  },

  mounted () {
    this.getChampionships()
  },

  methods: {
    getChampionships () {
      this.loadingChampionships = true
      new ChampionshipApi(this.$axios, this.$auth)
        .all(this.$route.params.gymId)
        .then((resp) => {
          this.championships = []
          for (const championship of resp.data) {
            this.championships.push(new Championship({ attributes: championship }))
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'championship')
        })
        .finally(() => {
          this.loadingChampionships = false
        })
    },

    archiveSeparator (championship, championshipIndex) {
      return (championshipIndex === 0 && championship.archived_at !== null) || (championshipIndex > 0 && championship.archived_at !== null && this.championships[championshipIndex - 1].archived_at === null)
    }
  }
}
</script>
