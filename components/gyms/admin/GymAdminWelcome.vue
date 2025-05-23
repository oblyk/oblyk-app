<template>
  <v-img
    :src="imageVariant(gym.attachments.banner, { fit: 'scale-down', width: 1920, height: 1920 })"
    :lazy-src="imageVariant(gym.attachments.banner, { fit: 'scale-down', width: 720, height: 720 })"
    class="white--text align-end rounded"
    height="320px"
  >
    <div class="d-block d-md-inline-block pa-2 pa-md-3 pa-lg-4">
      <v-card>
        <v-card-title class="py-1">
          <v-list class="py-0">
            <v-list-item class="pl-0">
              <v-list-item-avatar
                tile
                size="48"
              >
                <v-avatar tile>
                  <v-img
                    :src="imageVariant(gym.attachments.logo, { fit: 'crop', width: 100, height: 100 })"
                    :alt="`logo ${gym.name}`"
                    class="rounded-sm"
                  />
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{ gym.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ $t('components.gymAdmin.adminTitle') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-title>
        <v-card-text v-if="gymAuthCan(gym, 'manage_gym')">
          <p
            v-if="missingInformation.length > 0"
            class="mt-6"
          >
            <v-icon
              left
              color="amber"
            >
              {{ mdiAlertCircle }}
            </v-icon>
            {{ $t('components.gymAdmin.missingInformation') }} {{ missingInformation.join(', ') }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :to="gym.path"
            text
            outlined
            exact-path
            color="primary"
          >
            <v-icon left>
              {{ mdiEarth }}
            </v-icon>
            {{ $t('components.gymAdmin.publicPage') }}
          </v-btn>
          <v-menu
            v-if="gymAuthCan(gym, 'manage_gym')"
            offset-y
          >
            <template #activator="{ on, attrs }">
              <v-btn
                text
                outlined
                class="ml-2 pr-3"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon left>
                  {{ mdiDotsVertical }}
                </v-icon>
                {{ $t('actions.edit') }}
                <v-icon
                  v-if="missingSomething"
                  right
                  color="amber"
                >
                  {{ mdiAlertCircle }}
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item :to="`${gym.path}/edit`">
                <v-list-item-icon>
                  <v-icon>
                    {{ mdiPencil }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $t('actions.editInformation') }}
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action
                  v-if="missingInformation.length > 0"
                >
                  <v-icon
                    small
                    left
                    color="amber"
                  >
                    {{ mdiAlertCircle }}
                  </v-icon>
                </v-list-item-action>
              </v-list-item>
              <v-list-item :to="`${gym.path}/logo`">
                <v-list-item-icon>
                  <v-icon>
                    {{ mdiAlphaLCircleOutline }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    v-text="missingLogo ? $t('components.gymAdmin.addYourLogo') : $t('components.gymAdmin.updateYourLogo')"
                  />
                </v-list-item-content>
                <v-list-item-action v-if="missingLogo">
                  <v-icon
                    small
                    left
                    color="amber"
                  >
                    {{ mdiAlertCircle }}
                  </v-icon>
                </v-list-item-action>
              </v-list-item>
              <v-list-item :to="`${gym.path}/banner`">
                <v-list-item-icon>
                  <v-icon>
                    {{ mdiImageArea }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    v-text="missingBanner ? $t('components.gymAdmin.addYourBanner') : $t('components.gymAdmin.updateYourBanner')"
                  />
                </v-list-item-content>
                <v-list-item-action v-if="missingBanner">
                  <v-icon
                    small
                    left
                    color="amber"
                  >
                    {{ mdiAlertCircle }}
                  </v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-actions>
      </v-card>
    </div>
  </v-img>
</template>

<script>
import {
  mdiEarth,
  mdiPencil,
  mdiDotsVertical,
  mdiAlertCircle,
  mdiAlphaLCircleOutline,
  mdiImageArea
} from '@mdi/js'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  name: 'GymAdminWelcome',
  mixins: [GymRolesHelpers, ImageVariantHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiEarth,
      mdiPencil,
      mdiDotsVertical,
      mdiAlertCircle,
      mdiAlphaLCircleOutline,
      mdiImageArea
    }
  },

  computed: {
    missingLogo () {
      return !this.gym.attachments.logo.attached
    },

    missingBanner () {
      return !this.gym.attachments.banner.attached
    },

    missingInformation () {
      const informationMissing = []
      if (!this.gym.description) { informationMissing.push(this.$t('models.gym.description')) }
      if (!this.gym.address) { informationMissing.push(this.$t('models.gym.address')) }
      if (!this.gym.postal_code) { informationMissing.push(this.$t('models.gym.postal_code')) }
      if (!this.gym.city) { informationMissing.push(this.$t('models.gym.city')) }
      if (!this.gym.big_city) { informationMissing.push(this.$t('models.gym.big_city')) }
      if (!this.gym.web_site) { informationMissing.push(this.$t('models.gym.web_site')) }
      return informationMissing
    },

    missingSomething () {
      return (this.missingLogo || this.missingBanner || this.missingInformation.length > 0)
    }
  }
}
</script>
