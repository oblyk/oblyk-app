<template>
  <v-dialog
    v-model="deleteModal"
    width="600"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        color="red lighten-2"
        outlined
        dark
        v-bind="attrs"
        v-on="on"
      >
        {{ $t('components.user.deleteMyAccount') }}
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline">
        {{ $t('components.user.areYouSureToDeleteYourAccount') }}
      </v-card-title>

      <v-card-text>
        <p v-html="$t('components.user.deleteExplain')" />
        <v-checkbox
          v-model="iUnderstand"
          hide-details
          class="mb-2"
          :label="$t('components.user.IUnderstoodTheScopeOfMyAction')"
        />
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="red"
          text
          :disabled="!iUnderstand"
          :loading="deletingAccount"
          @click="deleteMyAccount()"
        >
          {{ $t('components.user.deleteMyAccount') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'

export default {
  name: 'DeleteUserForm',
  props: {
    user: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      deletingAccount: false,
      deleteModal: false,
      iUnderstand: false
    }
  },

  methods: {
    deleteMyAccount () {
      this.deletingAccount = true
      new CurrentUserApi(this.$axios, this.$auth)
        .delete()
        .then(() => {
          this.$auth.logout('local').then(() => {
            this.$router.push('/success-account-deleting')
          })
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'user')
        }).then(() => {
          this.deletingAccount = false
        })
    }
  }
}
</script>
