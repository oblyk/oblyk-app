<template>
  <v-card class="full-height">
    <v-card-text>
      <v-alert
        text
        :icon="guideBookPaper.fundingAttributes.icon"
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
            icon="mdi-fountain-pen-tip"
            :item-title="$t('models.guideBookPaper.author')"
            :item-value="guideBookPaper.author"
          />
        </v-col>

        <!-- Editor -->
        <v-col cols="6">
          <description-line
            icon="mdi-library"
            :item-title="$t('models.guideBookPaper.editor')"
            :item-value="guideBookPaper.editor"
          />
        </v-col>

        <!-- Publication year -->
        <v-col cols="6">
          <description-line
            icon="mdi-calendar"
            :item-title="$t('models.guideBookPaper.year')"
            :item-value="guideBookPaper.publication_year"
          />
        </v-col>

        <!-- Price -->
        <v-col cols="6">
          <description-line
            icon="mdi-cash-multiple"
            :item-title="$t('models.guideBookPaper.price')"
            :item-value="guideBookPaper.price"
            item-suffix="€"
          />
        </v-col>

        <!-- EAN -->
        <v-col cols="6">
          <description-line
            icon="mdi-barcode"
            :item-title="$t('models.guideBookPaper.ean')"
            :item-value="guideBookPaper.ean"
          />
        </v-col>

        <!-- Number of page -->
        <v-col cols="6">
          <description-line
            icon="mdi-book-open-page-variant"
            :item-title="$t('models.guideBookPaper.number_of_page')"
            :item-value="guideBookPaper.number_of_page"
            item-suffix="pages"
          />
        </v-col>

        <!-- Weight -->
        <v-col cols="6">
          <description-line
            icon="mdi-weight"
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
                    mdi-flag
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
                    mdi-pencil
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
          followed-icon="mdi-bookshelf"
          unfollowed-icon="mdi-bookshelf"
          subscribe-label="actions.addToLibrary"
          unsubscribe-label="actions.removeFromLibrary"
        />
      </div>
    </v-card-text>
    <v-card-title class="pb-0 text-h6 font-weight-regular">
      <v-icon left small>
        mdi-comment
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
  }
}
</script>
