<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="mt-5 mb-10 text-center">
        {{ $t('components.deleteAccount.title') }}
      </h1>
      <v-row>
        <v-col class="col-md-6" order-md="last">
          <p v-html="$t('components.deleteAccount.paragraph1')" />
          <p v-html="$t('components.deleteAccount.paragraph2')" />
          <client-only>
            <div v-if="$auth.loggedIn">
              <p v-html="$t('components.deleteAccount.unlock')" />
              <v-text-field
                v-model="unlockWord"
                outlined
                :label="$t('components.deleteAccount.label')"
              />
              <div class="text-center">
                <v-btn
                  class="white--text"
                  color="red"
                  elevation="0"
                  :disabled="unlockWord === null || unlockWord.toLowerCase() !== $t('actions.delete').toLowerCase()"
                  :loading="deletingAccount"
                  @click="deleteMyAccount()"
                >
                  {{ $t('components.deleteAccount.title') }}
                </v-btn>
              </div>

              <p class="mt-5 mb-2">
                <strong>(1)</strong> {{ $t('components.deleteAccount.tips') }}
              </p>
              <p>
                <v-btn
                  outlined
                  text
                  small
                  to="/home/settings/others"
                >
                  {{ $t('components.user.exportAscents') }}
                </v-btn>
              </p>
            </div>
            <div v-else>
              {{ $t('components.deleteAccount.connectToDelete') }}
              <div class="text-center">
                <v-btn
                  :to="`/sign-in?redirect_to=${$route.fullPath}`"
                  color="primary"
                  outlined
                >
                  {{ $t('actions.signIn') }}
                </v-btn>
              </div>
            </div>
          </client-only>
        </v-col>
        <v-col class="col-md-6">
          <v-img
            width="526"
            height="223"
            contain
            src="/svg/delete-account.svg"
          />
        </v-col>
      </v-row>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppFooter from '@/components/layouts/AppFooter'
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'

export default {
  meta: {
    test: true
  },
  components: { AppFooter },

  data () {
    return {
      unlockWord: null,
      deletingAccount: false
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Supprimer mon compte',
        metaDescription: "Supprimez votre compte et toutes les données qui s'y rapportent"
      },
      en: {
        metaTitle: 'Delete my account',
        metaDescription: 'Delete your account and all related data'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle'),
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' },
        { hid: 'description', name: 'description', content: this.$t('metaDescription') },
        { hid: 'og:title', property: 'og:title', content: this.$t('metaTitle') },
        { hid: 'og:description', property: 'og:description', content: this.$t('metaDescription') },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg` }
      ]
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
        })
        .then(() => {
          this.deletingAccount = false
        })
    }
  }
}
</script>
