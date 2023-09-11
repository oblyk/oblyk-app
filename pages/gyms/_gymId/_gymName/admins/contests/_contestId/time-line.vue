<template>
  <div class="mt-2">
    <spinner v-if="loadingTimeLine" />
    <v-sheet
      v-else
      class="rounded pa-4"
    >
      <div
        v-for="(time, timeIndex) in timeLine"
        :key="`time-index-${timeIndex}`"
        class="mb-4"
      >
        <p class="mb-0 font-weight-bold">
          Le {{ humanizeDate(time.start_date) }} à {{ humanizeDate(time.start_time, 'TIME_SIMPLE') }}
        </p>
        <div
          v-for="(event, eventIndex) in time.events"
          :key="`event-index-${eventIndex}`"
          class="pl-2"
        >
          <u>{{ event.step.name }}</u>
          {{ $t(`models.climbs.${event.stage.climbing_type}`).toLowerCase() }} :
          {{ event.categories.map((category) => category.name).join(', ') }}
          <v-chip small>
            <gender-icon :gender="event.genre_type" />
            {{ $t(`models.genres.${event.genre_type}`) }}
          </v-chip>
          <v-chip
            v-if="event.wave"
            small
            class="font-weight-bold"
          >
            <v-icon
              small
              left
            >
              {{ mdiWaves }}
            </v-icon>
            {{ event.wave.name }}
          </v-chip>
          <cite class="ml-2">
            fin <span v-if="event.end_date !== time.start_date">le {{ humanizeDate(event.end_date) }}</span> à {{ humanizeDate(event.end_time, 'TIME_SIMPLE') }}
          </cite>
        </div>
      </div>
    </v-sheet>
  </div>
</template>
<script>
import { mdiWaves } from '@mdi/js'
import { DateHelpers } from '~/mixins/DateHelpers'
import Spinner from '~/components/layouts/Spiner'
import ContestApi from '~/services/oblyk-api/ContestApi'
import GenderIcon from '~/components/ui/GenderIcon'

export default {
  components: { GenderIcon, Spinner },
  meta: { orphanRoute: true },
  mixins: [DateHelpers],

  props: {
    contest: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingTimeLine: true,
      timeLine: null,

      mdiWaves
    }
  },

  mounted () {
    this.getTimeLine()
  },

  methods: {
    getTimeLine () {
      this.loadingTimeLine = true
      new ContestApi(this.$axios, this.$auth)
        .timeLine(
          this.$route.params.gymId,
          this.$route.params.contestId
        )
        .then((resp) => {
          this.timeLine = resp.data
        })
        .finally(() => {
          this.loadingTimeLine = false
        })
    }
  }
}
</script>
