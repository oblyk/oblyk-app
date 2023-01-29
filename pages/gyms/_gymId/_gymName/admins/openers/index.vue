<template>
  <v-container>
    <spinner v-if="loadingOpeners" />
    <div v-else>
      <v-breadcrumbs :items="breadcrumbs" />

      <v-simple-table>
        <template #default>
          <thead>
            <tr>
              <th class="text-left">
                {{ $t('models.gymOpener.name') }}
              </th>
              <th class="text-left">
                {{ $t('models.gymOpener.first_name') }}
              </th>
              <th class="text-left">
                {{ $t('models.gymOpener.last_name') }}
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="opener in openers"
              :key="opener.id"
              :class="opener.deactivated_at !== null ? 'text--disabled' : ''"
            >
              <td>
                <v-avatar
                  v-if="opener.user && opener.user.avatar_thumbnail_url"
                  size="32"
                  class="mr-2"
                >
                  <v-img :src="opener.User.thumbnailAvatarUrl" />
                </v-avatar>
                {{ opener.name }}
              </td>
              <td>{{ opener.first_name }}</td>
              <td>{{ opener.last_name }}</td>
              <td class="text-right">
                <v-menu>
                  <template #activator="{ on, attrs }">
                    <v-btn
                      icon
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
                      :to="`${opener.path}/edit`"
                    >
                      <v-list-item-icon>
                        <v-icon>
                          {{ mdiPencil }}
                        </v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>
                        {{ $t('actions.edit') }}
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item
                      @click="changeActivationStatus(opener)"
                    >
                      <v-list-item-icon>
                        <v-icon>
                          {{ mdiPower }}
                        </v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>
                        {{ opener.deactivated_at === null ? $t('actions.deactivate') : $t('actions.activate') }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div
        v-if="gym"
        class="mt-3"
      >
        <v-btn
          icon
          left
          :to="gym.adminPath"
        >
          <v-icon>
            {{ mdiArrowLeft }}
          </v-icon>
        </v-btn>

        <v-btn
          class="float-right"
          color="primary"
          outlined
          :to="`${gym.adminPath}/openers/new`"
        >
          {{ $t('actions.addOpener') }}
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mdiArrowLeft, mdiDotsVertical, mdiPencil, mdiPower } from '@mdi/js'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import GymOpenerApi from '~/services/oblyk-api/GymOpenerApi'
import Spinner from '~/components/layouts/Spiner.vue'
import GymOpener from '~/models/GymOpener'

export default {
  components: { Spinner },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern],

  data () {
    return {
      loadingOpeners: true,
      openers: [],

      mdiArrowLeft,
      mdiDotsVertical,
      mdiPencil,
      mdiPower
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Les ouvreurs'
      },
      en: {
        metaTitle: 'Openers'
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
          text: this.$t('components.gymAdmin.openers'),
          to: `${this.gym?.adminPath}/openers`,
          exact: true
        }
      ]
    }
  },

  mounted () {
    this.getGymOpeners()
  },

  methods: {
    getGymOpeners () {
      this.loadingOpeners = true
      new GymOpenerApi(this.$axios, this.$auth)
        .all(this.$route.params.gymId)
        .then((resp) => {
          this.openers = []
          for (const opener of resp.data) {
            this.openers.push(new GymOpener({ attributes: opener }))
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymOpener')
        })
        .finally(() => {
          this.loadingOpeners = false
        })
    },

    changeActivationStatus (opener) {
      this.loadingOpeners = true
      let promise = new GymOpenerApi(this.$axios, this.$auth)
      if (opener.deactivated_at === null) {
        promise = promise.deactivate(this.gym.id, opener.id)
      } else {
        promise = promise.activate(this.gym.id, opener.id)
      }

      promise.finally(() => { this.getGymOpeners() })
    }
  }
}
</script>
