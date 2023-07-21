<template>
  <q-card class="q-ma-xl bg-white">
    <q-form ref="form" @submit="submit()">
      <q-card-section>
        <div class="row">
          <div class="col">
            <h4 class="text-h4 q-ma-sm">Редактор профиля</h4>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <div class="col flex">
            <div class="btn-container col">
              <div class="btn-container__item">
                <q-btn
                  @click="router.push('/profile')"
                  color="black"
                  v-if="
                    authStore.user.firstName &&
                    authStore.user.lastName &&
                    authStore.user.address
                  "
                  label="Отмена"
                />
              </div>
            </div>
            <div class="btn-container col">
              <div class="btn-container__item">
                <q-btn color="black" type="submit" label="Сохранить" />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="desktop-only">
        <div class="row">
          <div class="col">
            <div class="profile-info q-ml-sm q-mt-sm">
              <q-input
                clearable
                standout
                color="white"
                :error="v$.firstName.$errors.length > 0"
                :error-message="
                  validateStore.correctErrorMessage(
                    v$.firstName.$errors[0]?.$message
                  )
                "
                v-model="userInfo.firstName"
                label="Имя"
              >
                <template v-slot:append>
                  <q-icon name="badge" />
                </template>
              </q-input>
            </div>
            <div class="profile-info q-ml-sm q-mt-sm">
              <q-input
                clearable
                standout
                color="white"
                :error="v$.lastName.$errors.length > 0"
                :error-message="
                  validateStore.correctErrorMessage(
                    v$.lastName.$errors[0]?.$message
                  )
                "
                v-model="userInfo.lastName"
                label="Фамилия"
              >
                <template v-slot:append>
                  <q-icon name="badge" />
                </template>
              </q-input>
            </div>
          </div>
          <div class="col">
            <div class="profile-info q-ml-sm q-mt-sm">
              <q-input
                clearable
                standout
                color="white"
                :error="v$.address.$errors.length > 0"
                :error-message="
                  validateStore.correctErrorMessage(
                    v$.address.$errors[0]?.$message
                  )
                "
                v-model="userInfo.address"
                label="Город"
              >
                <template v-slot:append>
                  <q-icon name="place" />
                </template>
              </q-input>
            </div>
            <div class="profile-info q-ml-sm q-mt-sm">
              <q-input
                clearable
                standout
                color="white"
                :error="v$.number.$errors.length > 0"
                :error-message="
                  validateStore.correctErrorMessage(
                    v$.number.$errors[0]?.$message
                  )
                "
                mask="+7 (###) ### - ## - ##"
                int="Mask: +7 (###) ### - ## - ##"
                v-model="userInfo.number"
                label="Телефон"
              >
                <template v-slot:append>
                  <q-icon name="smartphone" />
                </template>
              </q-input>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="mobile-only">
        <div class="row">
          <div class="col">
            <div class="profile-info q-ml-sm q-mt-sm">
              <q-input
                clearable
                standout
                color="white"
                :error="v$.firstName.$errors.length > 0"
                :error-message="
                  validateStore.correctErrorMessage(
                    v$.firstName.$errors[0]?.$message
                  )
                "
                v-model="userInfo.firstName"
                label="Имя"
              >
                <template v-slot:append>
                  <q-icon name="badge" />
                </template>
              </q-input>
            </div>
            <div class="profile-info q-ml-sm q-mt-sm">
              <q-input
                clearable
                standout
                color="white"
                :error="v$.lastName.$errors.length > 0"
                :error-message="
                  validateStore.correctErrorMessage(
                    v$.lastName.$errors[0]?.$message
                  )
                "
                v-model="userInfo.lastName"
                label="Фамилия"
              >
                <template v-slot:append>
                  <q-icon name="badge" />
                </template>
              </q-input>
            </div>
            <div class="profile-info q-ml-sm q-mt-sm">
              <q-input
                clearable
                standout
                color="white"
                :error="v$.address.$errors.length > 0"
                :error-message="
                  validateStore.correctErrorMessage(
                    v$.address.$errors[0]?.$message
                  )
                "
                v-model="userInfo.address"
                label="Город"
              >
                <template v-slot:append>
                  <q-icon name="place" />
                </template>
              </q-input>
            </div>
            <div class="profile-info q-ml-sm q-mt-sm">
              <q-input
                clearable
                standout
                color="white"
                :error="v$.number.$errors.length > 0"
                :error-message="
                  validateStore.correctErrorMessage(
                    v$.number.$errors[0]?.$message
                  )
                "
                mask="+7 (###) ### - ## - ##"
                int="Mask: +7 (###) ### - ## - ##"
                v-model="userInfo.number"
                label="Телефон"
              >
                <template v-slot:append>
                  <q-icon name="smartphone" />
                </template>
              </q-input>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="row">
          <div class="full-width col col-8" style="padding-left: 9px">
            <q-input
              clearable
              standout
              type="textarea"
              color="white"
              class="q-pb-sm no-resize"
              :error="v$.description.$errors.length > 0"
              :error-message="
                validateStore.correctErrorMessage(
                  v$.description.$errors[0]?.$message
                )
              "
              v-model="userInfo.description"
              label="О себе:"
            />
          </div>
        </div>
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { required, minLength, maxLength } from '@vuelidate/validators';
import { useValidateStore } from 'src/stores/validate';

const router = useRouter();

const validateStore = useValidateStore();

const authStore = useAuthStore();

const isLoading = computed(() => {
  return authStore.isLoading === false;
});

const stateUserInfo = computed(() => {
  return {
    email: authStore.user.email,
    firstName: authStore.user.firstName,
    lastName: authStore.user.lastName,
    address: authStore.user.address,
    description: authStore.user.description,
    number: authStore.user.number,
  };
});

const userInfo = reactive({
  email: stateUserInfo.value.email,
  firstName: stateUserInfo.value.firstName,
  lastName: stateUserInfo.value.lastName,
  address: stateUserInfo.value.address,
  description: stateUserInfo.value.description,
  number: stateUserInfo.value.number,
});

watch(isLoading, () => {
  if (isLoading.value) {
    userInfo.email = stateUserInfo.value.email;
    userInfo.firstName = stateUserInfo.value.firstName;
    userInfo.lastName = stateUserInfo.value.lastName;
    userInfo.address = stateUserInfo.value.address;
    userInfo.description = stateUserInfo.value.description;
    userInfo.number = stateUserInfo.value.number;
  }
});

const editRules = {
  firstName: { required },
  lastName: { required },
  address: { required },
  number: { minLength: minLength(22) },
  description: { maxLength: maxLength(100) },
};

let validationResult: boolean;

const v$ = useVuelidate(editRules, userInfo);

const submit = async () => {
  try {
    validationResult = await v$.value.$validate();
    if (validationResult) {
      const response = await authStore.update(userInfo);
      if (response?.status !== 401) {
        await router.push('profile');
      }
    }
  } catch (e) {
    console.log(e);
  }
};
</script>

<style scoped>
.btn-container {
  display: flex;
  justify-content: space-around;
}
</style>
