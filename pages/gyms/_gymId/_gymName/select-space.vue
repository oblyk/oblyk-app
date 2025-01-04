<template>
  <v-container v-if="gym">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('components.gymSpace.chooseSpace') }}
        </h2>
        <v-card
          v-for="(space, spaceIndex) in gymSpaces"
          :key="`space-index-${spaceIndex}`"
          link
          :to="`${space.path}/select-sector`"
          class="mb-4 pt-4"
        >
          <v-img
            v-if="space.pictureAttachment"
            :src="imageVariant(space.pictureAttachment, { fit: 'scale-down', height: 720, width: 720 })"
            height="200"
            contain
          />
          <div
            v-else
            class="my-5 text-center"
          >
            <v-icon x-large>
              {{ mdiMap }}
            </v-icon>
          </div>
          <v-card-title>
            {{ space.name }}
          </v-card-title>
          <v-card-text>
            {{ space.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiMap } from '@mdi/js'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import GymSpace from '~/models/GymSpace'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern, ImageVariantHelpers],

  data () {
    return {
      mdiMap
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Choisissez un espace'
      },
      en: {
        metaTitle: 'Choose a space'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  computed: {
    gymSpaces () {
      const spaces = []
      for (const space of this.gym.gym_spaces) {
        spaces.push(new GymSpace({ attributes: space }))
      }
      return spaces
    }
  }
}
</script>
