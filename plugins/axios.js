export default function ({ $axios, store, redirect }) {
  // $axios.interceptors.request.use(async function (config) {
  //   if (
  //     store.getters['auth/rememberMe'] && // have tools for refresh token
  //     store.getters['auth/expiredAt'] < new Date() && // session is expired
  //     !config.url.includes('/sessions/token') // not in refresh token route
  //   ) {
  //     await store.dispatch('auth/refresh') // refresh token
  //
  //     // change authorization headers
  //     config.headers.authorization = `Bearer ${store.getters['auth/getToken']}`
  //     return config
  //   } else {
  //     return config
  //   }
  // })

  // $axios.interceptors.response.use(
  //   async function (response) {
  //     if (response.data.go_fly_a_kite) {
  //       await redirect('/go-fly-a-kite')
  //       return Promise.reject(response)
  //     } else {
  //       return Promise.resolve(response)
  //     }
  //   },
  //   async function (error) {
  //     // redirect to sign-in page if user not authorized
  //     if (error.response.status === 401) {
  //       await redirect('/oblyk?unauthorized=true')
  //       return Promise.reject(error)
  //     } else {
  //       return Promise.reject(error)
  //     }
  //   })
}
