<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col class="col-12 col-md-6">
          <p class="mb-1 font-weight-bold">
            <v-icon small left>
              {{ mdiText }}
            </v-icon>
            {{ $t('models.approach.description') }}
          </p>
          <div class="pl-7">
            <markdown-text
              v-if="approach.description"
              :text="approach.description"
            />
            <p v-if="!approach.description" class="text-center text--disabled font-italic mb-2">
              {{ $t('models.approach.no_description') }}
            </p>
          </div>
          <p class="mb-1 font-weight-bold">
            <v-icon small left>
              {{ mdiChartLineVariant }}
            </v-icon>
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
                  <v-icon small left>
                    {{ mdiWalk }}
                  </v-icon>
                  {{ $t('models.approach.approach_type') }}
                </dt>
                <dd class="pl-7">
                  {{ $t(`models.approachType.${approach.approach_type}`) }}
                </dd>
              </dl>
            </v-col>
            <v-col class="col-6 col-md-3">
              <dl>
                <dt class="font-weight-bold">
                  <v-icon small left>
                    {{ mdiArrowExpand }}
                  </v-icon>
                  {{ $t('models.approach.length') }}
                </dt>
                <dd class="pl-7">
                  {{ approach.length }} {{ $t('common.meters') }}
                </dd>
              </dl>
            </v-col>
            <v-col class="col-12 col-md-5">
              <dl>
                <dt class="font-weight-bold">
                  <v-icon small left>
                    {{ mdiTimerOutline }}
                  </v-icon>
                  {{ $t('models.approach.time') }}
                </dt>
                <dd class="pl-7">
                  {{ approach.walking_time }} {{ $t('common.minutes') }}
                </dd>
              </dl>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="col-12 col-md-6">
          <client-only>
            <approach-elevation-chart :approach="approach" />
          </client-only>
        </v-col>
      </v-row>
    </v-card-text>
    <client-only>
      <v-card-actions v-if="$auth.loggedIn">
        <v-spacer />
        <v-btn
          text
          :to="`${approach.path}/edit`"
        >
          {{ $t('actions.edit') }}
        </v-btn>
      </v-card-actions>
    </client-only>
  </v-card>
</template>

<script>
import { mdiText, mdiChartLineVariant, mdiWalk, mdiArrowExpand, mdiTimerOutline } from '@mdi/js'
const MarkdownText = () => import('@/components/ui/MarkdownText')
const ApproachElevationChart = () => import('@/components/approaches/ApproachElevationChart')

export default {
  name: 'ApproachCard',
  components: { ApproachElevationChart, MarkdownText },
  props: {
    approach: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiText,
      mdiChartLineVariant,
      mdiWalk,
      mdiArrowExpand,
      mdiTimerOutline
    }
  }
}
</script>
