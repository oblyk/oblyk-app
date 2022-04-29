<template>
  <div class="mt-5">
    <div @click="feedFilterDialog = true">
      <v-chip
        small
        class="mr-2"
        :color="guideBookFeed ? 'primary' : 'light'"
      >
        <v-icon small left>
          {{ mdiBookOpenVariant }}
        </v-icon>
        {{ $t('components.feed.settings.guideBooks') }}
      </v-chip>

      <v-chip
        small
        class="mr-2"
        :color="newsFeed ? 'primary' : 'light'"
      >
        <v-icon small left>
          {{ mdiNewspaperVariantOutline }}
        </v-icon>
        {{ $t('components.feed.settings.articles') }}
      </v-chip>

      <v-chip
        small
        class="mr-2"
        :color="subscribeFeed ? 'primary' : 'light'"
      >
        <v-icon small left>
          {{ mdiStar }}
        </v-icon>
        {{ $t('components.feed.settings.subscribes') }}
      </v-chip>

      <v-chip
        small
        class="mr-2"
        :color="aroundFeed ? 'primary' : 'light'"
      >
        <v-icon small left>
          {{ mdiMapMarkerRadius }}
        </v-icon>
        {{ $t('components.feed.settings.localInfos') }}
      </v-chip>
    </div>
    <!-- Feed filter dialog -->
    <v-dialog
      v-model="feedFilterDialog"
      max-width="700"
    >
      <v-card>
        <v-card-title class="headline">
          {{ $tc('components.user.seeInYourFeed') }}
        </v-card-title>
        <v-card-text>
          <div>
            <v-switch
              v-model="newsFeed"
              :label="$t('components.user.newsFeedLabel')"
            />
          </div>
          <div>
            <v-switch
              v-model="guideBookFeed"
              :label="$t('components.user.newGuideBookLabel')"
            />
          </div>
          <div>
            <v-switch
              v-model="subscribeFeed"
              :label="$t('components.user.subscribeFeedLabel')"
            />
          </div>
          <div>
            <v-switch
              v-model="aroundFeed"
              :label="$t('components.user.aroundFeedLabel')"
            />
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="feedFilterDialog = false"
          >
            {{ $t('common.close') }}
          </v-btn>
          <v-btn
            color="primary"
            @click="setFeedFilter()"
          >
            {{ $t('components.user.saveMyPreference') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiBookOpenVariant, mdiNewspaperVariantOutline, mdiStar, mdiMapMarkerRadius } from '@mdi/js'

export default {
  name: 'SettingFeed',
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiBookOpenVariant,
      mdiNewspaperVariantOutline,
      mdiStar,
      mdiMapMarkerRadius,
      guideBookFeed: (localStorage.getItem('showGuideBookFeed') !== 'false'),
      newsFeed: (localStorage.getItem('showNewsFeed') !== 'false'),
      subscribeFeed: (localStorage.getItem('showSubscribeFeed') !== 'false'),
      aroundFeed: (localStorage.getItem('showAroundFeed') !== 'false'),

      feedFilterDialog: false
    }
  },

  methods: {
    setFeedFilter () {
      localStorage.setItem('showGuideBookFeed', this.guideBookFeed)
      localStorage.setItem('showNewsFeed', this.newsFeed)
      localStorage.setItem('showSubscribeFeed', this.subscribeFeed)
      localStorage.setItem('showAroundFeed', this.aroundFeed)
      const data = {
        guideBooks: this.guideBookFeed,
        articles: this.newsFeed,
        subscribes: this.subscribeFeed,
        localNews: this.aroundFeed
      }
      this.$root.$emit('reloadFeed', data)
      this.feedFilterDialog = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
