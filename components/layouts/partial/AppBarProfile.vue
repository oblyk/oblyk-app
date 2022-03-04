<template>
  <div v-if="$auth.loggedIn">
    <v-list-item>
      <v-list-item-title class="font-weight-bold">
        {{ $auth.user.first_name }}
      </v-list-item-title>
    </v-list-item>
    <v-divider />
    <app-drawer-item :title="$t('components.layout.appBar.user.messenger')" icon="mdi-forum" :url="`/me/${$auth.user.slug_name}/messenger`" />
    <app-drawer-item :title="$t('components.layout.appBar.user.avatar')" icon="mdi-account-circle" :url="`/me/${$auth.user.slug_name}/settings/avatar`" />
    <app-drawer-item :title="$t('components.layout.appBar.user.banner')" icon="mdi-panorama" :url="`/me/${$auth.user.slug_name}/settings/banner`" />
    <app-drawer-item :title="$t('components.layout.appBar.user.settings')" icon="mdi-cog" :url="`/me/${$auth.user.slug_name}/settings/general`" />
    <v-divider />
  </div>
</template>

<script>
import AppDrawerItem from '~/components/layouts/partial/AppDrawerItem'

export default {
  name: 'AppBarProfil',
  components: { AppDrawerItem }
}
</script>
