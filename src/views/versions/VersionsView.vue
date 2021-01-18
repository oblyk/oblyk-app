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
        <p class="mb-1">
          {{ $t(`components.version.event.${version.event}` )}}
          {{ $t('common.at') }}
          {{ humanizeDate(version.created_at) }}
          <span v-if="version.user">
            {{ $t('common.by').toLowerCase() }}
            <router-link :to="`/users/${version.user.slug_name}/${version.user.id}`">
              {{ version.user.name }}
            </router-link>
          </span>
        </p>
        <div class="pl-5">
          <div
            v-for="(change, changeIndex) in version.changes"
            :key="`version-${versionIndex}-${changeIndex}`"
          >
            <table class="mb-2">
              <tr>
                <th class="text-right pr-2">{{ $t('common.field') }} :</th>
                <td>{{ $t(`models.${versionType.toLowerCase()}.${changeIndex}`) }}</td>
              </tr>
              <tr v-if="change[0] !== null">
                <th class="text-right pr-2">{{ $t('common.from') }} :</th>
                <td>{{ change[0] }}</td>
              </tr>
              <tr>
                <th class="text-right pr-2">
                  <span v-if="change[0] !== null">{{ $t('common.to') }} :</span>
                  <v-icon v-if="change[0] === null" small>mdi-arrow-right</v-icon>
                </th>
                <td>{{ change[1] }}</td>
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
import WordApi from '@/services/oblyk-api/WordApi'
import Spinner from '@/components/layouts/Spiner'
import { DateHelpers } from '@/mixins/DateHelpers'
import CloseForm from '@/components/forms/CloseForm'

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
        WordApi.versions(this.versionId).then(resp => { this.version = resp.data; console.log(this.version) }).finally(() => { this.loadingVersions = false })
      }
    }
  },

  objectApi: function () {

  }
}
</script>
