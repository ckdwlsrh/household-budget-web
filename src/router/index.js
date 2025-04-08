import { createRouter, createWebHistory } from 'vue-router'
// import HomePage from '@/pages/HomePage.vue'
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
      component: BudgetListPage,
    },
    // {
    //   path: '/',
    //   component: HomePage,
    // },
    {
      path: '/login',
      component: LoginPage,
    },
    {
      path: '/signup',
      component: SignupPage,
    },
    {
      path: '/profileEdit',
      component: ProfileEditPage,
    },
    {
      path: '/budgetList',
      component: BudgetListPage,
    },
    {
      path: '/budgetDetail/:id',
      component: BudgetDetailPage,
    },
    {
      path: '/addBugetDetail',
      component: AddBudgetDetailPage,
    },
    {
      path: '/updateBudgetDetail',
      component: UpdateBudgetDetailPage,
    },
  ],
})

export default router
