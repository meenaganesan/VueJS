import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginForm from '@/components/LoginForm.vue'
import UserDashboard from '@/components/UserDashboard.vue'
import AddNewBook from '@/components/AddNewBook.vue'
import Dashboard from '@/components/Dashboard.vue'
import ReservedBooks from '@/components/ReservedBooks.vue'
import MyHistory from '@/components/MyHistory.vue'
import UserList from '@/components/UserList.vue'
import UserDetails from '@/components/UserDetails.vue'
import ChangePassword from '@/components/ChangePassword.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'LoginForm',
    component: LoginForm
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path:'/changePassword',
    name: 'ChangePassword',
    component: ChangePassword
  },
  {
    path: '/dashboard',
    component: Dashboard,
    children: [
      {
        path: '',
        component: UserDashboard,
        props: true
      },
      {
        path: 'reservedBooks',
        component: ReservedBooks
      },
      {
        path: 'myHistory',
        component: MyHistory
      },
      {
        path: 'addNewBook',
        component: AddNewBook
      },
      {
        path: 'userList',
        component: UserList
      },
      {
        path: 'userDetails',
        name: 'UserDetails',
        component: UserDetails
      }
    ]
  },
  {
    path: '/registerForm',
    name: 'RegisterForm',
    component: () => import(/* webpackChunkName: "about" */ '../components/RegisterForm.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
