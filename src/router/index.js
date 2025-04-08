import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/user/LoginPage.vue'
import SignupPage from '@/pages/user/SignupPage.vue'
import ProfileEditPage from '@/pages/user/ProfileEditPage.vue'
import BudgetListPage from '@/pages/budgets/BudgetListPage.vue'
import BudgetDetailPage from '@/pages/budgets/BudgetDetailPage.vue'
import AddBudgetDetailPage from '@/pages/budgets/AddBudgetDetailPage.vue'
import UpdateBudgetDetailPage from '@/pages/budgets/UpdateBudgetDetailPage.vue'

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
      path: '/addBugetDetail',
      name: 'addBudgetDetailPage',
      component: AddBudgetDetailPage,
    },
    {
      path: '/updateBudgetDetail',
      name: 'updateBudgetDetail',
      component: UpdateBudgetDetailPage,
    },
  ],
})

export default router
