<template>
  <v-container>
    <spinner v-if="!gym" />
    <div v-else>
      <v-breadcrumbs :items="breadcrumbs" />
      <h2 class="mb-3">
        {{ $t('components.gymAdmin.labelTemplate') }}
      </h2>
      <indoor-subscription-lock-alert
        v-if="gym.plan === 'free'"
        feature="labelTemplate"
        :gym="gym"
      />
      <v-skeleton-loader
        v-if="loadingLabelTemplates"
        type="list-item"
      />
      <div v-else>
        <v-list-item
          v-for="(labelTemplate, labelTemplateIndex) in labelTemplates"
          :key="`label-template-index-${labelTemplateIndex}`"
          :to="labelTemplate.path"
          class="rounded border mb-2"
        >
          <v-list-item-icon>
            <v-icon size="30">
              {{ mdiFileDocumentOutline }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title :class="labelTemplate.archived_at ? 'text--disabled' : 'font-weight-bold'">
              <strong v-if="labelTemplate.archived_at">
                [Archivé]
              </strong>
              {{ labelTemplate.name }}
            </v-list-item-title>
            <v-list-item-subtitle :class="labelTemplate.archived_at ? 'text--disabled' : ''">
              direction : {{ $t(`models.gymLabelTemplate.page_format_list.${labelTemplate.page_format}`) }} ·
              format : {{ $t(`models.gymLabelTemplate.page_direction_list.${labelTemplate.page_direction}`) }} ·
              {{ labelTemplate.font.name }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <p
          v-if="labelTemplates.length === 0"
          class="text-center py-5 text--disabled"
        >
          Vous n'avez pas encore paramétré d'étiquette.
        </p>
        <div class="text-right">
          <v-btn
            outlined
            text
            :disabled="gym.plan === 'free'"
            :to="`${gym.adminPath}/label-templates/new`"
          >
            <v-icon left>
              {{ gym.plan === 'free' ? mdiLock : mdiPlus }}
            </v-icon>
            {{ $t('actions.new') }}
            <v-icon
              v-if="gym.plan === 'free_trial'"
              right
              color="deep-purple accent-4"
            >
              {{ mdiArrowUpBoldHexagonOutline }}
            </v-icon>
          </v-btn>
        </div>
        <v-alert
          class="mt-4"
          type="info"
          text
        >
          Vous avez besoin options particulières pour vos étiquettes ? D'une police spécifique ? Contactez-nous :
          <a href="mailto:ekip@oblyk.org" style="color: inherit">ekip@oblyk.org</a>
        </v-alert>
        <div class="border-top mt-6 pt-4">
          <v-btn
            text
            :to="`${gym.adminPath}/climbing-styles`"
          >
            <v-icon left>
              {{ mdiArrowLeft }}
            </v-icon>
            {{ $t('components.gymAdmin.styles') }}
          </v-btn>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mdiPlus, mdiFileDocumentOutline, mdiArrowLeft, mdiLock, mdiArrowUpBoldHexagonOutline } from '@mdi/js'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import GymLabelTemplateApi from '~/services/oblyk-api/GymLabelTemplateApi'
import GymLabelTemplate from '~/models/GymLabelTemplate'
import Spinner from '~/components/layouts/Spiner.vue'
import IndoorSubscriptionLockAlert from '~/components/indoorSubscription/IndoorSubscriptionLockAlert.vue'

export default {
  components: { IndoorSubscriptionLockAlert, Spinner },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern],
  middleware: ['auth', 'gymAdmin'],

  data () {
    return {
      loadingLabelTemplates: true,
      labelTemplates: [],

      mdiPlus,
      mdiFileDocumentOutline,
      mdiArrowLeft,
      mdiLock,
      mdiArrowUpBoldHexagonOutline
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "Modèle d'étiquettes"
      },
      en: {
        metaTitle: 'Label templates'
      }
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
        }
      ]
    }
  },

  mounted () {
    this.getLabelTemplates()
  },

  methods: {
    getLabelTemplates () {
      this.loadingLabelTemplates = true
      new GymLabelTemplateApi(this.$axios, this.$auth)
        .all(this.$route.params.gymId, true)
        .then((resp) => {
          this.labelTemplates = []
          for (const labelTemplate of resp.data) {
            this.labelTemplates.push(new GymLabelTemplate({ attributes: labelTemplate }))
          }
        })
        .finally(() => {
          this.loadingLabelTemplates = false
        })
    }
  }
}
</script>
