import { IUser } from 'src/interfaces/UserModel';
import { api } from 'src/boot/axios';
import { AxiosResponse } from 'axios';
import IAuth from 'src/interfaces/AuthModel';

export default class AuthService {
  public static async registration(
    email: string,
    password: string
  ): Promise<AxiosResponse> {
    return await api.post('/public', {
      email: email,
      password: password,
    });
  }

  public static async getUserByEmail(email: string): Promise<AxiosResponse> {
    return await api.post('/public/mail', {
      email: email,
    });
  }

  public static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<IAuth>> {
    return await api.post('/auth/login', {
      email: email,
      password: password,
    });
  }

  public static async logout(): Promise<AxiosResponse> {
    return await api.get('/auth/logout');
  }

  public static async getUserInfo(): Promise<AxiosResponse<IUser>> {
    return await api.get('/auth/user');
  }

  public static async delete(): Promise<AxiosResponse> {
    return api.get('/auth/delete');
  }

  public static async update(userData: IUser): Promise<AxiosResponse> {
    return api.post('/auth/update', {
      firstName: userData.firstName,
      lastName: userData.lastName,
      address: userData.address,
      number: userData.number,
      description: userData.description,
    });
  }

  public static async refresh(): Promise<AxiosResponse<IAuth>> {
    return api.get('/auth/refresh');
  }
}
