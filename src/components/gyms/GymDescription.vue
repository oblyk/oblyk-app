<template>
  <v-card class="full-height">
    <v-card-title>Description</v-card-title>
    <v-card-text>
      <markdown-text :text="gym.description" />
    </v-card-text>
    <v-card-text>
      <v-chip
        class="ma-1"
        v-for="climb in gym.climbingTypes()" :key="climb"
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
        :to="gym.path('administration-request')"
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
import MarkdownText from '@/components/ui/MarkdownText'
import ClimbersAround from '@/components/partners/ClimbersAround'
export default {
  name: 'GymDescription',
  components: { ClimbersAround, MarkdownText },
  props: {
    gym: Object
  }
}
</script>
