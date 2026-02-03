<template>
  <div v-if="offerToUploadBanner || offerToUploadAvatar">
    <p class="mb-1">
      <small class="font-weight-medium">
        <v-icon color="primary" left small>
          {{ mdiOrderBoolAscendingVariant }}
        </v-icon>
        TODO
      </small>
    </p>

    <v-card
      v-if="offerToUploadBanner"
      class="pa-1 d-flex mb-1"
    >
      <v-btn text outlined to="/home/settings/banner?back_to=/home">
        <v-icon left>
          {{ mdiPanoramaVariant }}
        </v-icon>
        {{ $t('actions.changeMyBanner') }}
      </v-btn>
      <v-btn
        class="ml-auto"
        icon
        @click="no('Banner')"
      >
        <v-icon>
          {{ mdiClose }}
        </v-icon>
      </v-btn>
    </v-card>

    <v-card
      v-if="offerToUploadAvatar"
      class="pa-1 d-flex"
    >
      <v-btn text outlined to="/home/settings/avatar?back_to=/home">
        <v-icon left>
          {{ mdiAccountCircle }}
        </v-icon>
        {{ $t('actions.changeMyAvatar') }}
      </v-btn>
      <v-btn
        class="ml-auto"
        icon
        @click="no('Avatar')"
      >
        <v-icon>
          {{ mdiClose }}
        </v-icon>
      </v-btn>
    </v-card>
  </div>
</template>
<script>
import { mdiOrderBoolAscendingVariant, mdiClose, mdiPanoramaVariant, mdiAccountCircle } from '@mdi/js'

export default {
  name: 'UserTodo',

  data () {
    return {
      offerToUploadBanner: true,
      offerToUploadAvatar: true,

      mdiClose,
      mdiPanoramaVariant,
      mdiOrderBoolAscendingVariant,
      mdiAccountCircle
    }
  },

  mounted () {
    this.setOffer()
  },

  methods: {
    no (type) {
      localStorage.setItem(`dontAskMeAgainAbout${type}`, 'true')
      this.setOffer()
    },

    setOffer () {
      this.offerToUploadBanner = !(this.$auth.user.attachments.banner.attached || localStorage.getItem('dontAskMeAgainAboutBanner') === 'true')
      this.offerToUploadAvatar = !(this.$auth.user.attachments.avatar.attached || localStorage.getItem('dontAskMeAgainAboutAvatar') === 'true')
    }
  }
}
</script>
