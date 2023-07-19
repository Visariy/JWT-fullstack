import { defineStore } from 'pinia';
import { IUser } from 'src/interfaces/UserModel';
import AuthService from 'src/services/AuthService';
import { EnviromentSettings } from 'src/enviroments/constants';
import axios, { AxiosError } from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {} as IUser,
    isAuth: false,
    isLoading: false,
  }),

  actions: {
    setAuth(bool: boolean) {
      this.isAuth = bool;
    },

    setUser(user: IUser) {
      this.user = user;
    },

    setLoading(bool: boolean) {
      this.isLoading = bool;
    },

    async getUserInfo() {
      try {
        const response = await AuthService.getUserInfo();
        this.setUser(response.data);
      } catch (e) {
        console.log(e);
      }
    },

    async getUserByEmail(email: string) {
      try {
        const response = await AuthService.getUserByEmail(email);
        return response.data.email;
      } catch (e) {
        console.log(e);
      }
    },

    async login(email: string, password: string) {
      try {
        const response = await AuthService.login(email, password);
        localStorage.setItem('accessToken', response.data.accessToken);
        this.setAuth(true);
        await this.getUserInfo();
        return response;
      } catch (e) {
        const error = e as AxiosError;
        return error.response;
      }
    },

    async register(email: string, password: string) {
      try {
        return await AuthService.registration(email, password);
      } catch (e) {
        console.log(e);
      }
    },

    async delete() {
      try {
        await AuthService.delete();
        localStorage.removeItem('accessToken');
        this.setAuth(false);
      } catch (e) {
        console.log(e);
      }
    },

    async update(userInfo: IUser) {
      try {
        const response = await AuthService.update(userInfo);
        this.setUser(response.data);
        return response;
      } catch (e) {
        const error = e as AxiosError;
        return error.response;
      }
    },

    async logout() {
      try {
        await AuthService.logout();
        localStorage.removeItem('accessToken');
        this.setAuth(false);
      } catch (e) {
        console.log(e);
      }
    },

    async checkAuth() {
      this.setLoading(true);
      try {
        const response = await axios.get(
          `${EnviromentSettings.API_URL}/auth/refresh`,
          { withCredentials: true }
        );
        localStorage.setItem('accessToken', response.data.accessToken);
        this.setAuth(true);
        await this.getUserInfo();
        this.setLoading(false);
      } catch (e) {
        console.log(e);
      }
    },
  },
});
