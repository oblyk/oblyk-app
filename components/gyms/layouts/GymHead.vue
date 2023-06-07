<template>
  <div class="gym-header">
    <v-img
      dark
      height="400px"
      :lazy-src="gym.thumbnailBannerUrl"
      :src="gym.croppedBannerUrl"
      :srcset="`${gym.croppedBannerUrl} 500w, ${gym.bannerUrl} 600w`"
      class="gym-header-banner"
    >
      <div class="gym-header-title">
        <div class="d-flex flex-row gym-header-title-and-logo">
          <v-avatar
            size="80"
            class="mr-3 align-self-center"
          >
            <v-img
              :src="gym.logoUrl"
              :alt="`logo ${gym.name}`"
            />
          </v-avatar>
          <div class="align-self-center">
            <h1 class="font-weight-medium">
              {{ gym.name }}
              <client-only>
                <subscribe-btn
                  subscribe-type="Gym"
                  :subscribe-id="gym.id"
                  :incrementable="true"
                  :type-text="true"
                  :large="false"
                  :outlined="true"
                  class="vertical-align-text-bottom ml-1"
                />
              </client-only>
            </h1>
            <div
              v-if="!$vuetify.breakpoint.mobile"
              class="mb-2"
            >
              {{ gym.country }}, {{ gym.city }}
            </div>
          </div>
        </div>
        <div
          v-if="$vuetify.breakpoint.mobile"
          class="mb-2"
        >
          {{ gym.country }}, {{ gym.city }}
        </div>
        <div>
          <client-only>
            <share-btn
              :title="gym.name"
              :url="gym.path"
              :icon="false"
            />
            <v-menu
              v-if="userCanTouch()"
              offset-y
            >
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  text
                  outlined
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>
                    {{ mdiDotsVertical }}
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item :to="`${gym.path}/edit`">
                  <v-list-item-icon>
                    <v-icon>{{ mdiPencil }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    {{ $t('actions.edit') }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item :to="`${gym.path}/logo`">
                  <v-list-item-icon>
                    <v-icon>{{ mdiAlphaLCircle }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    {{ $t('actions.changeLogo') }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item :to="`${gym.path}/banner`">
                  <v-list-item-icon>
                    <v-icon>{{ mdiPanorama }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    {{ $t('actions.changeBanner') }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </client-only>
        </div>
      </div>
    </v-img>
  </div>
</template>

<script>
import { mdiPencil, mdiAlphaLCircle, mdiPanorama, mdiDotsVertical } from '@mdi/js'
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
      mdiPanorama,
      mdiDotsVertical
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
    display: inline-block;
    max-width: 100%;
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
    .gym-header-title-and-logo {
      min-height: 85px;
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
