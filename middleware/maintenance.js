export default function ({ redirect, route }) {
  const isMaintenance = process.env.VUE_APP_OBLYK_APP_MAINTENANCE === 'true'
  if (isMaintenance) {
    return redirect('/maintenance')
  }
  if (isMaintenance === false && route.path === '/maintenance') {
    return redirect('/')
  }
}
