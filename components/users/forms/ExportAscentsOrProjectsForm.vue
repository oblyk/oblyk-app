<template>
  <div>
    <p v-html="$t('components.user.exportExplain')" />
    <p v-html="$t('components.user.explainGradeValue')" />
    <p>
      {{ $t('components.user.gradeMoreInformation') }} :
      <nuxt-link to="/grades">
        {{ $t('common.pages.grade.title') }}
      </nuxt-link>
    </p>
    <v-row>
      <v-col>
        <v-btn
          block
          class="w-100"
          text
          color="primary"
          outlined
          :loading="exportingAscents"
          @click="exportToCsv('ascents')"
        >
          <v-icon left>
            {{ mdiCheckAll }}
          </v-icon>
          {{ $t('components.user.exportAscents') }}
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          block
          text
          color="primary"
          outlined
          :loading="exportingProjects"
          @click="exportToCsv('projects')"
        >
          <v-icon left>
            {{ mdiCodeBrackets }}
          </v-icon>
          {{ $t('components.user.exportProjects') }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mdiCheckAll, mdiCodeBrackets } from '@mdi/js'
import AscentCragRouteApi from '~/services/oblyk-api/AscentCragRouteApi'

export default {
  name: 'ExportAscentsOrProjectsForm',

  data () {
    return {
      mdiCheckAll,
      mdiCodeBrackets,
      exportingAscents: false,
      exportingProjects: false
    }
  },

  methods: {
    exportToCsv (type) {
      if (type === 'ascents') {
        this.exportingAscents = true
      } else {
        this.exportingProjects = true
      }

      new AscentCragRouteApi(this.$axios, this.$auth)
        .export(type)
        .then((resp) => {
          const url = window.URL.createObjectURL(new Blob([resp.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', `oblyk-export-${type}.csv`)
          document.body.appendChild(link)
          link.click()
        })
        .finally(() => {
          this.exportingAscents = false
          this.exportingProjects = false
        })
    }
  }
}
</script>
