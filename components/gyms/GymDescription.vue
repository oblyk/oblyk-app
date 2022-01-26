<template>
  <v-card class="full-height">
    <v-card-title>Description</v-card-title>
    <v-card-text>
      <markdown-text
        v-if="gym.description"
        :text="gym.description"
      />
    </v-card-text>
    <v-card-text>
      <v-chip
        class="ma-1"
        v-for="climb in gym.climbingTypes"
        :key="climb"
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
        :to="`/a${gym.path}/administration-request`"
        color="primary"
      >
        {{ $t('components.gym.IAmManager') }}
      </v-btn>
    </v-card-text>

    <!-- Around climbers -->
    <climbers-around :latitude="gym.latitude" :longitude="gym.longitude" />
  </v-card>
</template>

<script>
import ClimbersAround from '@/components/partners/ClimbersAround'
const MarkdownText = () => import('@/components/ui/MarkdownText')

export default {
  name: 'GymDescription',
  components: { ClimbersAround, MarkdownText },
  props: {
    gym: {
      type: Object,
      required: true
    }
  }
}
</script>
