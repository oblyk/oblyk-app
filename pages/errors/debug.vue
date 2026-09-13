<template>
  <v-container>
    <v-btn to="/" color="primary">
      <v-icon left>
        {{ mdiArrowLeft }}
      </v-icon>
      Retour à l'accueil
    </v-btn>
    <v-alert color="blue" text class="mt-4">
      Cette page vous permet de supprimer manuellement les éléménts de préférence de l'application.<br>
      La suppression de certain item peut vous déconnecter.
    </v-alert>

    <!-- Cookies -->
    <div class="d-flex align-center mb-2 mt-3">
      <v-btn
        icon
        @click="showCookies = !showCookies"
      >
        <v-icon>
          {{ showCookies ? mdiChevronDown : mdiChevronRight }}
        </v-icon>
      </v-btn>
      <h3
        class="ml-2 hoverable"
        @click="showCookies = !showCookies"
      >
        {{ cookies.length }} Cookies
      </h3>
      <v-btn
        text
        outlined
        class="ml-auto"
        @click="deleteAllCookies"
      >
        <v-icon left>
          {{ mdiTrashCan }}
        </v-icon>
        Tous supprimer
      </v-btn>
    </div>
    <div v-if="showCookies">
      <v-card
        v-for="(cookie, cookieIndex) in cookies"
        :key="`cookie-index-${cookieIndex}`"
        class="pa-1 mb-1"
      >
        <div>
          <p class="mb-0">
            <strong>
              {{ cookie.name }}
            </strong>
            <small class="font-italic">
              {{ cookie.value?.length?.toLocaleString() }} caractères
            </small>
          </p>
          <p class="text--disabled mb-0 text-truncate">
            {{ cookie.value }}
          </p>
        </div>
        <div class="text-right">
          <v-btn
            text
            @click="deleteCookie(cookie)"
          >
            <v-icon left>
              {{ mdiTrashCan }}
            </v-icon>
            Supprimer
          </v-btn>
        </div>
      </v-card>
    </div>

    <!-- Local Storage -->
    <div class="d-flex mt-10 mb-2 align-center">
      <v-btn
        icon
        @click="showLocals = !showLocals"
      >
        <v-icon>
          {{ showCookies ? mdiChevronDown : mdiChevronRight }}
        </v-icon>
      </v-btn>
      <h3
        class="ml-2 hoverable"
        @click="showLocals = !showLocals"
      >
        {{ localStorages.length }} Stockage locales
      </h3>
      <v-btn
        text
        outlined
        class="ml-auto"
        @click="deleteAllLocalStorage"
      >
        <v-icon left>
          {{ mdiTrashCan }}
        </v-icon>
        Tous supprimer
      </v-btn>
    </div>
    <div v-if="showLocals">
      <v-card
        v-for="(localStorage, localStorageIndex) in localStorages"
        :key="`local-index-${localStorageIndex}`"
        class="pa-1 mb-1"
      >
        <div>
          <p class="mb-0">
            <strong>
              {{ localStorage.name }}
            </strong>
            <small class="font-italic">
              {{ localStorage.value?.length?.toLocaleString() }} caractères
            </small>
          </p>
          <p class="text--disabled mb-0 text-truncate">
            {{ localStorage.value }}
          </p>
        </div>
        <div class="text-right">
          <v-btn
            text
            @click="deleteLocalStorage(localStorage)"
          >
            <v-icon left>
              {{ mdiTrashCan }}
            </v-icon>
            Supprimer
          </v-btn>
        </div>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mdiTrashCan, mdiArrowLeft, mdiChevronRight, mdiChevronDown } from '@mdi/js'

export default {
  layout: 'blank',

  data () {
    return {
      showCookies: false,
      showLocals: false,

      cookies: [],
      localStorages: [],
      hiddenFields: ['auth._token.local', 'auth._refresh_token.local'],

      mdiTrashCan,
      mdiArrowLeft,
      mdiChevronRight,
      mdiChevronDown
    }
  },

  mounted () {
    this.getAllCookies()
    this.getAllLocalStorages()
  },

  methods: {
    getAllCookies () {
      this.cookies = []

      const cookieArray = document.cookie.split('; ')

      for (const cookie of cookieArray) {
        if (!cookie) { continue }

        const [name, ...valueParts] = cookie.split('=')
        let value = valueParts.join('=')
        value = this.hiddenFields.includes(name) && value.length > 0 ? '[secret]' : value

        this.cookies.push({
          name,
          value: decodeURIComponent(value)
        })
      }
    },

    getAllLocalStorages () {
      const storages = { ...localStorage }
      this.localStorages = []
      for (const localKey in storages) {
        let value = storages[localKey]
        if (this.hiddenFields.includes(localKey)) {
          value = '[secret]'
        }
        this.localStorages.push({
          name: localKey,
          value
        })
      }
    },

    deleteCookie (cookie, refresh = true) {
      document.cookie = `${cookie.name}=; Thu, 01 Jan 1970 00:00:00; path=/;`
      if (refresh) {
        this.getAllCookies()
      }
    },

    deleteAllCookies () {
      for (const cookie of this.cookies) {
        this.deleteCookie(cookie, false)
      }
      this.getAllCookies()
    },

    deleteLocalStorage (storage, refresh = true) {
      localStorage.removeItem(storage.name)
      if (refresh) {
        this.getAllLocalStorages()
      }
    },

    deleteAllLocalStorage () {
      for (const local of this.localStorages) {
        this.deleteLocalStorage(local, false)
      }
      this.getAllLocalStorages()
    }
  }
}
</script>
