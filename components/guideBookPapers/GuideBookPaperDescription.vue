<template>
  <v-card class="full-height">
    <div class="pa-3 full-height">
      <div class="d-flex flex-column full-height justify-space-between">
        <div class="flex-grow-1">
          <v-alert
            text
            :icon="fundingIcon()"
            :color="guideBookPaper.fundingAttributes.color"
          >
            {{ $t(guideBookPaper.fundingAttributes.labelKey) }}
            <div v-if="guideBookPaper.proposeAlternatives">
              {{ $t('components.guideBookPaper.showAlternativeListe') }}
              <nuxt-link :to="`${guideBookPaper.path}/alternatives`">
                {{ $t('components.guideBookPaper.alternativeGuides') }}
              </nuxt-link>
            </div>
          </v-alert>

          <v-row>
            <!-- Author -->
            <v-col cols="6">
              <description-line
                :icon="mdiFountainPenTip"
                :item-title="$t('models.guideBookPaper.author')"
                :item-value="guideBookPaper.author"
              />
            </v-col>

            <!-- Editor -->
            <v-col cols="6">
              <description-line
                :icon="mdiLibrary"
                :item-title="$t('models.guideBookPaper.editor')"
                :item-value="guideBookPaper.editor"
              />
            </v-col>

            <!-- Publication year -->
            <v-col cols="6">
              <description-line
                :icon="mdiCalendar"
                :item-title="$t('models.guideBookPaper.year')"
                :item-value="guideBookPaper.publication_year"
              />
            </v-col>

            <!-- Price -->
            <v-col cols="6">
              <description-line
                :icon="mdiCashMultiple"
                :item-title="$t('models.guideBookPaper.price')"
                :item-value="guideBookPaper.price"
                item-suffix="€"
              />
            </v-col>

            <!-- EAN -->
            <v-col cols="6">
              <description-line
                :icon="mdiBarcode"
                :item-title="$t('models.guideBookPaper.ean')"
                :item-value="guideBookPaper.ean"
              />
            </v-col>

            <!-- Number of page -->
            <v-col cols="6">
              <description-line
                :icon="mdiBookOpenPageVariant"
                :item-title="$t('models.guideBookPaper.number_of_page')"
                :item-value="guideBookPaper.number_of_page"
                item-suffix="pages"
              />
            </v-col>

            <!-- Weight -->
            <v-col cols="6">
              <description-line
                :icon="mdiWeight"
                :item-title="$t('models.guideBookPaper.weight')"
                :item-value="guideBookPaper.weight"
                item-suffix="grammes"
              />
            </v-col>
            <v-col cols="6">
              <share-btn
                :title="guideBookPaper.name"
                :url="guideBookPaper.path"
                :icon="false"
              />
            </v-col>
            <v-col
              v-if="guideBookPaper.next_guide_book_paper"
              cols="12"
            >
              <guide-book-paper-next-version :guide-book-paper="guideBookPaper.next_guide_book_paper" />
            </v-col>
          </v-row>
        </div>
        <div class="flex-grow-0">
          <client-only>
            <div
              v-if="$auth.loggedIn"
              class="mt-7 text-right"
            >
              <v-btn
                text
                outlined
                small
                :title="$t('actions.reportProblem')"
                color="primary"
                :to="`/reports/GuideBookPaper/${guideBookPaper.id}/new?redirect_to=${$route.fullPath}`"
              >
                <v-icon
                  small
                >
                  {{ mdiFlag }}
                </v-icon>
              </v-btn>
              <v-btn
                text
                small
                outlined
                color="primary"
                :to="`${guideBookPaper.path}/edit`"
              >
                <v-icon
                  small
                  left
                >
                  {{ mdiPencil }}
                </v-icon>
                {{ $t('actions.edit') }}
              </v-btn>
              <v-btn
                :to="`${guideBookPaper.path}/cover`"
                text
                outlined
                small
                color="primary"
              >
                <v-icon
                  left
                >
                  {{ mdiImageAlbum }}
                </v-icon>
                {{ $t('actions.changeCover') }}
              </v-btn>
            </div>
          </client-only>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
import {
  mdiFountainPenTip,
  mdiLibrary,
  mdiCalendar,
  mdiCashMultiple,
  mdiBarcode,
  mdiBookOpenPageVariant,
  mdiWeight,
  mdiFlag,
  mdiPencil,
  mdiCurrencyUsdOff,
  mdiHandCoin,
  mdiHelpCircleOutline,
  mdiImageAlbum
} from '@mdi/js'
import DescriptionLine from '@/components/ui/DescriptionLine'
import GuideBookPaperNextVersion from '~/components/guideBookPapers/GuideBookPaperNextVersion'
import ShareBtn from '~/components/ui/ShareBtn.vue'

export default {
  name: 'GuideBookPaperDescription',
  components: { ShareBtn, GuideBookPaperNextVersion, DescriptionLine },
  props: {
    guideBookPaper: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiFountainPenTip,
      mdiLibrary,
      mdiCalendar,
      mdiCashMultiple,
      mdiBarcode,
      mdiBookOpenPageVariant,
      mdiWeight,
      mdiFlag,
      mdiPencil,
      mdiHandCoin,
      mdiHelpCircleOutline,
      mdiImageAlbum
    }
  },

  methods: {
    fundingIcon () {
      if (this.guideBookPaper.funding_status === 'contributes_to_financing') {
        return mdiHandCoin
      } else if (this.funding_status === 'not_contributes_to_financing') {
        return mdiCurrencyUsdOff
      } else {
        return mdiHelpCircleOutline
      }
    }
  }
}
</script>
