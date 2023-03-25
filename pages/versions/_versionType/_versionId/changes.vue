<template>
  <div>
    <spinner v-if="loadingVersions" />

    <v-container v-if="!loadingVersions">
      <close-form />
      <div
        v-for="(version, versionIndex) in version.versions"
        :key="`version-${versionIndex}`"
        class="mb-7"
      >
        <p class="mb-1 text-decoration-underline">
          {{ $t(`components.version.event.${version.event}` ) }}
          {{ $t('common.at') }}
          {{ humanizeDate(version.created_at) }}
          <span v-if="version.user">
            {{ $t('common.by').toLowerCase() }}
            <nuxt-link :to="`/climbers/${version.user.slug_name}`">
              {{ version.user.name }}
            </nuxt-link>
          </span>
        </p>
        <div class="pl-5">
          <div
            v-for="(change, changeIndex) in version.changes"
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
import WordApi from '@/services/oblyk-api/WordApi'
import CragApi from '@/services/oblyk-api/CragApi'
import GuideBookPaperApi from '@/services/oblyk-api/GuideBookPaperApi'
import GymApi from '@/services/oblyk-api/GymApi'
import CragSectorApi from '@/services/oblyk-api/CragSectorApi'
import CragRouteApi from '@/services/oblyk-api/CragRouteApi'

export default {
  name: 'VersionsView',
  components: { CloseForm, Spinner },
  mixins: [DateHelpers],

  data () {
    return {
      mdiArrowRight,
      version: {},
      loadingVersions: true,
      versionType: this.$route.params.versionType,
      versionId: this.$route.params.versionId
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
      if (this.versionType === 'word') {
        new WordApi(this.$axios, this.$auth).versions(this.versionId).then((resp) => { this.version = resp.data }).finally(() => { this.loadingVersions = false })
      } else if (this.versionType === 'crag') {
        new CragApi(this.$axios, this.$auth).versions(this.versionId).then((resp) => { this.version = resp.data }).finally(() => { this.loadingVersions = false })
      } else if (this.versionType === 'cragSector') {
        new CragSectorApi(this.$axios, this.$auth).versions(this.versionId).then((resp) => { this.version = resp.data }).finally(() => { this.loadingVersions = false })
      } else if (this.versionType === 'cragRoute') {
        new CragRouteApi(this.$axios, this.$auth).versions(this.versionId).then((resp) => { this.version = resp.data }).finally(() => { this.loadingVersions = false })
      } else if (this.versionType === 'guideBookPaper') {
        new GuideBookPaperApi(this.$axios, this.$auth).versions(this.versionId).then((resp) => { this.version = resp.data }).finally(() => { this.loadingVersions = false })
      } else if (this.versionType === 'gym') {
        new GymApi(this.$axios, this.$auth).versions(this.versionId).then((resp) => { this.version = resp.data }).finally(() => { this.loadingVersions = false })
      }
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
