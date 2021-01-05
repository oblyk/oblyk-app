import SignInView from '@/views/sessions/SignInView'
import SignUpView from '@/views/sessions/SignUpView'

export default [
  {
    path: '/sign-in',
    component: SignInView,
    meta: {
      title: 'signIn',
      showTitle: false
    }
  },
  {
    path: '/sign-up',
    component: SignUpView,
    meta: {
      title: 'signUp',
      showTitle: false
    }
  }
]
