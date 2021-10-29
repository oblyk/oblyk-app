const SignInView = () => import(/* webpackChunkName: "SessionRouter-SignInView" */ '@/views/sessions/SignInView')
const SignUpView = () => import(/* webpackChunkName: "SessionRouter-SignUpView" */ '@/views/sessions/SignUpView')
const ResetPasswordView = () => import(/* webpackChunkName: "SessionRouter-ResetPasswordView" */ '@/views/sessions/ResetPasswordView')
const NewPasswordView = () => import(/* webpackChunkName: "SessionRouter-NewPasswordView" */ '@/views/sessions/NewPasswordView')
const PrivacyStepView = () => import(/* webpackChunkName: "SessionRouter-PrivacyStepView" */ '@/views/sessions/PrivacyStepView')

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
