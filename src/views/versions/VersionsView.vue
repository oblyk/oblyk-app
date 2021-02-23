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
          {{ $t(`components.version.event.${version.event}` )}}
          {{ $t('common.at') }}
          {{ humanizeDate(version.created_at) }}
          <span v-if="version.user">
            {{ $t('common.by').toLowerCase() }}
            <router-link :to="`/users/${version.user.uuid}/${version.user.slug_name}`">
              {{ version.user.name }}
            </router-link>
          </span>
        </p>
        <div class="pl-5">
          <div
            v-for="(change, changeIndex) in version.changes"
            :key="`version-${versionIndex}-${changeIndex}`"
          >
            <table
              v-if="!(change[0] === null && change[1] === false)"
              class="mb-2">
              <tr>
                <th class="text-right pr-2">{{ $t('common.field') }} :</th>
                <td>{{ $t(`models.${versionType}.${changeIndex}`) }}</td>
              </tr>
              <tr v-if="change[0] !== null">
                <th class="text-right pr-2">{{ $t('common.from') }} :</th>
                <td>
                  {{ changeValue(change[0], changeIndex) }}
                </td>
              </tr>
              <tr>
                <th class="text-right pr-2">
                  <span v-if="change[0] !== null">{{ $t('common.to') }} :</span>
                  <v-icon v-if="change[0] === null" small>mdi-arrow-right</v-icon>
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
        class="text-center text--disabled mt-10"
        v-if="version.versions.length === 0">
        {{ $t('components.version.noVersion') }}
      </p>
    </v-container>
  </div>
</template>

<script>
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
  props: {
    versionType: String,
    versionId: [Number, String]
  },

  data () {
    return {
      version: {},
      loadingVersions: true
    }
  },

  mounted () {
    this.getVersion()
  },

  methods: {
    getVersion: function () {
      if (this.versionType === 'word') {
        WordApi.versions(this.versionId).then(resp => { this.version = resp.data }).finally(() => { this.loadingVersions = false })
      } else if (this.versionType === 'crag') {
        CragApi.versions(this.versionId).then(resp => { this.version = resp.data }).finally(() => { this.loadingVersions = false })
      } else if (this.versionType === 'cragSector') {
        CragSectorApi.versions(this.versionId).then(resp => { this.version = resp.data }).finally(() => { this.loadingVersions = false })
      } else if (this.versionType === 'cragRoute') {
        CragRouteApi.versions(this.versionId).then(resp => { this.version = resp.data }).finally(() => { this.loadingVersions = false })
      } else if (this.versionType === 'guideBookPaper') {
        GuideBookPaperApi.versions(this.versionId).then(resp => { this.version = resp.data }).finally(() => { this.loadingVersions = false })
      } else if (this.versionType === 'gym') {
        GymApi.versions(this.versionId).then(resp => { this.version = resp.data }).finally(() => { this.loadingVersions = false })
      }
    },

    changeValue: function (change, key) {
      if (change === false) {
        return this.$t('actions.no')
      } else if (change === true) {
        return this.$t('actions.yes')
      } else if (typeof change === 'object') {
        return change.map((value) => { return this.$t(`models.${key}.${value}`) }).join(', ')
      } else {
        return change
      }
    }
  },

  objectApi: function () {

  }
}
</script>
