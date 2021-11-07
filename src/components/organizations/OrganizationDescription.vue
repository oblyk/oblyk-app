<template>
  <v-card class="full-height">
    <v-app-bar flat>
      <v-toolbar-title class="text-h6 white--text pl-0">
        {{ organization.name }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-subheader>
            {{ $t('components.organization.ressources') }}
          </v-subheader>
          <v-list-item href="https://api.oblyk.org/documentation" target="_blank">
            <v-list-item-icon>
              <v-icon>mdi-code-braces</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t('components.organization.apiDocumentation') }}</v-list-item-title>
          </v-list-item>

          <v-subheader>
            {{ $t('components.organization.manage') }}
          </v-subheader>
          <v-list-item :to="organization.path('edit')">
            <v-list-item-icon>
              <v-icon>mdi-pencil</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t('actions.edit') }}</v-list-item-title>
          </v-list-item>

          <!-- Refresh Api Key -->
          <v-list-item @click="refreshApiKey">
            <v-list-item-icon>
              <v-icon class="red--text text--lighten-1">mdi-refresh</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="red--text text--lighten-1">
              {{ $t('components.organization.refreshApiKey') }}
            </v-list-item-title>
          </v-list-item>

          <!-- Delete organization -->
          <v-list-item @click="deleteOrganization">
            <v-list-item-icon>
              <v-icon class="red--text text--lighten-1">mdi-delete</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="red--text text--lighten-1">
              {{ $t('actions.delete') }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-card-text>

      <!-- Usage, Email and Api Key-->
      <v-row>
        <v-col sm="12" md="6" lg="4">
          <p class="font-weight-bold mb-1">
            <v-icon small left>mdi-format-list-bulleted-type</v-icon>
            {{ $t('models.organization.api_usage_type') }}
          </p>
          <div class="pl-7">
            {{ $t(`models.usageTypes.${organization.api_usage_type}`) }}
          </div>
        </v-col>
        <v-col sm="12" md="6" lg="4">
          <p class="font-weight-bold mb-1">
            <v-icon small left>mdi-at</v-icon>
            {{ $t('models.organization.email') }}
          </p>
          <div class="pl-7">
            {{ organization.email }}
          </div>
        </v-col>
        <v-col sm="12" md="6" lg="4">
          <p class="font-weight-bold mb-1">
            <v-icon small left>mdi-code-braces</v-icon>
            {{ $t('models.organization.api_access_key') }}
          </p>
          <div class="pl-7">
            <pre @click="getAccessKey" class="d-inline">{{ apiAccessKey }}</pre>
          </div>
        </v-col>
      </v-row>

      <!-- Website, phone and company number -->
      <v-row>
        <v-col sm="12" md="6" lg="4">
          <p class="font-weight-bold mb-1">
            <v-icon small left>mdi-web</v-icon>
            {{ $t('models.organization.website') }}
          </p>
          <div class="pl-7">
            <a
              :href="organization.website"
              v-if="organization.website"
              target="_blank"
            >
              {{ organization.website }}
            </a>
            <cite class="text--disabled" v-if="!organization.website">
              {{ $t('common.noInformation') }}
            </cite>
          </div>
        </v-col>
        <v-col sm="12" md="6" lg="4">
          <p class="font-weight-bold mb-1">
            <v-icon small left>mdi-phone</v-icon>
            {{ $t('models.organization.phone') }}
          </p>
          <div class="pl-7">
            <span v-if="organization.phone">{{ organization.phone}}</span>
            <cite class="text--disabled" v-if="!organization.phone">
              {{ $t('common.noInformation') }}
            </cite>
          </div>
        </v-col>
        <v-col sm="12" md="6" lg="4">
          <p class="font-weight-bold mb-1">
            <v-icon small left>mdi-domain</v-icon>
            {{ $t('models.organization.company_registration_number') }}
          </p>
          <div class="pl-7">
            <span v-if="organization.company_registration_number">{{ organization.company_registration_number}}</span>
            <cite class="text--disabled" v-if="!organization.company_registration_number">
              {{ $t('common.noInformation') }}
            </cite>
          </div>
        </v-col>
      </v-row>

      <!-- Address, postal code and city -->
      <v-row>
        <v-col>
          <p class="font-weight-bold mb-1">
            <v-icon small left>mdi-map-marker</v-icon>
            {{ $t('models.organization.address') }}
          </p>
          <div class="pl-7">
            {{ organization.address }}<br>
            {{ organization.zipcode }} {{ organization.city }}
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>

import OrganizationApi from '@/services/oblyk-api/OrganizationApi'

export default {
  name: 'OrganizationDescription',
  props: {
    organization: Object
  },

  data () {
    return {
      keyIsVisible: false,
      apiAccessKey: 'Clic to see key'
    }
  },

  methods: {
    getAccessKey: function () {
      if (this.keyIsVisible === true) return

      OrganizationApi
        .accessKey(this.organization.id)
        .then(resp => {
          this.keyIsVisible = true
          this.apiAccessKey = resp.data.api_access_token
        })
    },

    refreshApiKey: function () {
      if (confirm(this.$t('components.organization.surToRefresh'))) {
        OrganizationApi
          .refreshApiAccessToken(this.organization.id)
          .then(resp => {
            this.apiAccessKey = resp.data.api_access_token
          })
      }
    },

    deleteOrganization: function () {
      if (confirm(this.$t('components.organization.surToDelete'))) {
        OrganizationApi
          .delete(this.organization.id)
          .then(() => {
            this.$root.$emit('reloadMyOrganizations')
            this.$router.push('/')
          })
      }
    }
  }
}
</script>
