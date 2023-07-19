<template>
  <q-card class="q-ma-xl">
    <div class="row">
      <div class="col-0 col-sm-5 bg-dark rounded-left-borders xs-hide">
        <div
          class="row full-width q-px-xl q-pb-xl full-height flex flex-center"
        >
          <div class="">
            <div
              class="text-h4 text-uppercase text-white fredoka"
              style="min-width: 220px"
            >
              Здравствуйте
            </div>
            <div class="text-white q-my-sm text-subtitle1">
              Укажите почту и пароль для того чтобы зарегестрироваться
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-7">
        <div class="row q-pa-sm-sm q-pa-md">
          <div class="col-12">
            <q-card-section>
              <div class="q-mb-xl">
                <div class="flex justify-center">
                  <div
                    class="text-h4 text-uppercase q-my-none text-weight-bold text-dark fredoka"
                  >
                    Регистрация
                  </div>
                </div>
              </div>

              <q-form ref="form" class="q-gutter-md" @submit="submit()">
                <q-input
                  color="dark"
                  v-model="user.email"
                  :error="v$.email.$errors.length > 0 || isUserExist"
                  :error-message="
                    validateStore.correctErrorMessage(
                      v$.email.$errors[0]?.$message
                    ) || validateStore.userExistError
                  "
                  label="Email"
                  name="Email"
                />
                <q-input
                  color="dark"
                  v-model="user.password"
                  label="Password"
                  :error="v$.password.$errors.length > 0"
                  :error-message="
                    validateStore.correctErrorMessage(
                      v$.password.$errors[0]?.$message
                    )
                  "
                  name="password"
                  type="password"
                />
                <div>
                  <q-btn
                    class="full-width fredoka"
                    color="dark"
                    label="Зарегестрироваться"
                    rounded
                    type="submit"
                  ></q-btn>

                  <div class="q-mt-lg">
                    <div class="q-mt-sm">
                      У вас уже есть аккаунт?
                      <router-link class="text-dark" to="/login"
                        >Авторизироваться</router-link
                      >
                    </div>
                  </div>
                </div>
              </q-form>
            </q-card-section>
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'stores/auth';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import { useValidateStore } from 'stores/validate';

const authStore = useAuthStore();

const validateStore = useValidateStore();

const router = useRouter();

const isUserExist = ref(false);

const user = reactive({
  email: null,
  password: null,
});

const registrationRules = {
  email: { required, email },
  password: { required, minLength: minLength(4) },
};

const v$ = useVuelidate(registrationRules, user);

const form = ref(null);

const submit = async () => {
  try {
    const result = await v$.value.$validate();
    if (result) {
      const response = await authStore.getUserByEmail(user.email);
      if (response !== undefined) {
        isUserExist.value = true;
      } else {
        await authStore.register(user.email, user.password);
        await router.push('/login');
      }
    }
  } catch (e) {
    console.log(e);
  }
};
</script>
