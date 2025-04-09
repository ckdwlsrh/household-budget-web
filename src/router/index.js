import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/user/LoginPage.vue'
import SignupPage from '@/pages/user/SignupPage.vue'
import ProfileEditPage from '@/pages/user/ProfileEditPage.vue'
import BudgetListPage from '@/pages/budgets/BudgetListPage.vue'
import BudgetDetailPage from '@/pages/budgets/BudgetDetailPage.vue'
import UpdateBudgetDetailPage from '@/pages/budgets/UpdateBudgetDetailPage.vue'
// import { useUserStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: HomePage,
    },
    {
      path: '/login',
      name: 'loginPage',
      component: LoginPage,
    },
    {
      path: '/signup',
      name: 'signupPage',
      component: SignupPage,
    },
    {
      path: '/profileEdit',
      name: 'profileEditPage',
      component: ProfileEditPage,
    },

    {
      path: '/budgetList',
      name: 'budgetListPage',
      component: BudgetListPage,
    },
    {
      path: '/budgetDetail/:id',
      name: 'budgetDetailPage',
      component: BudgetDetailPage,
    },
    {
      path: '/updateBudgetDetail',
      name: 'updateBudgetDetail',
      component: UpdateBudgetDetailPage,
    },
  ],
})

// 로그인 안되있는데 다른 페이지 접속시 '/login' 으로 이동
// 로그인이 되었는데 '/login' '/signup' 접속시 '/' 으로 이동
// router.beforeEach((to, from, next) => {
//   const userStore = useUserStore()
//   const isLoggedIn = !!userStore.loggedUser

//   const publicPages = ['/login', '/signup']

//   if (!publicPages.includes(to.path) && !isLoggedIn) {
//     return next('/login')
//   }

//   if (isLoggedIn && (to.path === '/login' || to.path === '/signup')) {
//     return next('/')
//   }

//   next()
// })

export default router
