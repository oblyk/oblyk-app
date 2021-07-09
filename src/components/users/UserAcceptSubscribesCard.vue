<template>
  <div>
    <v-card flat>
      <v-img
        height="200px"
        :src="user.bannerUrl()"
      >
        <v-card-title class="white--text mt-8">
          <v-avatar size="70">
            <img
              alt="user"
              :src="user.avatarUrl()"
            >
          </v-avatar>
          <p class="ml-3">
            {{ user.full_name }}<br>
            <small v-if="user.date_of_birth">
              {{ yearsOld(user.date_of_birth) }}
            </small>
          </p>
        </v-card-title>
      </v-img>
      <v-card-text>
        <div class="font-weight-bold ml-8 mb-2">
          {{ user.description }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          small
          @click="rejectSubscribes()"
          :loading="loadingReject"
          :disabled="loadingAccept"
        >
          {{ $t('actions.reject') }}
        </v-btn>
        <v-btn
          color="primary"
          text
          @click="acceptSubscribes()"
          :loading="loadingAccept"
          :disabled="loadingReject"
        >
          {{ $t('actions.accept') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>

import { DateHelpers } from '@/mixins/DateHelpers'
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'

export default {
  name: 'UserAcceptSubscribesCard',
  mixins: [DateHelpers],
  props: {
    user: Object,
    callback: Function
  },

  data () {
    return {
      loadingAccept: false,
      loadingReject: false
    }
  },

  methods: {
    acceptSubscribes: function () {
      this.loadingAccept = true
      CurrentUserApi
        .acceptSubscribes(this.user.id)
        .then(() => {
          this.callback('accept')
        })
    },

    rejectSubscribes: function () {
      this.loadingReject = true
      CurrentUserApi
        .rejectSubscribes(this.user.id)
        .then(() => {
          this.callback('reject')
        })
    }
  }
}
</script>
