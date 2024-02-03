<template>
  <div
    v-if="gymChain"
    class="mt-4"
  >
    <v-row>
      <v-col cols="12">
        <v-sheet class="pa-4 rounded">
          <client-only>
            <markdown-text
              v-if="gymChain.description"
              :text="gymChain.description"
            />
          </client-only>
          <div
            v-if="currentUserIsGymChainAdmin()"
            class="text-right"
          >
            <v-menu offset-y>
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
                <v-list-item :to="`${gymChain.path}/edit`">
                  <v-list-item-icon>
                    <v-icon>{{ mdiPencil }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    {{ $t('actions.edit') }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item :to="`${gymChain.path}/logo`">
                  <v-list-item-icon>
                    <v-icon>{{ mdiAlphaLCircle }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    {{ $t('actions.changeLogo') }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item :to="`${gymChain.path}/banner`">
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
        </v-sheet>
      </v-col>
      <v-col cols="12">
        <gym-chain-map
          :gym-chain="gymChain"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mdiDotsVertical, mdiPencil, mdiAlphaLCircle, mdiPanorama } from '@mdi/js'
import { GymChainsHelpers } from '~/mixins/GymChainsHelpers'
import MarkdownText from '~/components/ui/MarkdownText'
import GymChainMap from '~/components/gymChains/GymChainMap'

export default {
  components: { GymChainMap, MarkdownText },
  mixins: [GymChainsHelpers],
  props: {
    gymChain: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiDotsVertical,
      mdiPencil,
      mdiAlphaLCircle,
      mdiPanorama
    }
  }
}
</script>
