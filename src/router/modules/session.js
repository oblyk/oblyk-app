import SignInView from '@/views/sessions/SignInView'
import SignUpView from '@/views/sessions/SignUpView'

export default [
  {
    path: '/sign-in',
    name: 'SignInView',
    component: SignInView,
    meta: {
      title: 'Me connecter'
    }
  },
  {
    path: '/sign-up',
    name: 'SignUpView',
    component: SignUpView,
    meta: {
      title: 'Me créer un compte'
    }
  }
]
