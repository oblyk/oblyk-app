<template>
  <div>
    <p class="mb-1">
      <small class="font-weight-medium">
        <v-icon color="primary" left small>
          {{ mdiFlash }}
        </v-icon>
        {{ $t('components.fastAccess.title') }}
      </small>
    </p>
    <v-row no-gutters>
      <v-col cols="6" class="pr-1">
        <v-card
          :loading="loading"
          class="rounded"
        >
          <div v-if="gymsCount === 0" class="pa-4 text-center inset-box-shadow text--disabled">
            <small>
              {{ $t('components.fastAccess.myGym') }}
            </small>
          </div>
          <v-list-item
            v-else
            :to="gym.app_path"
            class="px-2"
            dense
          >
            <v-list-item-avatar
              v-if="gym.attachments.avatar.attached"
              class="mr-2"
            >
              <v-img :src="imageVariant(gym.attachments.avatar, { fit: 'crop', width: 100, height: 100 })" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ gym.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ gym.city }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action
              v-if="gymsCount >= 2"
              class="ml-0"
            >
              <v-btn
                icon
                to="/home/favorites/gyms"
              >
                <v-icon>
                  {{ mdiChevronDown }}
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="6" class="pl-1">
        <v-card
          :loading="loading"
          class="rounded"
        >
          <div v-if="cragsCount === 0" class="pa-4 text-center inset-box-shadow text--disabled">
            <small>
              {{ $t('components.fastAccess.myCrag') }}
            </small>
          </div>
          <v-list-item
            v-else
            :to="crag.app_path"
            class="px-2"
            dense
          >
            <v-list-item-avatar
              v-if="crag.attachments.avatar.attached"
              class="mr-2"
            >
              <v-img :src="imageVariant(crag.attachments.avatar, { fit: 'crop', width: 100, height: 100 })" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ crag.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ crag.city }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action
              v-if="cragsCount >= 2"
              class="ml-0"
            >
              <v-btn
                icon
                to="/home/favorites/crags"
              >
                <v-icon>
                  {{ mdiChevronDown }}
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <small
      v-if="gymsCount === 0 && cragsCount === 0"
      class="text--disabled"
    >
      {{ $t('components.fastAccess.helper') }}
    </small>

    <!-- CONTEST -->
    <div
      v-if="contests.length > 0"
      class="mt-2"
    >
      <v-sheet
        v-for="(contest, contestIndex) in contests"
        :key="`contest-index-${contestIndex}`"
        class="rounded mb-1"
      >
        <contest-item-list
          :contest="contest"
          :with-token="contest.participant_token"
        />
      </v-sheet>
    </div>
  </div>
</template>

<script>
import { mdiFlash, mdiChevronDown } from '@mdi/js'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import OblykApi from '~/services/oblyk-api/OblykApi'
import ContestItemList from '~/components/contests/ContestItemList.vue'

export default {
  name: 'UserFastAccess',
  components: { ContestItemList },
  mixins: [ImageVariantHelpers],

  data () {
    return {
      loading: true,
      cragsCount: 0,
      gymsCount: 0,
      crag: null,
      gym: null,
      contests: [],

      mdiFlash,
      mdiChevronDown
    }
  },

  mounted () {
    this.getFollowByTypes()
  },

  methods: {
    getFollowByTypes () {
      this.loading = true
      new OblykApi(this.$axios, this.$auth)
        .get('/fast_accesses')
        .then((resp) => {
          this.cragsCount = resp.data.follows_count.Crag ?? 0
          this.gymsCount = resp.data.follows_count.Gym ?? 0

          this.crag = resp.data.crag
          this.gym = resp.data.gym
          this.contests = resp.data.contests
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
