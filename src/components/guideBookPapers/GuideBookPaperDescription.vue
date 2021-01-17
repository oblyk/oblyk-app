<template>
  <v-card class="full-height">
    <v-card-title>
      <v-icon left>
        mdi-information
      </v-icon>
      {{ $t('common.informations') }}
    </v-card-title>
    <v-card-text>
      <v-simple-table class="no-hover-table">
        <template v-slot:default>
          <tbody>
            <tr>
              <th class="smallest-table-column text-right">
                {{ $t('common.type') }}
              </th>
              <td>
                <v-chip>
                  {{ $t('components.guideBookPaper.type') }}
                </v-chip>
              </td>
            </tr>
            <tr>
              <th class="smallest-table-column text-right">
                {{ $t('models.guideBookPaper.author') }}
              </th>
              <td>
                <span v-if="guideBookPaper.author">
                  {{ guideBookPaper.author }}
                </span>
                <span v-else class="text--disabled">
                  {{ $t('common.noInformation') }}
                </span>
              </td>
            </tr>
            <tr>
              <th class="smallest-table-column text-right">
                {{ $t('models.guideBookPaper.editor') }}
              </th>
              <td>
                <span v-if="guideBookPaper.editor">
                  {{ guideBookPaper.editor }}
                </span>
                <span v-else class="text--disabled">
                  {{ $t('common.noInformation') }}
                </span>
              </td>
            </tr>
            <tr>
              <th class="smallest-table-column text-right">
                {{ $t('models.guideBookPaper.publication_year') }}
              </th>
              <td>
                <span v-if="guideBookPaper.publication_year">
                  {{ guideBookPaper.publication_year }}
                </span>
                <span v-else class="text--disabled">
                  {{ $t('common.noInformation') }}
                </span>
              </td>
            </tr>
            <tr>
              <th class="smallest-table-column text-right">
                {{ $t('models.guideBookPaper.price') }}
              </th>
              <td>
                <span v-if="guideBookPaper.price">
                  {{ guideBookPaper.price }} €
                </span>
                <span v-else class="text--disabled">
                  {{ $t('common.noInformation') }}
                </span>
              </td>
            </tr>
            <tr>
              <th class="smallest-table-column text-right">
                {{ $t('models.guideBookPaper.ean') }}
              </th>
              <td>
                <span v-if="guideBookPaper.ean">
                  {{ guideBookPaper.ean }}
                </span>
                <span v-else class="text--disabled">
                  {{ $t('common.noInformation') }}
                </span>
              </td>
            </tr>
            <tr>
              <th class="smallest-table-column text-right">
                {{ $t('models.guideBookPaper.number_of_page') }}
              </th>
              <td>
                <span v-if="guideBookPaper.number_of_page">
                  {{ guideBookPaper.number_of_page }}
                </span>
                <span v-else class="text--disabled">
                  {{ $t('common.noInformation') }}
                </span>
              </td>
            </tr>
            <tr>
              <th class="smallest-table-column text-right">
                {{ $t('models.guideBookPaper.weight') }}
              </th>
              <td>
                <span v-if="guideBookPaper.weight">
                  {{ guideBookPaper.weight }}g
                </span>
                <span v-else class="text--disabled">
                  {{ $t('common.noInformation') }}
                </span>
              </td>
            </tr>
            <tr>
              <td colspan="2" class="text-right">
                <v-btn
                  icon
                  small
                  :title="$t('actions.reportProblem')"
                  color="primary"
                  :to="`/reports/GuideBookPaper/${guideBookPaper.id}/new?redirect_to=${$route.fullPath}`"
                  v-if="isLoggedIn"
                >
                  <v-icon
                    small
                  >
                    mdi-flag
                  </v-icon>
                </v-btn>
                <v-btn
                  text
                  small
                  color="primary"
                  :to="guideBookPaper.path('edit')"
                  v-if="isLoggedIn"
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

export default {
  name: 'GuideBookPaperDescription',
  components: { SubscribeBtn, CommentList },
  mixins: [SessionConcern],
  props: {
    guideBookPaper: Object
  }
}
</script>
