<template>
  <div>
    <v-card flat>
      <v-list-item three-line>
        <v-list-item-avatar
          rounded="0"
          size="70"
        >
          <v-img
            src="/svg/pdf-guide-book-default.svg"
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
                <div
                  v-if="$auth.loggedIn && ($auth.user.uuid === guideBookPdf.creator.uuid || $auth.user.super_admin)"
                  class="d-inline-block"
                >
                  <v-btn
                    icon
                    :to="`${guideBookPdf.path}/edit?redirect_to=${$route.fullPath}`"
                  >
                    <v-icon small>{{ mdiPencil }}</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    :loading="loadingDelete"
                    @click="deleteGuideBookPdf()"
                  >
                    <v-icon small>{{ mdiTrashCan }}</v-icon>
                  </v-btn>
                </div>
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
import { mdiPencil, mdiFilePdfBox, mdiTrashCan } from '@mdi/js'
import OblykApi from '~/services/oblyk-api/OblykApi'

export default {
  name: 'GuideBookPdfSmallCard',
  props: {
    guideBookPdf: {
      type: Object,
      required: true
    },
    deleteCallback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      loadingDelete: false,

      mdiPencil,
      mdiFilePdfBox,
      mdiTrashCan
    }
  },

  methods: {
    deleteGuideBookPdf () {
      if (confirm(this.$t('common.areYouSurToDelete'))) {
        this.loadingDelete = true
        new OblykApi(this.$axios, this.$auth)
          .delete(`/public/guide_book_pdfs/${this.guideBookPdf.id}`)
          .then(() => {
            if (this.deleteCallback) {
              this.deleteCallback()
            }
          })
          .finally(() => {
            this.loadingDelete = false
          })
      }
    }
  }
}
</script>
