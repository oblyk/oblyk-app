const SignInView = () => import(/* webpackChunkName: "session-routes" */ '@/views/sessions/SignInView')
const SignUpView = () => import(/* webpackChunkName: "session-routes" */ '@/views/sessions/SignUpView')
const ResetPasswordView = () => import(/* webpackChunkName: "session-routes" */ '@/views/sessions/ResetPasswordView')
const NewPasswordView = () => import(/* webpackChunkName: "session-routes" */ '@/views/sessions/NewPasswordView')
const PrivacyStepView = () => import(/* webpackChunkName: "session-routes" */ '@/views/sessions/PrivacyStepView')

export default [
  {
    path: '/sign-in',
    component: SignInView
  },
  {
    path: '/sign-up',
    component: SignUpView
  },
  {
    path: '/privacy',
    component: PrivacyStepView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/reset-password',
    component: ResetPasswordView
  },
  {
    path: '/new-password',
    component: NewPasswordView
  }
]
