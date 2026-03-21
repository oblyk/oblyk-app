<template>
  <v-btn
    :disabled="!$auth.loggedIn"
    :small="small"
    :dark="dark"
    text
    :icon="icon"
    :title="iLikeIt ? $t('components.like.IAlreadyIt') : $t('actions.like')"
    :loading="requesting"
    @click.prevent="likeOrUnlike"
  >
    {{ likeCount }}
    <v-icon
      :class="likeCount > 0 ? 'ml-1' : null"
      :small="small"
      :size="iconSize"
      :color="iLikeIt ? 'red' : 'primary'"
    >
      {{ iLikeIt ? mdiHeart : mdiHeartOutline }}
    </v-icon>
  </v-btn>
</template>

<script>
import { mdiHeart, mdiHeartOutline } from '@mdi/js'
import LikeApi from '~/services/oblyk-api/LikeApi'
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'

export default {
  name: 'LikeBtn',
  props: {
    likeableType: {
      type: String,
      required: true
    },
    likeableId: {
      type: [Number, String],
      required: true
    },
    initialLikeCount: {
      type: [Number, String],
      default: null
    },
    dark: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: true
    },
    iconSize: {
      type: [String, Number],
      default: null
    },
    icon: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      requesting: false,
      likeCount: this.initialLikeCount || null,

      mdiHeart,
      mdiHeartOutline
    }
  },

  computed: {
    iLikeIt () {
      return this.$store.getters['likes/storedLikes'][this.likeableType]?.includes(this.likeableId)
    }
  },

  methods: {
    likeOrUnlike () {
      this.requesting = true

      const data = {
        likeable_id: this.likeableId,
        likeable_type: this.likeableType
      }

      const promise = (this.iLikeIt) ? new LikeApi(this.$axios, this.$auth).delete(data) : new LikeApi(this.$axios, this.$auth).create(data)

      promise
        .then((resp) => {
          this.likeCount = resp.data.likeable_likes_count
          this.syncLikes()
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'follow')
        })
    },

    syncLikes () {
      new CurrentUserApi(this.$axios, this.$auth)
        .likes()
        .then((resp) => {
          this.$store.dispatch('likes/storeLikes', resp.data)
        })
        .finally(() => {
          this.requesting = false
        })
    }
  }
}
</script>
