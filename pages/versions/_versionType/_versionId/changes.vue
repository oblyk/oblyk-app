<template>
  <div>
    <spinner v-if="loadingVersions" />

    <v-container v-else>
      <close-form />
      <div
        v-for="(versionItem, versionIndex) in version.versions"
        :key="`version-${versionIndex}`"
        class="mb-7"
      >
        <p class="mb-1 text-decoration-underline">
          {{ $t(`components.version.event.${versionItem.event}` ) }}
          {{ $t('common.at') }}
          {{ humanizeDate(versionItem.created_at) }}
          <span v-if="versionItem.user">
            {{ $t('common.by').toLowerCase() }}
            <nuxt-link :to="`/climbers/${versionItem.user.slug_name}`">
              {{ versionItem.user.name }}
            </nuxt-link>
          </span>
        </p>
        <div class="pl-5">
          <div
            v-for="(change, changeIndex) in versionItem.changes"
            :key="`version-${versionIndex}-${changeIndex}`"
          >
            <table
              v-if="!(change[0] === null && change[1] === false)"
              class="mb-2"
            >
              <tr>
                <th class="text-right pr-2">
                  {{ $t('common.field') }} :
                </th>
                <td>{{ $t(`models.${versionType}.${changeIndex}`) }}</td>
              </tr>
              <tr v-if="change[0] !== null">
                <th class="text-right pr-2">
                  {{ $t('common.from') }} :
                </th>
                <td>
                  {{ changeValue(change[0], changeIndex) }}
                </td>
              </tr>
              <tr>
                <th class="text-right pr-2">
                  <span v-if="change[0] !== null">{{ $t('common.to') }} :</span>
                  <v-icon v-if="change[0] === null" small>
                    {{ mdiArrowRight }}
                  </v-icon>
                </th>
                <td>
                  {{ changeValue(change[1], changeIndex) }}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <p
        v-if="version.versions.length === 0"
        class="text-center text--disabled mt-10"
      >
        {{ $t('components.version.noVersion') }}
      </p>
    </v-container>
  </div>
</template>

<script>
import { mdiArrowRight } from '@mdi/js'
import { DateHelpers } from '@/mixins/DateHelpers'
import Spinner from '@/components/layouts/Spiner'
import CloseForm from '@/components/forms/CloseForm'
import OblykApi from '~/services/oblyk-api/OblykApi'

export default {
  name: 'VersionsView',
  components: { CloseForm, Spinner },
  mixins: [DateHelpers],

  data () {
    return {
      version: {},
      loadingVersions: true,
      versionType: this.$route.params.versionType,

      mdiArrowRight
    }
  },

  head () {
    return {
      title: 'Versions',
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' }
      ]
    }
  },

  mounted () {
    this.getVersion()
  },

  methods: {
    getVersion () {
      const objectId = this.$route.params.versionId
      const apiUrl = {
        word: `/public/words/${objectId}/versions`,
        crag: `/public/crags/${objectId}/versions`,
        cragSector: `/public/crag_sectors/${objectId}/versions`,
        cragRoute: `/public/crag_routes/${objectId}/versions`,
        guideBookPaper: `/public/guide_book_papers/${objectId}/versions`,
        gym: `/gyms/${objectId}/versions`
      }
      new OblykApi(this.$axios, this.$auth)
        .get(apiUrl[this.versionType])
        .then((resp) => { this.version = resp.data })
        .finally(() => { this.loadingVersions = false })
    },

    changeValue (change, key) {
      if (change === false) {
        return this.$t('actions.no')
      } else if (change === true || change === null) {
        return this.$t('actions.yes')
      } else if (typeof change === 'object') {
        return change.map((value) => { return this.$t(`models.${key}.${value}`) }).join(', ')
      } else {
        return change
      }
    }
  }
}
</script>
