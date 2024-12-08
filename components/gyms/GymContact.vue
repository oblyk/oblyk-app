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
            <v-list-item-title
              v-else
              class="text--disabled font-italic"
            >
              {{ $t('common.noInformation') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Address -->
        <v-list-item>
          <v-list-item-icon>
            <v-icon>{{ mdiMap }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-wrap">
              <div class="pb-2">
                {{ gym.city }} <cite>({{ gym.country }})</cite><br>
                <small>
                  {{ gym.postal_code }}, {{ gym.address }}
                </small>
              </div>
              <v-btn
                small
                dark
                outlined
                class="black-btn-icon"
                elevation="0"
                :to="`/maps/gyms?lat=${gym.latitude}&lng=${gym.longitude}`"
              >
                {{ $t('actions.seeOnTheMap') }}
              </v-btn>
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
              <v-btn
                v-else
                small
                dark
                outlined
                class="black-btn-icon"
                elevation="0"
              >
                {{ $t('components.gym.seePhoneNumber') }}
              </v-btn>
            </v-list-item-title>
            <v-list-item-title
              v-else
              class="text--disabled font-italic"
            >
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
              <v-btn
                v-else
                small
                dark
                outlined
                class="black-btn-icon"
                elevation="0"
              >
                {{ $t('components.gym.seeEmail') }}
              </v-btn>
            </v-list-item-title>
            <v-list-item-title
              v-else
              class="text--disabled font-italic"
            >
              {{ $t('common.noInformation') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
    <!-- Chain -->
    <div
      v-if="gymChains.length > 0"
    >
      <v-card-title class="pt-0 pb-2">
        <v-icon left>
          {{ mdiLinkBoxVariantOutline }}
        </v-icon>
        {{ $t('components.gymChain.title') }}
      </v-card-title>
      <div class="px-4">
        <v-chip
          v-for="(gymChain, gymChainIndex) in gymChains"
          :key="`gym-chain-index-${gymChainIndex}`"
          outlined
          link
          pill
          class="font-weight-bold"
          :to="gymChain.path"
        >
          <v-avatar
            v-if="gymChain.logo"
            left
          >
            <v-img :src="gymChain.thumbnailLogoUrl" />
          </v-avatar>
          {{ gymChain.name }}
        </v-chip>
      </div>
    </div>
    <client-only>
      <div class="text-right px-4 pb-4">
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
  mdiPencil,
  mdiLinkBoxVariantOutline
} from '@mdi/js'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'
import GymChain from '~/models/GymChain'

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
      mdiPencil,
      mdiLinkBoxVariantOutline
    }
  },

  computed: {
    gymChains () {
      const chains = []
      for (const chain of this.gym.gym_chains) {
        if (chain.public_chain) {
          chains.push(new GymChain({ attributes: chain }))
        }
      }
      return chains
    }
  }
}
</script>
