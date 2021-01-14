<template>
  <v-card class="full-height">
    <v-card-title>
      <v-icon left>
        mdi-information
      </v-icon>
      {{ $t('common.informations') }}
    </v-card-title>
    <v-card-text>
      <v-simple-table>
        <template v-slot:default>
          <tbody>
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
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'GuideBookPaperDescription',
  props: {
    guideBookPaper: Object
  }
}
</script>
