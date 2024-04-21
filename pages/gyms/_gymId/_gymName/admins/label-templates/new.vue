<template>
  <v-container v-if="gym">
    <v-breadcrumbs :items="breadcrumbs" />
    <p
      v-if="loadingModel"
      class="text-center my-4 text--disabled"
    >
      {{ $t('common.loading') }}
    </p>
    <gym-label-template-form
      v-else
      :gym="gym"
      :gym-label-template="gymLabelTemplate"
      submit-methode="post"
    />
  </v-container>
</template>

<script>
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import GymLabelTemplateForm from '~/components/gymLabelTemplates/forms/GymLabelTemplateForm'
import GymLabelTemplateApi from '~/services/oblyk-api/GymLabelTemplateApi'
import GymLabelTemplate from '~/models/GymLabelTemplate'

export default {
  components: { GymLabelTemplateForm },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern],
  middleware: ['auth', 'gymAdmin'],

  data () {
    return {
      loadingModel: true,
      gymLabelTemplate: null
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  computed: {
    breadcrumbs () {
      return [
        {
          text: this.gym?.name,
          disable: true
        },
        {
          text: this.$t('components.gymAdmin.home'),
          to: `${this.gym?.adminPath}`,
          exact: true
        },
        {
          text: this.$t('components.gymAdmin.labelTemplate'),
          to: `${this.gym?.adminPath}/label-templates`,
          exact: true
        },
        {
          text: this.$t('actions.new'),
          to: `${this.gym?.adminPath}/label-templates/new`,
          exact: true
        }
      ]
    }
  },

  mounted () {
    this.getModel()
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "Créer un modèle d'étiquette"
      },
      en: {
        metaTitle: 'Create label template'
      }
    }
  },

  methods: {
    getModel () {
      this.loadingModel = true
      new GymLabelTemplateApi(this.$axios, this.$auth)
        .model(this.$route.params.gymId)
        .then((resp) => {
          this.gymLabelTemplate = new GymLabelTemplate({ attributes: resp.data })
        })
        .finally(() => {
          this.loadingModel = false
        })
    }
  }
}
</script>
