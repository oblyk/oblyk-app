export default function ({ $axios, redirect, $auth }) {
  $axios.onError(async (error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      if ($auth.loggedIn) {
        await $auth.refreshTokens()

        const newToken = $auth.$storage.getUniversal('_token.local')
        if (newToken) {
          error.config.headers.Authorization = `Bearer ${newToken}`
          return $axios.request(error.config)
        } else {
          await $auth.logout('local')
          window.location.reload()
        }
      }
      redirect('/sign-in')
    } else if (code === 403) {
      await $auth.logout('local')
      window.location.reload()
    } else {
      return Promise.reject(error)
    }
  })
}
