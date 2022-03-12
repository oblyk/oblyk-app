<template>
  <v-list-group
    :prepend-icon="mdiTools"
    no-action
  >
    <template #activator>
      <v-list-item-content>
        <v-list-item-title>
          {{ $t('components.layout.appDrawer.tools') }}
        </v-list-item-title>
      </v-list-item-content>
    </template>

    <v-list-item to="/glossary">
      <v-list-item-icon>
        <v-icon>
          {{ mdiBookOpenVariant }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.word.title') }}
      </v-list-item-title>
    </v-list-item>

    <v-list-item to="/grades">
      <v-list-item-icon>
        <v-icon>
          {{ mdiNumeric7BoxMultiple }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('common.pages.grade.title') }}
      </v-list-item-title>
    </v-list-item>

    <!-- Admin tool -->
    <client-only
      v-if="$auth.loggedIn && $auth.user.super_admin"
    >
      <v-subheader inset>
        {{ $t('components.layout.appDrawer.subHeaders.admin') }}
      </v-subheader>
      <v-list-item to="/newsletters">
        <v-list-item-icon>
          <v-icon>
            {{ mdiEmailMultiple }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('components.newsletter.title') }}
        </v-list-item-title>
      </v-list-item>
    </client-only>
  </v-list-group>
</template>

<script>
import { mdiTools, mdiBookOpenVariant, mdiNumeric7BoxMultiple, mdiEmailMultiple } from '@mdi/js'

export default {
  name: 'AppDrawerTool',

  data () {
    return {
      mdiTools,
      mdiBookOpenVariant,
      mdiNumeric7BoxMultiple,
      mdiEmailMultiple
    }
  }
}
</script>
