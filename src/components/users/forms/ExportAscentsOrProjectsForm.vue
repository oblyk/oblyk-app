<template>
  <div>
    <p v-html="$t('components.user.exportExplain')" />
    <p v-html="$t('components.user.explainGradeValue')" />
    <p>
      {{ $t('components.user.gradeMoreInformation') }} :
      <router-link to="/grades">
        {{ $t('common.pages.grade.title') }}
      </router-link>
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
            mdi-check-all
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
            mdi-code-brackets
          </v-icon>
          {{ $t('components.user.exportProjects') }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AscentCragRouteApi from '@/services/oblyk-api/AscentCragRouteApi'

export default {
  name: 'ExportAscentsOrProjectsForm',

  data () {
    return {
      exportingAscents: false,
      exportingProjects: false
    }
  },

  methods: {
    exportToCsv: function (type) {
      if (type === 'ascents') {
        this.exportingAscents = true
      } else {
        this.exportingProjects = true
      }

      AscentCragRouteApi
        .export(type)
        .then(resp => {
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
