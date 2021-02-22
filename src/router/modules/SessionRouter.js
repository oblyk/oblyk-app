import SignInView from '@/views/sessions/SignInView'
import SignUpView from '@/views/sessions/SignUpView'
import ResetPasswordView from '@/views/sessions/ResetPasswordView'
import NewPasswordView from '@/views/sessions/NewPasswordView'
import PrivacyStepView from '@/views/sessions/PrivacyStepView'

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
