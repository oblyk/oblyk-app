<template>
  <v-dialog
    v-model="shareDialog"
    width="450"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        :small="small"
        :icon="icon"
        :text="!icon"
        :outlined="!icon"
        :title="$t('actions.share')"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon
          :left="!icon"
          :small="small"
        >
          {{ mdiShareVariant }}
        </v-icon>
        <span v-if="!icon">
          {{ $t('actions.share') }}
        </span>
      </v-btn>
    </template>
    <v-card class="oblyk-share-dialog">
      <v-card-title class="text-truncate">
        {{ $t('actions.share') }} : {{ title }}
      </v-card-title>
      <v-card-text class="pb-0">
        <v-btn
          v-if="navigatorCanShare"
          text
          block
          outlined
          large
          class="mb-4"
          @click="share"
        >
          <v-icon left>
            {{ mdiShareVariant }}
          </v-icon>
          {{ $t('actions.shareOn') }} ...
        </v-btn>
        <v-text-field
          v-model="copyUrl"
          outlined
          :hint="copied ? `${$t('actions.textCopied')} !` : null"
          persistent-hint
          class="copy-field"
          :append-icon="copied ? mdiCheck : mdiContentCopy"
          @click:append="copy"
        />
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-spacer />
        <v-btn
          text
          @click="shareDialog = false"
        >
          {{ $t('actions.close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiShareVariant, mdiContentCopy, mdiCheck } from '@mdi/js'

export default {
  name: 'ShareBtn',
  props: {
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    small: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      copyUrl: `${process.env.VUE_APP_OBLYK_APP_URL}${this.url}`,
      copied: false,
      shareDialog: false,

      mdiShareVariant,
      mdiContentCopy,
      mdiCheck
    }
  },

  computed: {
    navigatorCanShare () {
      try {
        return navigator.canShare(
          {
            title: this.title,
            url: this.copyUrl
          }
        )
      } catch (err) {
        return false
      }
    }
  },

  methods: {
    copy () {
      navigator
        .clipboard
        .writeText(this.copyUrl)
        .then(() => {
          this.copied = true
          setTimeout(() => { this.copied = false }, 3000)
        })
    },

    async share () {
      try {
        await navigator.share({
          title: this.title,
          url: this.copyUrl
        })
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
