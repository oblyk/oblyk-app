export default function ({ $auth, redirect, route }) {
  if (!$auth.$state.user.administered_gyms.map(gym => gym.id).includes(parseInt(route.params.gymId))) {
    return redirect('/errors/right-required')
  }
}
