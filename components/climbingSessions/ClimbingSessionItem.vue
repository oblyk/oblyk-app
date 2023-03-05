<template>
  <v-row>
    <v-col
      cols="12"
      md="2"
      class="pr-0 pb-0"
    >
      <p
        :class="$vuetify.breakpoint.mobile ? 'mb-1 font-italic pl-1' : 'border-bottom mb-1 font-italic'"
      >
        {{ dateFromToday(climbingSession.session_date) }}
      </p>
    </v-col>
    <v-col
      cols="12"
      md="9"
      :class="$vuetify.breakpoint.mobile ? 'pt-1' : 'pl-0'"
    >
      <v-hover v-slot="{ hover }">
        <v-sheet
          class="pb-1 rounded border"
          :elevation="hover && !sessionDetail ? 2 : 0"
          @click="!sessionDetail ? getClimbingSession() : null"
        >
          <v-progress-linear
            indeterminate
            :active="loadingSessionDetail"
            color="primary"
          />
          <!-- Climbing Session resume -->
          <div
            v-if="!sessionDetail"
            class="mt-2 mt-4 px-4"
          >
            <!-- Ascents by grade -->
            <small
              v-if="climbingSession.stats.by_grades.length > 1 && climbingSession.stats.by_colors.length > 1"
              class="text--disabled"
            >
              {{ $t('components.climbingSession.ascentsByColorsAndGrade') }}
            </small>
            <div class="mt-2">
              <v-badge
                v-for="(grade, byGradeIndex) in climbingSession.stats.by_grades"
                :key="`index-grade-${byGradeIndex}`"
                overlap
                dark
                color="black"
                :value="grade.count > 1"
                bordered
                :class="grade.count > 1 ? 'mr-3' : 'mr-1'"
              >
                <template #badge>
                  x{{ grade.count }}
                </template>
                <v-chip
                  :color="gradeValueToColor(grade.grade_value)"
                  dark
                  class="font-weight-bold"
                >
                  {{ grade.grade_text }}
                </v-chip>
              </v-badge>

              <v-badge
                v-for="(color, byColorIndex) in climbingSession.stats.by_colors"
                :key="`index-color-${byColorIndex}`"
                overlap
                color="black"
                :value="color.count > 1"
                bordered
                :class="color.count > 1 ? 'mr-3' : 'mr-1'"
              >
                <template #badge>
                  x{{ color.count }}
                </template>
                <v-icon :color="color.color">
                  {{ mdiCircle }}
                </v-icon>
              </v-badge>
              <span
                v-if="climbingSession.stats.project_by_grades.length > 0"
                class="mr-1"
              >
                |
              </span>
              <v-badge
                v-for="(grade, byProjectGradeIndex) in climbingSession.stats.project_by_grades"
                :key="`index-project-grade-${byProjectGradeIndex}`"
                overlap
                dark
                color="black"
                :value="grade.count > 1"
                bordered
                :class="grade.count > 1 ? 'mr-3' : 'mr-1'"
              >
                <template #badge>
                  x{{ grade.count }}
                </template>
                <v-chip
                  :color="gradeValueToColor(grade.grade_value)"
                  outlined
                  class="font-weight-bold"
                >
                  {{ grade.grade_text }}
                </v-chip>
              </v-badge>
            </div>

            <v-sheet
              v-if="climbingSession.description"
              class="px-1 pt-1 pb-0 mt-2 font-italic"
            >
              <markdown-text :text="climbingSession.description" />
            </v-sheet>

            <div
              v-if="crags.length + gyms.length > 0"
              class="mb-2"
            >
              <crag-small-card
                v-for="(crag, cragIndex) in crags"
                :key="`crag-index-${cragIndex}`"
                class="mt-2"
                :crag="crag"
                :linkable="false"
                small
                bordered
              />
              <gym-small-card
                v-for="(gym, gymIndex) in gyms"
                :key="`gym-index-${gymIndex}`"
                class="mt-2"
                :gym="gym"
                :linkable="false"
                small
                bordered
              />
            </div>
            <p class="text-right mb-0 text--disabled">
              <small>{{ $t('common.at') }} {{ humanizeDate(climbingSession.session_date) }}</small>
            </p>
          </div>

          <!-- Climbing session detail -->
          <div
            v-if="sessionDetail"
            class="py-3 px-4"
          >
            <h3 class="">
              {{ $t('components.climbingSession.title', { date: humanizeDate(sessionDetail.session_date) }) }}
              <v-btn
                icon
                class="float-right"
                @click.stop="sessionDetail = null"
              >
                <v-icon>
                  {{ mdiClose }}
                </v-icon>
              </v-btn>
            </h3>
            <p class="text--disabled mt-n1 mb-4">
              {{ dateFromToday(sessionDetail.session_date) }}
            </p>
            <climbing-session-detail
              :climbing-session="sessionDetail"
            />
          </div>
        </v-sheet>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script>
import { mdiCircle, mdiClose } from '@mdi/js'
import { DateHelpers } from '~/mixins/DateHelpers'
import { GradeMixin } from '~/mixins/GradeMixin'
import MarkdownText from '~/components/ui/MarkdownText.vue'
import CragSmallCard from '~/components/crags/CragSmallCard.vue'
import GymSmallCard from '~/components/gyms/GymSmallCard.vue'
import ClimbingSessionApi from '~/services/oblyk-api/ClimbingSessionApi'
import ClimbingSession from '~/models/ClimbingSession'
import ClimbingSessionDetail from '~/components/climbingSessions/ClimbingSessionDetail.vue'

export default {
  name: 'ClimbingSessionItem',
  components: { ClimbingSessionDetail, GymSmallCard, CragSmallCard, MarkdownText },
  mixins: [DateHelpers, GradeMixin],
  props: {
    climbingSession: {
      type: Object,
      required: true
    },
    gymReferences: {
      type: Array,
      required: true
    },
    cragReferences: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      loadingSessionDetail: false,
      sessionDetail: null,

      mdiCircle,
      mdiClose
    }
  },

  computed: {
    crags () {
      const crags = []
      for (const crag of this.cragReferences) {
        for (const cragId of this.climbingSession.crags) {
          if (crag.id === cragId) {
            crags.push(crag)
          }
        }
      }
      return crags
    },

    gyms () {
      const gyms = []
      for (const gymId of this.climbingSession.gyms) {
        for (const gym of this.gymReferences) {
          if (gym.id === gymId) {
            gyms.push(gym)
          }
        }
      }
      return gyms
    }
  },

  methods: {
    getClimbingSession () {
      if (this.sessionDetail) { return null }

      this.loadingSessionDetail = true
      new ClimbingSessionApi(this.$axios, this.$auth)
        .find(this.climbingSession.session_date)
        .then((resp) => {
          this.sessionDetail = new ClimbingSession({ attributes: resp.data })
        })
        .finally(() => {
          this.loadingSessionDetail = false
        })
    }
  }
}
</script>
