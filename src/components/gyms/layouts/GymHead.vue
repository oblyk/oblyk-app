<template>
  <div>
    <v-img
      dark
      class="gym-header-banner"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      :src="gym.bannerUrl()"
    >
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-if="isLoggedIn"
            :to="gym.url('banner')"
            class="change-gym-banner"
            icon
            v-bind="attrs"
            v-on="on"
            large
            outlined
          >
            <v-icon>
              mdi-camera
            </v-icon>
          </v-btn>
        </template>
        <span>
          {{ $t('actions.changeBanner') }}
        </span>
      </v-tooltip>
      <div class="gym-header-title">
        <v-avatar
          size="80"
          class="float-left mr-3"
        >
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-img
                class="hover-gym-logo"
                v-bind="attrs"
                v-on="on"
                @click="isLoggedIn ? $router.push(gym.url('logo')) : null"
                :src="gym.logoUrl()"
                :alt="`logo ${gym.name}`"
              />
            </template>
            <span>
              {{ $t('actions.changeLogo') }}
            </span>
          </v-tooltip>
        </v-avatar>
        <h1 class="font-weight-medium">
          {{ gym.name }}
        </h1>
        <span>
          {{ gym.country }}, {{ gym.city }}

          <v-btn
            :to="gym.url('edit')"
            small
            outlined
            class="ml-1"
            v-if="isLoggedIn"
          >
            Modifier
          </v-btn>
        </span>
      </div>
    </v-img>
  </div>
</template>
<script>
import { Sessionable } from '@/concerns/Sessionable'

export default {
  name: 'GymHead',
  mixins: [Sessionable],
  props: {
    gym: Object
  }
}
</script>
<style lang="scss" scoped>
.gym-header-banner {
  height: 500px;
  max-height: 100%;
  .hover-gym-logo {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
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
