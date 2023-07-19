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
              Укажите почту и пароль для того чтобы авторизироваться
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
                    Авторизация
                  </div>
                </div>
              </div>

              <q-form ref="form" class="q-gutter-md" @submit="submit()">
                <q-input
                  color="dark"
                  v-model="user.email"
                  :error="!isUserExist"
                  :error-message="validateStore.userNotExistError"
                  label="Email"
                  name="Email"
                />
                <q-input
                  color="dark"
                  v-model="user.password"
                  :error="!isUserExist"
                  :error-message="validateStore.userNotExistError"
                  label="Password"
                  name="password"
                  type="password"
                />
                <div>
                  <q-btn
                    class="full-width fredoka"
                    color="dark"
                    label="Войти"
                    rounded
                    type="submit"
                  ></q-btn>

                  <div class="q-mt-lg">
                    <div class="q-mt-sm">
                      У вас нет аккаунта?
                      <router-link class="text-dark" to="/registration"
                        >Зарегестироваться</router-link
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
import { useValidateStore } from 'stores/validate';
import { onMounted } from 'vue';

const authStore = useAuthStore();

const validateStore = useValidateStore();

const user = reactive({
  email: null,
  password: null,
});

const serverErrorMessage = ref('');

const form = ref(null);

const router = new useRouter();

const isUserExist = ref(true);

const submit = async () => {
  try {
    const response = await authStore.login(user.email, user.password);
    switch (response.status) {
      case 201:
        await router.push('/edit');
        break;
      case 500:
        isUserExist.value = false;
    }
    setTimeout(() => {
      if (serverErrorMessage.value) {
        serverErrorMessage.value = '';
      }
    }, 5000);
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  if (authStore.isAuth) {
    router.push('/profile');
  }
  if (
    authStore.isAuth &&
    !authStore.user.firstName &&
    !authStore.user.lastName
  ) {
    router.push('/edit');
  }
});

</script>
