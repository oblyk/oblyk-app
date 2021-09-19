<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col class="col-12 col-md-6">
          <p class="mb-1 font-weight-bold">
            <v-icon small left>mdi-text</v-icon>
            {{ $t('models.approach.description') }}
          </p>
          <div class="pl-7">
            <markdown-text :text="approach.description" v-if="approach.description" />
            <p class="text-center text--disabled font-italic mb-2" v-if="!approach.description">
              {{ $t('models.approach.no_description') }}
            </p>
          </div>
          <p class="mb-1 font-weight-bold">
            <v-icon small left>mdi-chart-line-variant</v-icon>
            {{ $t('models.approach.elevation_drop') }}
          </p>
          <div class="pl-7 mb-2">
            {{ $t('components.approach.elevation_description', { start: approach.elevation.start, end: approach.elevation.end }) }}
            (<span class="green--text">+{{ approach.elevation.positive_drop }}m</span>; <span class="red--text">{{ approach.elevation.negative_drop }}m</span>)
          </div>
          <v-row>
            <v-col class="col-6 col-md-4">
              <dl>
                <dt class="font-weight-bold">
                  <v-icon small left>mdi-walk</v-icon>
                  {{ this.$t('models.approach.approach_type') }}
                </dt>
                <dd class="pl-7">{{ this.$t(`models.approachType.${approach.approach_type}`) }}</dd>
              </dl>
            </v-col>
            <v-col class="col-6 col-md-3">
              <dl>
                <dt class="font-weight-bold">
                  <v-icon small left>mdi-arrow-expand</v-icon>
                  {{ this.$t('models.approach.length') }}
                </dt>
                <dd class="pl-7">{{ approach.length }} {{ this.$t('common.meters') }}</dd>
              </dl>
            </v-col>
            <v-col class="col-12 col-md-5">
              <dl>
                <dt class="font-weight-bold">
                  <v-icon small left>mdi-timer-outline</v-icon>
                  {{ this.$t('models.approach.time') }}
                </dt>
                <dd class="pl-7">
                  {{ approach.walking_time }} {{ this.$t('common.minutes') }}
                </dd>
              </dl>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="col-12 col-md-6">
          <approach-elevation-chart :approach="approach" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions v-if="isLoggedIn">
      <v-spacer />
      <v-btn
        text
        :to="approach.path('edit')"
      >
        {{ $t('actions.edit') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { SessionConcern } from '@/concerns/SessionConcern'
import MarkdownText from '@/components/ui/MarkdownText'
import ApproachElevationChart from '@/components/approaches/ApproachElevationChart'

export default {
  name: 'ApproachCard',
  mixins: [SessionConcern],
  components: { ApproachElevationChart, MarkdownText },
  props: {
    approach: Object
  }
}
</script>
