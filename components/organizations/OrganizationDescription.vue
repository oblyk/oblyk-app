<template>
  <v-card class="full-height">
    <v-app-bar flat>
      <v-toolbar-title class="text-h6 white--text pl-0">
        {{ organization.name }}
      </v-toolbar-title>

      <v-spacer />

      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>{{ mdiDotsVertical }}</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-subheader>
            {{ $t('components.organization.ressources') }}
          </v-subheader>
          <v-list-item href="https://api.oblyk.org/documentation" target="_blank">
            <v-list-item-icon>
              <v-icon>{{ mdiCodeBraces }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t('components.organization.apiDocumentation') }}</v-list-item-title>
          </v-list-item>

          <v-subheader>
            {{ $t('components.organization.manage') }}
          </v-subheader>
          <v-list-item :to="`/a${organization.path}/edit`">
            <v-list-item-icon>
              <v-icon>{{ mdiPencil }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t('actions.edit') }}</v-list-item-title>
          </v-list-item>

          <!-- Refresh Api Key -->
          <v-list-item @click="refreshApiKey">
            <v-list-item-icon>
              <v-icon class="red--text text--lighten-1">
                {{ mdiRefresh }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title class="red--text text--lighten-1">
              {{ $t('components.organization.refreshApiKey') }}
            </v-list-item-title>
          </v-list-item>

          <!-- Delete organization -->
          <v-list-item @click="deleteOrganization">
            <v-list-item-icon>
              <v-icon class="red--text text--lighten-1">
                {{ mdiDelete }}
              </v-icon>
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
            <v-icon small left>
              {{ mdiFormatListBulletedType }}
            </v-icon>
            {{ $t('models.organization.api_usage_type') }}
          </p>
          <div class="pl-7">
            {{ $t(`models.usageTypes.${organization.api_usage_type}`) }}
          </div>
        </v-col>
        <v-col sm="12" md="6" lg="4">
          <p class="font-weight-bold mb-1">
            <v-icon small left>
              {{ mdiAt }}
            </v-icon>
            {{ $t('models.organization.email') }}
          </p>
          <div class="pl-7">
            {{ organization.email }}
          </div>
        </v-col>
        <v-col sm="12" md="6" lg="4">
          <p class="font-weight-bold mb-1">
            <v-icon small left>
              {{ mdiCodeBrackets }}
            </v-icon>
            {{ $t('models.organization.api_access_key') }}
          </p>
          <div class="pl-7">
            <pre class="d-inline" @click="getAccessKey">{{ apiAccessKey }}</pre>
          </div>
        </v-col>
      </v-row>

      <!-- Website, phone and company number -->
      <v-row>
        <v-col sm="12" md="6" lg="4">
          <p class="font-weight-bold mb-1">
            <v-icon small left>
              {{ mdiWeb }}
            </v-icon>
            {{ $t('models.organization.website') }}
          </p>
          <div class="pl-7">
            <a
              v-if="organization.website"
              :href="organization.website"
              target="_blank"
            >
              {{ organization.website }}
            </a>
            <cite v-if="!organization.website" class="text--disabled">
              {{ $t('common.noInformation') }}
            </cite>
          </div>
        </v-col>
        <v-col sm="12" md="6" lg="4">
          <p class="font-weight-bold mb-1">
            <v-icon small left>
              {{ mdiPhone }}
            </v-icon>
            {{ $t('models.organization.phone') }}
          </p>
          <div class="pl-7">
            <span v-if="organization.phone">{{ organization.phone }}</span>
            <cite v-if="!organization.phone" class="text--disabled">
              {{ $t('common.noInformation') }}
            </cite>
          </div>
        </v-col>
        <v-col sm="12" md="6" lg="4">
          <p class="font-weight-bold mb-1">
            <v-icon small left>
              {{ mdiDomain }}
            </v-icon>
            {{ $t('models.organization.company_registration_number') }}
          </p>
          <div class="pl-7">
            <span v-if="organization.company_registration_number">{{ organization.company_registration_number }}</span>
            <cite v-if="!organization.company_registration_number" class="text--disabled">
              {{ $t('common.noInformation') }}
            </cite>
          </div>
        </v-col>
      </v-row>

      <!-- Address, postal code and city -->
      <v-row>
        <v-col>
          <p class="font-weight-bold mb-1">
            <v-icon small left>
              {{ mdiMapMarker }}
            </v-icon>
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
import {
  mdiDotsVertical,
  mdiCodeBraces,
  mdiPencil,
  mdiRefresh,
  mdiDelete,
  mdiFormatListBulletedType,
  mdiAt,
  mdiCodeBrackets,
  mdiWeb,
  mdiPhone,
  mdiDomain,
  mdiMapMarker
} from '@mdi/js'
import OrganizationApi from '~/services/oblyk-api/OrganizationApi'

export default {
  name: 'OrganizationDescription',
  props: {
    organization: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiDotsVertical,
      mdiCodeBraces,
      mdiPencil,
      mdiRefresh,
      mdiDelete,
      mdiFormatListBulletedType,
      mdiAt,
      mdiCodeBrackets,
      mdiWeb,
      mdiPhone,
      mdiDomain,
      mdiMapMarker,
      keyIsVisible: false,
      apiAccessKey: 'Clic to see key'
    }
  },

  methods: {
    getAccessKey () {
      if (this.keyIsVisible === true) { return }

      new OrganizationApi(this.$axios, this.$auth)
        .accessKey(this.organization.id)
        .then((resp) => {
          this.keyIsVisible = true
          this.apiAccessKey = resp.data.api_access_token
        })
    },

    refreshApiKey () {
      if (confirm(this.$t('components.organization.surToRefresh'))) {
        new OrganizationApi(this.$axios, this.$auth)
          .refreshApiAccessToken(this.organization.id)
          .then((resp) => {
            this.apiAccessKey = resp.data.api_access_token
          })
      }
    },

    deleteOrganization () {
      if (confirm(this.$t('components.organization.surToDelete'))) {
        new OrganizationApi(this.$axios, this.$auth)
          .delete(this.organization.id)
          .then(() => {
            this.$auth.fetchUser()
            this.$router.push('/')
          })
      }
    }
  }
}
</script>
