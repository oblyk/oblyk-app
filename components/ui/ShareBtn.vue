<template>
  <v-dialog
    v-model="shareDialog"
    width="450"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        :title="$t('actions.share')"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>
          {{ mdiShare }}
        </v-icon>
      </v-btn>
    </template>
    <v-card class="oblyk-share-dialog">
      <v-card-title>
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
            {{ mdiShare }}
          </v-icon>
          {{ $t('actions.shareOn') }} ...
        </v-btn>
        <v-text-field
          v-model="copyContent"
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
import { mdiShare, mdiContentCopy, mdiCheck } from '@mdi/js'

export default {
  name: 'ShareBtn',
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    small: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      copyContent: this.content,
      copied: false,
      shareDialog: false,

      mdiShare,
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
            url: this.content
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
        .writeText(this.copyContent)
        .then(() => {
          this.copied = true
          setTimeout(() => { this.copied = false }, 3000)
        })
    },

    async share () {
      try {
        await navigator.share({
          title: this.title,
          url: this.content
        })
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
