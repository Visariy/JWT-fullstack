import { RouteRecordRaw } from 'vue-router';
import MainLayout from 'layouts/MainLayout.vue';
import RegistrationPage from 'pages/RegistrationPage.vue';
import LoginPage from 'pages/LoginPage.vue';
import ProfilePage from 'pages/ProfilePage.vue';
import EditPage from 'pages/EditPage.vue';
import AuthService from 'src/services/AuthService';
import { api } from 'boot/axios';
import IAuth from 'src/interfaces/AuthModel';
import { AxiosResponse } from 'axios';
import { useAuthStore } from 'stores/auth';

api.interceptors.request.use((config) => {
  if (config.url !== '/auth/refresh' && localStorage.getItem('accessToken')) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      'accessToken'
    )}`;
  }
  return config;
});

api.interceptors.response.use(
  (config): Promise<AxiosResponse<IAuth>> | AxiosResponse<IAuth> => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry &&
      originalRequest.url !== '/auth/refresh'
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await AuthService.refresh();
        localStorage.setItem('accessToken', response.data.accessToken);
        return api.request(originalRequest);
      } catch (e) {
        console.log(e);
      }
    }
    throw error;
  }
);

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { path: '/registration' },
  },
  {
    path: '/registration',
    component: RegistrationPage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    name: 'profile',
    path: '/profile',
    component: MainLayout,
    beforeEnter: () => {
      const authStore = useAuthStore();
      if (!authStore.isAuth && !authStore.isLoading) {
        return 'login';
      }
    },
    children: [
      {
        path: '',
        component: ProfilePage,
      },
    ],
  },
  {
    path: '/edit',
    component: MainLayout,
    beforeEnter: async () => {
      const authStore = await useAuthStore();
      if (!authStore.isAuth && !authStore.isLoading) {
        return 'login';
      }
    },
    children: [
      {
        path: '',
        component: EditPage,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
