<template>
  <div>
    <v-card flat>
      <v-list-item three-line>
        <v-list-item-avatar
          rounded="0"
          size="70"
        >
          <v-img
            :src="guideBookPdf.coverUrl"
            contain
            max-width="70px"
            max-height="70px"
          />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold mt-n1">
            <span class="vertical-align-middle">
              {{ guideBookPdf.name }}
              <client-only>
                <v-btn
                  v-if="$auth.loggedIn && $auth.user.uuid === guideBookPdf.creator.uuid"
                  icon
                  :to="`${guideBookPdf.path}/edit?redirect_to=${$route.fullPath}`"
                >
                  <v-icon small>{{ mdiPencil }}</v-icon>
                </v-btn>
              </client-only>
            </span>
          </v-list-item-title>
          <v-list-item-subtitle class="mb-3 mt-n1">
            <a
              class="text-decoration-none"
              style="color: #e53935"
              :href="guideBookPdf.url"
            >
              <v-icon left small class="mb-1" color="red darken-1">
                {{ mdiFilePdfBox }}
              </v-icon>
              {{ $t('models.guideBookPdf.pdf_file') }}
            </a> |
            <span class="span-comma">
              <span v-if="guideBookPdf.author">{{ guideBookPdf.author }}</span>
              <span v-if="guideBookPdf.editor">{{ guideBookPdf.editor }}</span>
              <span v-if="guideBookPdf.publication_year">{{ guideBookPdf.publication_year }}</span>
            </span>
          </v-list-item-subtitle>
          <v-list-item-subtitle class="mt-n3 mb-4">
            {{ guideBookPdf.description }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import { mdiPencil, mdiFilePdfBox } from '@mdi/js'

export default {
  name: 'GuideBookPdfSmallCard',
  props: {
    guideBookPdf: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiPencil,
      mdiFilePdfBox
    }
  }
}
</script>
