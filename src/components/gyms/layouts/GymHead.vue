<template>
  <div>
    <v-img
      dark
      class="gym-header-banner"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      :src="gym.bannerUrl()"
    >
      <div class="gym-header-title">
        <v-avatar
          size="80"
          class="float-left mr-3"
        >
          <v-img
            :src="gym.logoUrl()"
            :alt="`logo ${gym.name}`"
          />
        </v-avatar>
        <h1 class="font-weight-medium">
          {{ gym.name }}
          <subscribe-btn subscribeType="Gym" :subscribeId="gym.id" :incrementable="true" />
        </h1>
        <span>
          {{ gym.country }}, {{ gym.city }}

          <v-btn
            :to="gym.url('edit')"
            small
            icon
            :title="$t('actions.edit')"
            class="ml-1"
            v-if="userCanTouch()"
          >
            <v-icon small>
              mdi-pencil
            </v-icon>
          </v-btn>

          <v-btn
            :to="gym.url('logo')"
            small
            :title="$t('actions.changeLogo')"
            icon
            class="ml-2"
            v-if="userCanTouch()"
          >
            <v-icon
              small
            >
              mdi-alpha-l-circle
            </v-icon>
          </v-btn>

          <v-btn
            :to="gym.url('banner')"
            small
            :title="$t('actions.changeBanner')"
            icon
            class="ml-2"
            v-if="userCanTouch()"
          >
            <v-icon
              small
            >
              mdi-panorama
            </v-icon>
          </v-btn>
        </span>
      </div>
    </v-img>
  </div>
</template>
<script>
import { SessionConcern } from '@/concerns/SessionConcern'
import SubscribeBtn from '@/components/forms/SubscribeBtn'

export default {
  name: 'GymHead',
  components: { SubscribeBtn },
  mixins: [SessionConcern],
  props: {
    gym: Object
  },

  methods: {
    userCanTouch: function () {
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
