import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home.vue')
const Category = () => import('views/category/Category.vue')
const Cart = () => import('views/cart/Cart.vue')
const Detail = () => import('views/detail/Detail.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: '首页',
      index: 2,
    },
  },
  {
    path: '/category',
    component: Category,
    meta: {
      title: '分类',
      index: 1,
    },
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      title: '购物车',
      index: 4,
    },
  },
  {
    path: '/detail/:iid',
    component: Detail,
    meta: {
      title: '详情',
      index: 3,
    },
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router