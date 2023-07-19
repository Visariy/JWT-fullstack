import { defineStore } from 'pinia';

export const useValidateStore = defineStore('validate', {
  state: () => ({
    userExistError: 'Пользователь с такой почтой зарегестрирован',
    userNotExistError: 'Неправильная почта или пароль',
  }),

  actions: {
    correctErrorMessage(message: string) {
      switch (message) {
        case 'Value is required':
          return 'Поле не может быть пустым';
        case 'Value is not a valid email address':
          return 'Указан неверный адрес почты';
        case 'This field should be at least 4 characters long':
          return 'Должно быть минимум 4 символа';
        case 'The maximum length allowed is 100':
          return 'Максимальная длина строки 100';
        case 'This field should be at least 22 characters long':
          return 'Должно быть минимум 22 символов';
      }
    },
  },
});
