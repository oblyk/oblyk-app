export default function ({ $auth, redirect }) {
  if (!$auth.$state.user.super_admin) {
    return redirect('/')
  }
}
