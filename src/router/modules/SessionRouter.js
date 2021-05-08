const SignInView = () => import(/* webpackChunkName: "session-routes" */ '@/views/sessions/SignInView')
const SignUpView = () => import(/* webpackChunkName: "session-routes" */ '@/views/sessions/SignUpView')
const ResetPasswordView = () => import(/* webpackChunkName: "session-routes" */ '@/views/sessions/ResetPasswordView')
const NewPasswordView = () => import(/* webpackChunkName: "session-routes" */ '@/views/sessions/NewPasswordView')
const PrivacyStepView = () => import(/* webpackChunkName: "session-routes" */ '@/views/sessions/PrivacyStepView')

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
  },
  {
    path: '/privacy',
    component: PrivacyStepView,
    meta: {
      requiresAuth: true,
      title: 'privacy',
      showTitle: false
    }
  },
  {
    path: '/reset-password',
    component: ResetPasswordView,
    meta: {
      title: 'resetPassword',
      showTitle: false
    }
  },
  {
    path: '/new-password',
    component: NewPasswordView,
    meta: {
      title: 'newPassword',
      showTitle: false
    }
  }
]
