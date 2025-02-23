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
      if (error.response.data.need) {
        const need = error.response.data.need
        const params = []
        if (need.gym_name) {
          params.push(`gym_name=${need.gym_name}`)
        }
        if (need.role) {
          params.push(`role=${need.role}`)
        }
        window.location.href = `/errors/right-required?${params.join('&')}`
      } else {
        window.location.href = '/errors/right-required'
      }
    } else {
      return Promise.reject(error)
    }
  })
}
