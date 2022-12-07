<template>
  <v-row>
    <v-col
      cols="12"
      md="3"
      class="pr-0 pb-0"
    >
      <p
        :class="$vuetify.breakpoint.mobile ? 'mb-0 font-italic pl-1' : 'border-bottom mb-0 font-italic'"
      >
        {{ dateFromNow(climbingSession.session_date) }}
      </p>
    </v-col>
    <v-col
      cols="12"
      md="9"
      :class="$vuetify.breakpoint.mobile ? 'pt-1' : 'pl-0'"
    >
      <v-sheet
        class="pt-2 pb-1 px-4 rounded-sm border"
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
        </div>

        <v-sheet
          v-if="climbingSession.description"
          class="px-3 pt-2 pb-1 mt-2 rounded-sm back-app-color"
        >
          <markdown-text :text="climbingSession.description" />
        </v-sheet>

        <v-sheet
          v-if="crags.length + gyms.length > 0"
          class="mt-2 back-app-color px-2 pb-0 pt-2 rounded-sm"
        >
          <div
            v-for="(crag, cragIndex) in crags"
            :key="`crag-index-${cragIndex}`"
            class="d-inline-block text-center"
            style="width: 60px"
          >
            <v-avatar>
              <v-img :src="crag.thumbnailCoverUrl" :alt="crag.name" />
            </v-avatar>
            <p class="mb-0 text-truncate">
              <small>
                {{ crag.name }}
              </small>
            </p>
          </div>
          <div
            v-for="(gym, gymIndex) in gyms"
            :key="`gym-index-${gymIndex}`"
            class="d-inline-block text-center"
            style="width: 60px"
          >
            <v-avatar>
              <v-img :src="gym.logoUrl" :alt="gym.name" />
            </v-avatar>
            <p class="mb-0 text-truncate">
              <small>
                {{ gym.name }}
              </small>
            </p>
          </div>
        </v-sheet>
        <p class="text-right mb-0 text--disabled">
          <small>{{ $t('common.at') }} {{ humanizeDate(climbingSession.session_date) }}</small>
        </p>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { mdiCircle } from '@mdi/js'
import { DateHelpers } from '~/mixins/DateHelpers'
import { GradeMixin } from '~/mixins/GradeMixin'
import MarkdownText from '~/components/ui/MarkdownText.vue'

export default {
  name: 'ClimbingSessionItem',
  components: { MarkdownText },
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
      mdiCircle
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
  }
}
</script>
