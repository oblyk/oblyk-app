<template>
  <div :class="columnMode ? null : 'd-md-flex'">
    <div class="text-no-wrap">
      <p
        class="mb-1 font-italic pr-3"
        :class="$vuetify.breakpoint.mobile || columnMode ? 'pl-1' : 'border-bottom'"
      >
        {{ dateFromToday(climbingSession.session_date) }}
      </p>
    </div>
    <div
      class="flex-grow-1"
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

          <!-- CLIMBING SESSION RESUME -->
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
            <p
              v-if="climbingSession.for_current_user"
              class="text-right mb-0 text--disabled"
            >
              <small>{{ $t('common.at') }} {{ humanizeDate(climbingSession.session_date) }}</small>
            </p>
          </div>

          <!-- CLIMBING SESSION DETAIL -->
          <div
            v-if="sessionDetail"
            class="py-3 px-4"
          >
            <h3 class="">
              <span v-if="climbingSession.for_current_user">
                {{ $t('components.climbingSession.title', { date: humanizeDate(sessionDetail.session_date) }) }}
              </span>
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
    </div>
  </div>
</template>

<script>
import { mdiCircle, mdiClose } from '@mdi/js'
import { DateHelpers } from '~/mixins/DateHelpers'
import { GradeMixin } from '~/mixins/GradeMixin'
import ClimbingSession from '~/models/ClimbingSession'
import OblykApi from '~/services/oblyk-api/OblykApi'
import MarkdownText from '~/components/ui/MarkdownText'
import CragSmallCard from '~/components/crags/CragSmallCard'
import GymSmallCard from '~/components/gyms/GymSmallCard'
import ClimbingSessionDetail from '~/components/climbingSessions/ClimbingSessionDetail'

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
    },
    columnMode: {
      type: Boolean,
      default: false
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
      new OblykApi(this.$axios, this.$auth)
        .get(
          `/current_users/climbing_sessions/${this.climbingSession.session_date}`,
          { user_id: this.climbingSession.user_id }
        )
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
