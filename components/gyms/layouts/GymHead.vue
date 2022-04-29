<template>
  <div>
    <v-img
      dark
      class="gym-header-banner"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      :lazy-src="gym.thumbnailBannerUrl"
      :src="gym.croppedBannerUrl"
      :srcset="`${gym.croppedBannerUrl} 500w, ${gym.bannerUrl} 600w`"
    >
      <div class="gym-header-title">
        <v-avatar
          size="80"
          class="float-left mr-3"
        >
          <v-img
            :src="gym.logoUrl"
            :alt="`logo ${gym.name}`"
          />
        </v-avatar>
        <h1 class="font-weight-medium">
          {{ gym.name }}
          <client-only>
            <subscribe-btn subscribe-type="Gym" :subscribe-id="gym.id" :incrementable="true" />
          </client-only>
        </h1>
        <span>
          {{ gym.country }}, {{ gym.city }}

          <client-only>
            <v-btn
              v-if="userCanTouch()"
              :to="`/a${gym.path}/edit`"
              small
              icon
              :title="$t('actions.edit')"
              class="ml-1"
            >
              <v-icon small>
                {{ mdiPencil }}
              </v-icon>
            </v-btn>

            <v-btn
              v-if="userCanTouch()"
              :to="`/a${gym.path}/logo`"
              small
              :title="$t('actions.changeLogo')"
              icon
              class="ml-2"
            >
              <v-icon
                small
              >
                {{ mdiAlphaLCircle }}
              </v-icon>
            </v-btn>

            <v-btn
              v-if="userCanTouch()"
              :to="`/a${gym.path}/banner`"
              small
              :title="$t('actions.changeBanner')"
              icon
              class="ml-2"
            >
              <v-icon
                small
              >
                {{ mdiPanorama }}
              </v-icon>
            </v-btn>
          </client-only>
        </span>
      </div>
    </v-img>
  </div>
</template>

<script>
import { mdiPencil, mdiAlphaLCircle, mdiPanorama } from '@mdi/js'
import { SessionConcern } from '@/concerns/SessionConcern'
import SubscribeBtn from '@/components/forms/SubscribeBtn'

export default {
  name: 'GymHead',
  components: { SubscribeBtn },
  mixins: [SessionConcern],
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiPencil,
      mdiAlphaLCircle,
      mdiPanorama
    }
  },

  methods: {
    userCanTouch () {
      return this.isLoggedIn && (!this.gym.administered || this.currentUserIsGymAdmin())
    }
  }
}
</script>
<style lang="scss" scoped>
.gym-header-banner {
  height: 500px;
  max-height: 100%;

  .change-gym-banner {
    float: right;
    margin-right: 5px;
    margin-top: 5px;
  }
}

.gym-header-title {
  position: absolute;
  width: 100%;
  padding: 0.5em 0.5em 1em 1em;
  bottom: 0;

  h1 {
    margin-bottom: -5px;

    .v-avatar {
      vertical-align: middle;
    }
  }
}
</style>
