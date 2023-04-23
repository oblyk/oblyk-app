<template>
  <v-list
    nav
    dense
  >
    <!-- Project -->
    <v-list-group
      :prepend-icon="mdiTerrain"
      no-action
    >
      <template #activator>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t('components.layout.appDrawer.subHeaders.project') }}
          </v-list-item-title>
        </v-list-item-content>
      </template>

      <!-- Oblyk -->
      <v-list-item to="/oblyk">
        <v-list-item-icon>
          <v-icon>
            {{ mdiTerrain }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('components.layout.appDrawer.oblyk') }}
        </v-list-item-title>
      </v-list-item>

      <!-- About -->
      <v-list-item
        exact-path
        to="/about"
      >
        <v-list-item-icon>
          <v-icon>
            {{ mdiInformationOutline }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('components.layout.appDrawer.about') }}
        </v-list-item-title>
      </v-list-item>

      <!-- Helps -->
      <v-list-item
        href="https://oblyk.github.io/app-user-doc"
        target="_blank"
      >
        <v-list-item-icon>
          <v-icon>
            {{ mdiSchool }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('components.layout.appDrawer.helps') }}
          <v-icon
            small
            right
          >
            {{ mdiOpenInNew }}
          </v-icon>
        </v-list-item-title>
      </v-list-item>

      <!-- Indoor guidebook -->
      <v-list-item to="/about/indoor">
        <v-list-item-icon>
          <v-icon>
            {{ mdiSourceBranch }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('components.layout.appDrawer.indoor') }}
          <v-chip
            color="blue"
            class="ml-1"
            dark
            small
          >
            <v-icon
              left
              x-small
            >
              {{ mdiFlask }}
            </v-icon>
            Beta
          </v-chip>
        </v-list-item-title>
      </v-list-item>

      <!-- API and Developers -->
      <v-list-item
        v-if="false"
        to="/api-and-developers"
      >
        <v-list-item-icon>
          <v-icon>
            {{ mdiCodeBrackets }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('common.pages.apiAndDevelopers.title') }}
        </v-list-item-title>
      </v-list-item>

      <!-- Contact -->
      <v-list-item to="/contact">
        <v-list-item-icon>
          <v-icon>
            {{ mdiEmail }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('components.layout.appDrawer.contact') }}
        </v-list-item-title>
      </v-list-item>
    </v-list-group>

    <!-- Toolbox -->
    <app-drawer-tool />

    <!-- News -->
    <v-list-item to="/articles">
      <v-list-item-icon>
        <v-icon>
          {{ mdiBullhornOutline }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appDrawer.news') }}
      </v-list-item-title>
    </v-list-item>

    <!-- Support us -->
    <v-list-item to="/support-us">
      <v-list-item-icon>
        <v-icon color="red">
          {{ mdiCardsHeart }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appDrawer.donation') }}
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
import {
  mdiCardsHeart,
  mdiBullhornOutline,
  mdiTerrain,
  mdiInformationOutline,
  mdiSchool,
  mdiCodeBrackets,
  mdiEmail,
  mdiOpenInNew,
  mdiSourceBranch,
  mdiFlask
} from '@mdi/js'
import AppDrawerTool from '~/components/layouts/AppDrawerPartial/AppDrawerTool'

export default {
  name: 'AppDrawerAbout',
  components: { AppDrawerTool },

  data () {
    return {
      mdiCardsHeart,
      mdiBullhornOutline,
      mdiTerrain,
      mdiInformationOutline,
      mdiSchool,
      mdiCodeBrackets,
      mdiEmail,
      mdiOpenInNew,
      mdiSourceBranch,
      mdiFlask
    }
  }
}
</script>
