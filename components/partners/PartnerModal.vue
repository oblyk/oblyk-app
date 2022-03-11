<template>
  <v-dialog
    v-model="dialog"
    max-width="700"
  >
    <v-card>
      <v-card-title class="headline text-center">
        {{ $t('common.pages.partner.welcomeOnMap') }}
      </v-card-title>

      <v-card-text>
        <div v-if="!isLoggedIn || userNotSearch">
          <p>
            {{ $t('common.pages.partner.explain') }}
          </p>
          <p class="text-center">
            <v-img
              contain
              height="100"
              src="/svg/partner-contact.svg"
            />
          </p>
          <partner-figures
            class="mb-10 mt-8"
          />
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          color="primary"
          @click="dialog = false"
        >
          {{ $t('common.close') }}
        </v-btn>
        <v-btn
          text
          color="primary"
          to="/about/partner-search"
        >
          <v-icon left>
            {{ mdiMap }}
          </v-icon>
          {{ $t('common.pages.partner.howIsWork') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiMap } from '@mdi/js'
import { SessionConcern } from '@/concerns/SessionConcern'
import PartnerFigures from '@/components/partners/PartnerFigures'

export default {
  name: 'PartnerModal',
  components: { PartnerFigures },
  mixins: [SessionConcern],

  data () {
    return {
      mdiMap,
      dialog: false,
      userNotSearch: false
    }
  },

  mounted () {
    this.showModal()
  },

  methods: {
    showModal () {
      if (!this.isLoggedIn) {
        this.dialog = true
      } else {
        this
          .getLoggedInUser()
          .then((user) => {
            if (user.partner_search === false) {
              this.dialog = true
              this.userNotSearch = true
            }
          })
      }
    }
  }
}
</script>
