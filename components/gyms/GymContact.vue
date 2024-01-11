<template>
  <v-card class="full-height">
    <v-card-title>
      <v-icon left>
        {{ mdiMapMarkerCircle }}
      </v-icon>
      {{ $t('components.gym.contactAndLocalization') }}
    </v-card-title>
    <v-card-text>
      <v-list dense>
        <!-- Address -->
        <v-list-item :to="`/maps/gyms?lat=${gym.latitude}&lng=${gym.longitude}`">
          <v-list-item-icon>
            <v-icon>{{ mdiMap }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ gym.country }}, {{ gym.city }}
              <v-btn
                small
                class="ml-2"
                elevation="0"
              >
                {{ $t('actions.seeOnTheMap') }}
              </v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Web site -->
        <v-list-item>
          <v-list-item-icon>
            <v-icon>{{ mdiWeb }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              v-if="gym.web_site"
            >
              <a :href="gym.web_site">
                {{ gym.web_site }}
              </a>
            </v-list-item-title>
            <v-list-item-title v-else>
              {{ $t('common.noInformation') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Phone number -->
        <v-list-item>
          <v-list-item-icon>
            <v-icon>{{ mdiPhone }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content @click="showPhoneNumber = true">
            <v-list-item-title v-if="gym.phone_number">
              <span v-if="showPhoneNumber">
                {{ gym.phone_number }}
              </span>
              <span v-else>
                {{ $t('components.gym.seePhoneNumber') }}
              </span>
            </v-list-item-title>
            <v-list-item-title v-else>
              {{ $t('common.noInformation') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Email -->
        <v-list-item>
          <v-list-item-icon>
            <v-icon>{{ mdiEmail }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content @click="showEmail = true">
            <v-list-item-title v-if="gym.email">
              <span v-if="showEmail">
                {{ gym.email }}
              </span>
              <span v-else>
                {{ $t('components.gym.seeEmail') }}
              </span>
            </v-list-item-title>
            <v-list-item-title v-else>
              {{ $t('common.noInformation') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <client-only>
        <div class="text-right">
          <v-menu
            v-if="userCanTouch()"
            offset-y
          >
            <template #activator="{ on, attrs }">
              <v-btn
                text
                outlined
                v-bind="attrs"
                v-on="on"
              >
                <v-icon left>
                  {{ mdiDotsVertical }}
                </v-icon>
                {{ $t('actions.edit') }}
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
        </div>
      </client-only>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  mdiMap,
  mdiWeb,
  mdiPhone,
  mdiEmail,
  mdiMapMarkerCircle,
  mdiDotsVertical,
  mdiPanorama,
  mdiAlphaLCircle,
  mdiPencil
} from '@mdi/js'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'

export default {
  name: 'GymContact',
  mixins: [GymRolesHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      showPhoneNumber: false,
      showEmail: false,

      mdiMap,
      mdiWeb,
      mdiPhone,
      mdiEmail,
      mdiMapMarkerCircle,
      mdiDotsVertical,
      mdiPanorama,
      mdiAlphaLCircle,
      mdiPencil
    }
  }
}
</script>
