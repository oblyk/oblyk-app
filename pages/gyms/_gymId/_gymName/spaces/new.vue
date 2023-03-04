<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('components.gymSpace.addNew') }}
        </h2>
        <p class="subtitle-2 mb-3" v-html="$t('components.gymSpace.explain')" />
        <p class="subtitle-2 mb-8">
          {{ $t('common.seeDocumentation') }}
          <a
            href="https://oblyk.github.io/app-user-doc/docs/indoor/espace/concept"
            target="_blank"
          >
            {{ $t('common.documentation') }}
          </a>
        </p>
        <gym-space-form
          :gym-id="$route.params.gymId"
          submit-methode="post"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GymSpaceForm from '@/components/gymSpaces/forms/GymSpaceForm'

export default {
  meta: { orphanRoute: true },
  components: { GymSpaceForm },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Créer un nouvel espace'
      },
      en: {
        metaTitle: 'Create a new space'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  }
}
</script>
