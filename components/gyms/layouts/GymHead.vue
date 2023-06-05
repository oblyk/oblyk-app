<template>
  <div class="gym-header">
    <v-img
      dark
      class="gym-header-banner"
      height="400px"
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
            <share-btn
              :title="gym.name"
              :url="gym.path"
            />
          </client-only>
        </h1>
        <span>
          {{ gym.country }}, {{ gym.city }}

          <client-only>
            <v-btn
              v-if="userCanTouch()"
              :to="`${gym.path}/edit`"
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
              :to="`${gym.path}/logo`"
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
              :to="`${gym.path}/banner`"
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
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'
import ShareBtn from '~/components/ui/ShareBtn.vue'

export default {
  name: 'GymHead',
  components: { ShareBtn, SubscribeBtn },
  mixins: [SessionConcern, GymRolesHelpers],
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
      return this.isLoggedIn && (!this.gym.administered || (this.currentUserIsGymAdmin() && this.gymAuthCan(this.gym, 'manage_gym')))
    }
  }
}
</script>
<style lang="scss" scoped>
.gym-header {
  .gym-header-banner {
    border-radius: 15px 15px 0 0;
    .change-gym-banner {
      float: right;
      margin-right: 5px;
      margin-top: 5px;
    }
  }
  .gym-header-title {
    position: absolute;
    padding: 1em;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 15px;
    bottom: 20px;
    left: 20px;
    h1 {
      font-size: 1.7em;
      margin: 0;
    }
  }
}
@media screen and (max-width: 767px) {
  .gym-header {
    .gym-header-title {
      width: 100%;
      border-radius: 0;
      bottom: 0;
      left: 0;
    }
  }
}
</style>
