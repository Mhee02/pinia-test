import { createRouter, createWebHistory } from 'vue-router';
import UserListView from '../view/UserListView.vue'
import AddUserView from '../view/AddUserView.vue'


const routes = [
  { path: '/', redirect: '/user-list' },
  { path: '/user-list', component: UserListView },
  { path: '/add-user', component: AddUserView },
  { path: '/edit', component: AddUserView }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log('Navigating to:', to.fullPath);
  next();
});

export default router;




