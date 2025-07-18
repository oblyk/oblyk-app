<template>
  <div>
    <page-header
      :title="$t('components.country.france.title')"
      back-to="/outdoor"
    />
    <v-container class="common-page-container">
      <h1 class="mb-16 mt-10 text-center">
        {{ $t('components.country.france.title') }}
      </h1>

      <h2>
        <v-icon class="vertical-align-baseline mb-1" left>
          {{ mdiHomeSearchOutline }}
        </v-icon>
        {{ $t('components.country.search') }}
      </h2>

      <!-- Search -->
      <town-search-form />

      <div class="mt-15">
        <h2>
          <v-icon class="vertical-align-baseline mb-1" left>
            {{ mdiMap }}
          </v-icon>
          {{ $t('components.country.france.departmentMap') }}
        </h2>

        <p class="mt-5" v-html="$t('components.country.mapExplain')" />

        <frane-svg />

        <h2 class="mt-10">
          <v-icon left class="vertical-align-baseline mb-1">
            {{ mdiFormatListText }}
          </v-icon>
          {{ $t('components.country.france.departmentList') }}
        </h2>

        <div v-if="$fetchState.pending" class="mt-10">
          <v-row>
            <v-col cols="4">
              <v-skeleton-loader class="mx-auto" type="chip" width="100" />
            </v-col>
            <v-col cols="4">
              <v-skeleton-loader class="mx-auto" type="chip" width="100" />
            </v-col>
            <v-col cols="4">
              <v-skeleton-loader class="mx-auto" type="chip" width="100" />
            </v-col>
          </v-row>
        </div>

        <div
          v-else
          class="mt-1"
        >
          <v-text-field
            v-model="departmentFiltre"
            outlined
            hide-details
            label="Chercher un département"
            placeholder="Drôme, Arièges, Haute-Garonne"
            :prepend-inner-icon="mdiMagnify"
          />
          <v-row class="mt-1">
            <v-col
              v-for="(department, index) in filteredDepartments"
              :key="`department-${index}`"
              cols="12"
              md="3"
              lg="4"
            >
              <v-btn
                elevation="0"
                block
                color="rgba(33, 150, 243, 0.15)"
                large
                :to="`/escalade-en/france/${department.department_number}/${department.slug_name}`"
              >
                {{ department.department_number }} - {{ department.name }}
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { mdiMagnify, mdiHomeSearchOutline, mdiMap, mdiFormatListText } from '@mdi/js'
import { LocalizationHelpers } from '~/mixins/LocalizationHelpers'
import { TextHelpers } from '~/mixins/TextHelpers'
import DepartmentApi from '~/services/oblyk-api/DepartmentApi'
import AppFooter from '~/components/layouts/AppFooter'
import TownSearchForm from '~/components/towns/forms/TownSearchForm'
import FraneSvg from '~/components/Countries/FranceSvg'
import PageHeader from '~/components/layouts/PageHeader.vue'

export default {
  components: { PageHeader, FraneSvg, TownSearchForm, AppFooter },
  mixins: [LocalizationHelpers, TextHelpers],

  data () {
    return {
      towns: [],
      departments: [],
      departmentFiltre: '',

      mdiMagnify,
      mdiHomeSearchOutline,
      mdiMap,
      mdiFormatListText
    }
  },

  async fetch () {
    await new DepartmentApi(
      this.$axios,
      this.$store
    ).all('fr').then((resp) => {
      this.departments = resp.data
    })
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "Escalade en France: falaises, topos et salles d'escalade",
        metaDescription: "Retrouve les informations sur les sites d'escalade en France (voie, grande voie, bloc, via ferrata ...), les topos et les salles d'escalade sur Oblyk"
      },
      en: {
        metaTitle: 'Climbing in France: crags, guide books and climbing gyms',
        metaDescription: 'Find information on climbing sites in France (routes, multi pitches, boulder, via ferrata ...), guide books and climbing gyms on Oblyk'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('metaDescription') },
        { hid: 'og:title', property: 'og:title', content: this.$t('metaTitle') },
        { hid: 'og:description', property: 'og:description', content: this.$t('metaDescription') },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/meta-image-escalade-en-france.jpg` }
      ]
    }
  },

  computed: {
    filteredDepartments () {
      const departments = []
      for (const department of this.departments) {
        const departmentName = this.removeAccented(department.name.toLowerCase())
        const query = this.removeAccented(this.departmentFiltre.toLowerCase())
        if (this.departmentFiltre === '' || departmentName.includes(query)) {
          departments.push(department)
        }
      }
      return departments
    }
  }
}
</script>
