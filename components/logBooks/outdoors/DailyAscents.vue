<template>
  <div>
    <div v-if="loadingDailyAscents">
      <v-skeleton-loader
        width="250"
        height="160"
        type="image"
      />
    </div>
    <div
      v-else
      class="daily-ascents"
    >
      <div
        ref="ascentsList"
        class="daily-ascents-list"
      >
        <div
          v-for="(day, dayIndex) in days"
          :key="`day-${dayIndex}`"
          class="daily-ascents-day"
        >
          <div
            v-for="(part, partIndex) in day"
            :key="`part-${partIndex}`"
            class="daily-ascents-part"
          >
            <daily-ascents-part :part="part" />
          </div>
        </div>

        <!-- Add crosses -->
        <div class="daily-ascents-day">
          <div class="daily-ascents-part">
            <v-card
              elevation="0"
              height="160"
              class="text-center pa-4"
              rounded
              to="/ascents/new"
            >
              <p class="font-weight-bold mb-7">
                {{ $t('components.dailyCrosses.addCrosses') }}
              </p>
              <v-icon x-large>
                {{ mdiPlusBoxOutline }}
              </v-icon>
            </v-card>
          </div>
        </div>

        <!-- My logbook -->
        <div class="daily-ascents-day">
          <div class="daily-ascents-part">
            <v-card
              elevation="0"
              height="160"
              class="text-center pa-4"
              rounded
              to="/home/ascents/outdoor"
            >
              <p class="font-weight-bold mb-7">
                {{ $t('components.dailyCrosses.myLogbook') }}
              </p>
              <v-icon x-large>
                {{ mdiBookOutline }}
              </v-icon>
            </v-card>
          </div>
        </div>

        <!-- My Map -->
        <div class="daily-ascents-day">
          <div class="daily-ascents-part">
            <v-card
              elevation="0"
              height="160"
              class="text-center pa-4"
              rounded
              to="/maps/my-map"
            >
              <p class="font-weight-bold mb-7">
                {{ $t('components.dailyCrosses.myMap') }}
              </p>
              <v-icon x-large>
                {{ mdiMap }}
              </v-icon>
            </v-card>
          </div>
        </div>
      </div>
      <v-btn
        class="daily-ascents-scroll-to-right black-btn-icon --with-border"
        icon
        @click="scrollAscents"
      >
        <v-icon>
          {{ mdiArrowRight }}
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mdiArrowRight, mdiPlusBoxOutline, mdiBookOutline, mdiMap } from '@mdi/js'
import LogBookOutdoorApi from '~/services/oblyk-api/LogBookOutdoorApi'
import DailyAscentsPart from '~/components/logBooks/outdoors/DailyAscentsPart'

export default {
  name: 'DailyAscents',
  components: { DailyAscentsPart },

  data () {
    return {
      loadingDailyAscents: true,
      days: [],

      mdiArrowRight,
      mdiPlusBoxOutline,
      mdiBookOutline,
      mdiMap
    }
  },

  mounted () {
    this.getDailyAscents()
  },

  methods: {
    scrollAscents () {
      const scrollOffset = this.$refs.ascentsList.offsetWidth > 520 ? 520 : 260
      this.$refs.ascentsList.scrollTo({
        left: this.$refs.ascentsList.scrollLeft + scrollOffset,
        behavior: 'smooth'
      })
    },

    getDailyAscents () {
      this.loadingDailyAscents = true
      new LogBookOutdoorApi(this.$axios, this.$auth)
        .dailyAscents()
        .then((resp) => {
          this.days = resp.data
        })
        .finally(() => {
          this.loadingDailyAscents = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.daily-ascents {
  position: relative;
  .daily-ascents-list {
    white-space: nowrap;
    overflow-x: auto;
    .daily-ascents-day {
      display: inline-block;
      .daily-ascents-part {
        vertical-align: top;
        display: inline-block;
        width: 250px;
        margin-right: 10px;
      }
    }
  }
  .daily-ascents-scroll-to-right {
    position: absolute;
    right: -15px;
    top: 64px
  }
}
@media screen and (max-width: 960px) {
  .daily-ascents {
    .daily-ascents-scroll-to-right {
      right: 0;
    }
  }
}
</style>
