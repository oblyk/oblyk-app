<template>
  <v-container style="max-width: 800px;">
    <h2 class="mb-7">
      {{ $t('components.user.myPartnerSearch') }}
    </h2>

    <div v-if="!firstLoadingClimbers">
      <locality-user-filter
        v-model="filters"
        :elevation="0"
        bg-color="backCardColor"
      />
    </div>

    <v-skeleton-loader
      v-if="firstLoadingClimbers || reloading"
      type="article"
    />

    <div v-else>
      <div
        v-for="(climberLocality, climberIndex) in climberLocalities"
        :key="`climber-index-${climberIndex}`"
      >
        <locality-user-card :climber-locality="climberLocality" />
      </div>
      <loading-more
        :get-function="getClimberLocalities"
        :loading-more="loadingMoreData"
        :no-more-data="noMoreDataToLoad"
        skeleton-type="list-item-three-line"
      />

      <p
        v-if="climberLocalities.length === 0"
        class="text--disabled text-center my-6"
      >
        {{ $t('common.pages.partner.emptyClimbersWithFilter') }}
      </p>
    </div>
  </v-container>
</template>

<script>
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import LocalityUser from '~/models/LocalityUser'
import LoadingMore from '~/components/layouts/LoadingMore.vue'
import LocalityUserCard from '~/components/localityUsers/LocalityUserCard.vue'
import LocalityUserFilter from '~/components/localityUsers/LocalityUserFilter.vue'

export default {
  components: {
    LocalityUserFilter,
    LocalityUserCard,
    LoadingMore
  },
  mixins: [LoadingMoreHelpers],

  data () {
    return {
      firstLoadingClimbers: true,
      climberLocalities: [],
      reloading: false,
      filters: {
        partnerSearch: false,
        climbingType: null,
        level: null
      },
      lastPartnerCheckAt: null,
      timeOut: null
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Ma recherche de partenaire'
      },
      en: {
        metaTitle: 'My partner search'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  watch: {
    filters: {
      handler () {
        this.getClimberLocalities(true)
      },
      deep: true
    }
  },

  mounted () {
    this.lastPartnerCheckAt = this.$auth.user.last_partner_check_at
    this.getClimberLocalities()
    this.timeOut = setTimeout(() => {
      this.partnerChecked()
    }, 2000)
  },

  beforeDestroy () {
    clearTimeout(this.timeOut)
  },

  methods: {
    getClimberLocalities (reload) {
      if (reload) {
        this.resetLoadMorePageNumber()
        this.climberLocalities = []
        this.reloading = true
      }
      this.moreIsBeingLoaded()
      new CurrentUserApi(this.$auth, this.$auth)
        .partnerAroundLocalities(
          this.filters,
          this.lastPartnerCheckAt,
          this.page
        )
        .then((resp) => {
          for (const climberLocality of resp.data) {
            this.climberLocalities.push(new LocalityUser({ attributes: climberLocality }))
          }
          this.successLoadingMore(resp)
        })
        .finally(() => {
          this.reloading = false
          this.firstLoadingClimbers = false
          this.finallyMoreIsLoaded()
        })
    },

    partnerChecked () {
      new CurrentUserApi(this.$axios, this.$auth)
        .partnerChecked()
        .then(() => {
          this.$auth.fetchUser()
        })
    }
  }
}
</script>
