<template>
  <v-card class="full-height">
    <v-card-text>
      <v-alert
        text
        :icon="fundingIcon"
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
      </v-row>

      <v-simple-table class="no-hover-table">
        <template #default>
          <tbody>
            <tr>
              <td colspan="2" class="text-right">
                <contributions-label
                  version-type="guideBookPaper"
                  :version-id="guideBookPaper.id"
                  :versions-count="guideBookPaper.versions_count"
                />
              </td>
            </tr>
            <tr>
              <td colspan="2" class="text-right">
                <v-btn
                  v-if="isLoggedIn"
                  icon
                  small
                  :title="$t('actions.reportProblem')"
                  color="primary"
                  :to="`/a/reports/GuideBookPaper/${guideBookPaper.id}/new?redirect_to=${$route.fullPath}`"
                >
                  <v-icon
                    small
                  >
                    {{ mdiFlag }}
                  </v-icon>
                </v-btn>
                <v-btn
                  v-if="isLoggedIn"
                  text
                  small
                  color="primary"
                  :to="`/a${guideBookPaper.path}/edit`"
                >
                  <v-icon
                    small
                    left
                  >
                    {{ mdiPencil }}
                  </v-icon>
                  {{ $t('actions.edit') }}
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <!-- Add to library btn -->
      <div v-if="isLoggedIn" class="text-center mt-7">
        <subscribe-btn
          subscribe-type="GuideBookPaper"
          :subscribe-id="guideBookPaper.id"
          :large="true"
          followed-color="deep-purple"
          :followed-icon="mdiBookshelf"
          :unfollowed-icon="mdiBookshelf"
          subscribe-label="actions.addToLibrary"
          unsubscribe-label="actions.removeFromLibrary"
        />
      </div>
    </v-card-text>
    <v-card-title class="pb-0 text-h6 font-weight-regular">
      <v-icon left small>
        {{ mdiComment }}
      </v-icon>
      {{ $t('components.comment.climbersComments') }}
    </v-card-title>
    <v-card-text>
      <comment-list
        :commentable-id="guideBookPaper.id"
        commentable-type="GuideBookPaper"
      />
    </v-card-text>
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
  mdiComment,
  mdiBookshelf,
  mdiHandCoin,
  mdiCurrencyUsdOff,
  mdiHelpCircleOutline
} from '@mdi/js'
import { SessionConcern } from '@/concerns/SessionConcern'
import CommentList from '@/components/comments/CommentList'
import SubscribeBtn from '@/components/forms/SubscribeBtn'
import ContributionsLabel from '@/components/globals/ContributionsLable'
import DescriptionLine from '@/components/ui/DescriptionLine'

export default {
  name: 'GuideBookPaperDescription',
  components: { DescriptionLine, ContributionsLabel, SubscribeBtn, CommentList },
  mixins: [SessionConcern],
  props: {
    guideBookPaper: { type: Object, required: true }
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
      mdiComment,
      mdiBookshelf,
      mdiHandCoin,
      mdiHelpCircleOutline
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
