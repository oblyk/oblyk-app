<template>
  <div>
    <spinner v-if="!author" />
    <v-container v-if="author">
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('actions.edit') }} {{ author.name }}
          </h2>
          <author-form
            :author="author"
            submit-methode="put"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { AuthorConcern } from '@/concerns/AuthorConcern'
import Spinner from '@/components/layouts/Spiner'
import AuthorForm from '@/components/authors/forms/AuthorForm'

export default {
  name: 'AuthorEditView',
  mixins: [AuthorConcern],
  components: { AuthorForm, Spinner }
}
</script>
