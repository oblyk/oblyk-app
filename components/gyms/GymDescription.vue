<template>
  <v-card class="full-height">
    <v-card-title>
      <v-icon left color="primary">
        {{ mdiText }}
      </v-icon>
      {{ $t('models.gym.description') }}
    </v-card-title>
    <v-card-text>
      <markdown-text
        v-if="gym.description"
        :text="gym.description"
      />
    </v-card-text>
    <div
      v-if="gym.upcoming_contests.length > 0"
      class="px-4"
    >
      <p class="font-weight-bold mb-0">
        <v-icon
          left
          color="amber"
        >
          {{ mdiTrophy }}
        </v-icon>
        {{ $tc('components.gym.upcomingContests', gym.upcoming_contests.length, { count: gym.upcoming_contests.length }) }}
      </p>
      <v-list>
        <contest-item-list
          v-for="(contest, contestIndex) in gym.upcoming_contests"
          :key="`contest-index-${contestIndex}`"
          :contest="contestToObject(contest)"
          class="rounded-sm border"
        />
      </v-list>
    </div>
    <v-card-text>
      <v-chip
        v-for="climb in gym.climbingTypes"
        :key="climb"
        class="ma-1"
      >
        {{ $t(`models.climbs.${climb}`) }}
      </v-chip>
    </v-card-text>
    <v-card-text
      v-if="!gym.administered"
      class="text-center"
    >
      <v-btn
        outlined
        :to="`${gym.path}/administration-request?back_to=${gym.path}`"
        color="deep-purple accent-3"
      >
        {{ $t('components.gym.IAmManager') }}
      </v-btn>
      <div>
        <v-btn
          text
          color="deep-purple accent-4"
          link
          :to="`/about/indoor?back_to=${gym.path}`"
        >
          {{ $t('components.gym.createYourGuidebook') }}
        </v-btn>
      </div>
    </v-card-text>
    <v-card-text
      v-if="gym.optimal_spaces_path"
      class="text-center"
    >
      <v-btn
        color="deep-purple accent-4"
        elevation="0"
        text
        outlined
        large
        class="font-weight-black"
        :to="gym.spacePath"
      >
        <v-icon size="25" left class="mr-3">
          {{ mdiSourceBranch }}
        </v-icon>
        TOPO
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiText, mdiTrophy, mdiSourceBranch } from '@mdi/js'
import ContestItemList from '~/components/contests/ContestItemList.vue'
import Contest from '~/models/Contest'

const MarkdownText = () => import('@/components/ui/MarkdownText')

export default {
  name: 'GymDescription',
  components: { ContestItemList, MarkdownText },
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiText,
      mdiTrophy,
      mdiSourceBranch
    }
  },

  methods: {
    contestToObject (contest) {
      return new Contest({ attributes: contest })
    }
  }
}
</script>
