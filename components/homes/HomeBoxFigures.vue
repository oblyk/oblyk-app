<template>
  <v-row>
    <v-col>
      <h4 class="loved-by-king text-center mb-10">
        {{ $t('home.figures.title') }}
      </h4>

      <div v-if="loadingFigures">
        <v-row
          v-for="index in 3"
          :key="`skeleton-${index}`"
          no-gutters
          class="mb-10"
        >
          <v-col class="col-4">
            <v-skeleton-loader class="mx-auto" type="chip" width="100" />
            <v-skeleton-loader class="mx-auto mt-3" type="text" width="100" />
          </v-col>
          <v-col class="col-4">
            <v-skeleton-loader class="mx-auto" type="chip" width="100" />
            <v-skeleton-loader class="mx-auto mt-3" type="text" width="100" />
          </v-col>
          <v-col class="col-4">
            <v-skeleton-loader class="mx-auto" type="chip" width="100" />
            <v-skeleton-loader class="mx-auto mt-3" type="text" width="100" />
          </v-col>
        </v-row>
      </div>
      <div
        v-if="!loadingFigures"
        class="oblyk-figures"
      >
        <v-row>
          <v-col class="text-center col-4">
            <p class="figures">
              {{ figures.all.crags_count }}
              <small
                v-if="figures.latest.crags_count > 0"
                :title="$tc('home.figures.in24Hours.crags', figures.latest.crags_count, { count: figures.latest.crags_count } )"
              >
                +{{ figures.latest.crags_count }}
              </small>
            </p>
            <p class="loved-by-king">
              {{ $t('home.figures.crags') }}
            </p>
          </v-col>
          <v-col class="text-center col-4">
            <p class="figures">
              {{ figures.all.users_count }}
              <small
                v-if="figures.latest.users_count > 0"
                :title="$tc('home.figures.in24Hours.climbers', figures.latest.users_count, { count: figures.latest.users_count } )"
              >
                +{{ figures.latest.users_count }}
              </small>
            </p>
            <p class="loved-by-king">
              {{ $t('home.figures.climbers') }}
            </p>
          </v-col>
          <v-col class="text-center col-4">
            <p class="figures">
              {{ figures.all.gyms_count }}
              <small
                v-if="figures.latest.gyms_count > 0"
                :title="$tc('home.figures.in24Hours.gyms', figures.latest.gyms_count, { count: figures.latest.gyms_count } )"
              >
                +{{ figures.latest.gyms_count }}
              </small>
            </p>
            <p class="loved-by-king">
              {{ $t('home.figures.gyms') }}
            </p>
          </v-col>
          <v-col class="text-center col-4">
            <p class="figures">
              {{ figures.all.routes_count }}
              <small
                v-if="figures.latest.routes_count > 0"
                :title="$tc('home.figures.in24Hours.routes', figures.latest.routes_count, { count: figures.latest.routes_count } )"
              >
                +{{ figures.latest.routes_count }}
              </small>
            </p>
            <p class="loved-by-king">
              {{ $t('home.figures.routes') }}
            </p>
          </v-col>
          <v-col class="text-center col-4">
            <p class="figures">
              {{ figures.all.ascents_count }}
              <small
                v-if="figures.latest.ascents_count > 0"
                :title="$tc('home.figures.in24Hours.ascents', figures.latest.ascents_count, { count: figures.latest.ascents_count } )"
              >
                +{{ figures.latest.ascents_count }}
              </small>
            </p>
            <p class="loved-by-king">
              {{ $t('home.figures.ascents') }}
            </p>
          </v-col>
          <v-col class="text-center col-4">
            <p class="figures">
              {{ figures.all.photos_count }}
              <small
                v-if="figures.latest.photos_count > 0"
                :title="$tc('home.figures.in24Hours.photos', figures.latest.photos_count, { count: figures.latest.photos_count } )"
              >
                +{{ figures.latest.photos_count }}
              </small>
            </p>
            <p class="loved-by-king">
              {{ $t('home.figures.photos') }}
            </p>
          </v-col>
          <v-col class="text-center col-4">
            <p class="figures">
              {{ figures.all.guides_count }}
              <small
                v-if="figures.latest.guides_count > 0"
                :title="$tc('home.figures.in24Hours.guides', figures.latest.guides_count, { count: figures.latest.guides_count } )"
              >
                +{{ figures.latest.guides_count }}
              </small>
            </p>
            <p class="loved-by-king">
              {{ $t('home.figures.guides') }}
            </p>
          </v-col>
          <v-col class="text-center col-4">
            <p class="figures">
              {{ figures.all.comments_count }}
              <small
                v-if="figures.latest.comments_count > 0"
                :title="$tc('home.figures.in24Hours.comments', figures.latest.comments_count, { count: figures.latest.comments_count } )"
              >
                +{{ figures.latest.comments_count }}
              </small>
            </p>
            <p class="loved-by-king">
              {{ $t('home.figures.comments') }}
            </p>
          </v-col>
          <v-col class="text-center col-4">
            <p class="figures">
              {{ figures.all.videos_count }}
              <small
                v-if="figures.latest.videos_count > 0"
                :title="$tc('home.figures.in24Hours.videos', figures.latest.videos_count, { count: figures.latest.videos_count } )"
              >
                +{{ figures.latest.videos_count }}
              </small>
            </p>
            <p class="loved-by-king">
              {{ $t('home.figures.videos') }}
            </p>
          </v-col>
        </v-row>
        <p
          v-if="addInLast24Hours > 0"
          class="text-center figures"
        >
          <small>
            {{ $tc('home.figures.addedSince24Hours', addInLast24Hours, { count: addInLast24Hours }) }}
          </small>
        </p>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import CommonApi from '~/services/oblyk-api/CommonApi'

export default {
  name: 'HomeBoxFigures',

  data () {
    return {
      loadingFigures: true,
      figures: {}
    }
  },

  computed: {
    addInLast24Hours () {
      const last = this.figures.latest
      if (last) {
        return last.comments_count + last.crags_count + last.users_count + last.gyms_count + last.routes_count + last.ascents_count + last.photos_count + last.guides_count + last.videos_count
      } else {
        return 0
      }
    }
  },

  mounted () {
    this.getFigures()
  },

  methods: {
    getFigures () {
      new CommonApi(this.$axios, this.$auth)
        .figures()
        .then((resp) => {
          this.figures = resp.data
        })
        .finally(() => {
          this.loadingFigures = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.oblyk-figures {
  .figures {
    font-size: 1.2em;
    margin-bottom: 0;
    small {
      display: inline-block;
      margin-top: -5px;
      color: #388e3c;
      vertical-align: top;
    }
  }
  .loved-by-king {
    height: 36px;
    font-size: 1.5em;
    margin-top: 0;
  }
}
</style>
