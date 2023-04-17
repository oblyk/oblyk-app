<template>
  <v-card
    class="mb-4"
    :loading="loading"
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title
          class="text-h5"
          :class="isActivate ? '' : 'text--disabled'"
        >
          {{ locality.locality.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ locality.locality.region }},
          {{ locality.locality.country }}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-menu>
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              :loading="loading"
              :class="isActivate ? '' : 'text--disabled'"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>
                {{ mdiDotsVertical }}
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-if="isActivate"
              @click="deactivateLocalityUser()"
            >
              <v-list-item-icon>
                <v-icon>
                  {{ mdiEyeOff }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ $t('actions.deactivate') }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              v-if="!isActivate"
              @click="activateLocalityUser()"
            >
              <v-list-item-icon>
                <v-icon>
                  {{ mdiEye }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ $t('actions.activate') }}
              </v-list-item-title>
            </v-list-item>
            <v-divider />
            <v-list-item
              v-if="locality.description"
              @click="deleteDescription()"
            >
              <v-list-item-icon>
                <v-icon color="red">
                  {{ mdiTextBoxRemoveOutline }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title class="red--text">
                {{ $t('actions.deleteNote') }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="deleteLocalityUser()">
              <v-list-item-icon>
                <v-icon color="red">
                  {{ mdiTrashCan }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title class="red--text">
                {{ $t('actions.delete') }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list-item-action>
    </v-list-item>
    <div
      v-if="locality.description"
      class="px-4"
      :class="isActivate ? '' : 'text--disabled'"
    >
      <markdown-text :text="locality.description" />
    </div>
    <div
      class="px-4"
      :class="isActivate ? '' : 'text--disabled'"
    >
      <v-select
        v-model="data.radius"
        :loading="updatingRadius"
        :label="`Distance autour de ${locality.locality.name}`"
        :items="radiusDist"
        :disabled="!isActivate"
        class="mb-2"
        dense
        outlined
        hide-details
        @change="updateRadius()"
      />
    </div>
    <v-card-actions>
      <v-spacer />
      <v-btn
        v-if="!isActivate"
        text
        outlined
        color="primary"
        @click="activateLocalityUser()"
      >
        {{ $t('actions.activate') }}
      </v-btn>
      <v-btn
        v-if="isActivate"
        text
        outlined
        color="primary"
        @click="dialog = !dialog"
      >
        {{ $t(locality.description === null ? 'actions.addNote' : 'actions.editNote') }}
      </v-btn>
    </v-card-actions>
    <v-dialog
      v-model="dialog"
      width="600px"
    >
      <v-card>
        <v-card-title>
          {{ $t(locality.description === null ? 'actions.addNote' : 'actions.editNote') }}
        </v-card-title>
        <div class="pa-4">
          <v-textarea
            v-model="data.description"
            outlined
          />
        </div>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            color="primary"
            @click="saveLocalityUserDescription()"
          >
            {{ $t('actions.save') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import {
  mdiDotsVertical,
  mdiTrashCan,
  mdiEyeOff,
  mdiEye,
  mdiTextBoxRemoveOutline
} from '@mdi/js'
import MarkdownText from '~/components/ui/MarkdownText.vue'
import LocalityUserApi from '~/services/oblyk-api/LocalityUserApi'
import LocalityUser from '~/models/LocalityUser'

export default {
  name: 'LocalityUserEditCard',
  components: { MarkdownText },

  props: {
    localityUser: {
      type: Object,
      required: true
    },
    reloadLocalities: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      loading: false,
      dialog: false,
      locality: this.localityUser,
      updatingPartnerSearch: false,
      updatingLocalSharing: false,
      updatingRadius: false,
      radiusDist: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      data: {
        id: this.localityUser.id,
        description: this.localityUser.description,
        partner_search: this.localityUser.partner_search,
        local_sharing: this.localityUser.local_sharing,
        radius: this.localityUser.radius
      },

      mdiDotsVertical,
      mdiTrashCan,
      mdiEyeOff,
      mdiEye,
      mdiTextBoxRemoveOutline
    }
  },

  computed: {
    isActivate () {
      return this.locality.deactivated_at === null
    }
  },

  methods: {
    reloadLocality () {
      this.loading = true
      new LocalityUserApi(this.$axios, this.$auth)
        .find(this.localityUser.id)
        .then((resp) => {
          this.locality = new LocalityUser({ attributes: resp.data })
        })
        .finally(() => {
          this.loading = false
          this.updatingPartnerSearch = false
          this.updatingLocalSharing = false
          this.updatingRadius = false
        })
    },

    deleteLocalityUser () {
      if (confirm('êtes vous sûr de supprimer ce lieu ?')) {
        this.loading = true
        new LocalityUserApi(this.$axios, this.$auth)
          .delete(this.localityUser.id)
          .then(() => {
            this.reloadLocalities()
          })
          .finally(() => {
            this.loading = false
          })
      }
    },

    deactivateLocalityUser () {
      this.loading = true
      new LocalityUserApi(this.$axios, this.$auth)
        .deactivate(this.localityUser.id)
        .then(() => {
          this.reloadLocality()
        })
    },

    activateLocalityUser () {
      this.loading = true
      new LocalityUserApi(this.$axios, this.$auth)
        .activate(this.localityUser.id)
        .then(() => {
          this.reloadLocality()
        })
    },

    saveLocalityUserDescription () {
      this.loading = true
      this.dialog = false
      new LocalityUserApi(this.$axios, this.$auth)
        .update(this.data)
        .then(() => {
          this.reloadLocality()
        })
    },

    deleteDescription () {
      this.loading = true
      new LocalityUserApi(this.$axios, this.$auth)
        .update({
          id: this.data.id,
          description: null
        })
        .then(() => {
          this.reloadLocality()
        })
    },

    updatePartnerSearch () {
      this.updatingPartnerSearch = true
      new LocalityUserApi(this.$axios, this.$auth)
        .update({
          id: this.data.id,
          partner_search: this.data.partner_search
        })
        .then(() => {
          this.reloadLocality()
        })
    },

    updateLocalSharing () {
      this.updatingLocalSharing = true
      new LocalityUserApi(this.$axios, this.$auth)
        .update({
          id: this.data.id,
          local_sharing: this.data.local_sharing
        })
        .then(() => {
          this.reloadLocality()
        })
    },

    updateRadius () {
      this.updatingRadius = true
      new LocalityUserApi(this.$axios, this.$auth)
        .update({
          id: this.data.id,
          radius: this.data.radius
        })
        .then(() => {
          this.reloadLocality()
        })
    }
  }
}
</script>
