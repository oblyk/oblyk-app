<template>
  <div>
    <page-header
      :title="$t('actions.mySettings')"
      back-to="/home"
    />

    <spinner v-if="!currentUser" />
    <div v-else>
      <div class="px-4 pt-3" style="max-width: 600px; margin: 0 auto">
        <v-sheet class="rounded mb-2">
          <v-list-item to="/home/settings/general">
            <v-list-item-avatar>
              <v-icon size="30" color="primary">
                {{ mdiInformation }}
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('components.user.globalInformation') }}
              </v-list-item-title>
              <v-list-item-subtitle class="span-separated-by-dot">
                <span>{{ $t('models.user.name') }}</span>
                <span>{{ $t('models.user.date_of_birth') }}</span>
                <span>{{ $t('models.user.description') }}</span>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-sheet>

        <v-sheet
          v-if="!$auth.user.minor"
          class="rounded mb-2"
        >
          <v-list-item to="/home/settings/partner">
            <v-list-item-avatar>
              <v-icon size="30" color="primary">
                {{ mdiMapMarkerRadius }}
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('components.user.settingTabs.partner') }}
              </v-list-item-title>
              <v-list-item-subtitle class="span-separated-by-dot">
                <span>{{ $t('models.crag.climbing_types') }}</span>
                <span>{{ $t('models.user.genre') }}</span>
                <span>{{ $t('common.level') }}</span>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-sheet>

        <v-sheet class="rounded mb-2">
          <v-list-item to="/home/settings/connection">
            <v-list-item-avatar>
              <v-icon size="30" color="primary">
                {{ mdiLastpass }}
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('components.user.settingTabs.connection') }}
              </v-list-item-title>
              <v-list-item-subtitle class="span-separated-by-dot">
                <span>{{ $t('models.user.email') }}</span>
                <span>{{ $t('models.user.password') }}</span>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-sheet>

        <v-sheet class="rounded mb-2">
          <v-list-item to="/home/settings/privacy">
            <v-list-item-avatar>
              <v-icon size="30" color="primary">
                {{ mdiLock }}
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('components.user.settingTabs.privacy') }}
              </v-list-item-title>
              <v-list-item-subtitle class="span-separated-by-dot">
                <span>{{ $t('models.user.public_profile') }}</span>
                <span>{{ $t('home.header.title.logbook') }}</span>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-sheet>

        <v-sheet class="rounded mb-2">
          <v-list-item to="/home/settings/avatar">
            <v-list-item-avatar>
              <v-icon size="30" color="primary">
                {{ mdiAccountCircle }}
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('components.layout.appBar.user.avatar') }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $t('actions.changeAvatar') }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-sheet>

        <v-sheet class="rounded mb-2">
          <v-list-item to="/home/settings/banner">
            <v-list-item-avatar>
              <v-icon size="30" color="primary">
                {{ mdiImageArea }}
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('components.layout.appBar.user.banner') }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $t('actions.changeBanner') }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-sheet>

        <v-sheet class="rounded mb-2">
          <v-list-item to="/home/settings/notifications">
            <v-list-item-avatar>
              <v-icon size="30" color="primary">
                {{ mdiBell }}
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('components.user.settingTabs.notifications') }}
              </v-list-item-title>
              <v-list-item-subtitle class="span-separated-by-dot">
                <span>{{ $t('components.user.emailNotification') }}</span>
                <span>Newsletter</span>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-sheet>

        <v-sheet class="rounded mb-2">
          <v-list-item to="/home/settings/others">
            <v-list-item-avatar>
              <v-icon size="30" color="primary">
                {{ mdiCog }}
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('components.user.settingTabs.others') }}
              </v-list-item-title>
              <v-list-item-subtitle class="span-separated-by-dot">
                <span>{{ $t('components.deleteAccount.title') }}</span>
                <span>{{ $t('components.user.exportAscents') }}</span>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-sheet>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mdiInformation,
  mdiMapMarkerRadius,
  mdiLastpass,
  mdiLock,
  mdiBell,
  mdiCog,
  mdiAccountCircle,
  mdiImageArea
} from '@mdi/js'
import { CurrentUserConcern } from '~/concerns/CurrentUserConcern'
import Spinner from '~/components/layouts/Spiner'
import PageHeader from '~/components/layouts/PageHeader'

export default {
  components: { PageHeader, Spinner },
  mixins: [CurrentUserConcern],
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Paramètres'
      },
      en: {
        metaTitle: 'Settings'
      }
    }
  },

  data () {
    return {
      mdiInformation,
      mdiMapMarkerRadius,
      mdiLastpass,
      mdiLock,
      mdiBell,
      mdiCog,
      mdiAccountCircle,
      mdiImageArea
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  }
}
</script>
