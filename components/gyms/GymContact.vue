<template>
  <v-card class="full-height">
    <v-card-title>
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
              <v-btn small class="ml-2">
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

        <!-- Contribution -->
        <v-list-item>
          <v-list-item-icon>
            <v-icon>{{ mdiHistory }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <contributions-label
                version-type="gym"
                :versions-count="gym.versions_count"
                :version-id="gym.id"
              />
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiMap, mdiWeb, mdiPhone, mdiEmail, mdiHistory } from '@mdi/js'
import ContributionsLabel from '@/components/globals/ContributionsLable'

export default {
  name: 'GymContact',
  components: { ContributionsLabel },
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiMap,
      mdiWeb,
      mdiPhone,
      mdiEmail,
      mdiHistory,
      showPhoneNumber: false,
      showEmail: false
    }
  }
}
</script>
