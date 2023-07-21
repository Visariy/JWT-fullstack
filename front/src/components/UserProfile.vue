<template>
  <q-card
    class="q-pa-xl bg-white desktop-only"
    style="height: 800px; width: 1000px"
  >
    <q-card-section>
      <div class="row">
        <div class="col">
          <h4 class="text-h4 q-ma-sm">Ваш профиль</h4>
        </div>
        <div class="btn-container col">
          <q-btn
            @click="router.push('/edit')"
            color="black"
            label="Редактировать профиль"
          />
        </div>
        <div class="btn-container col">
          <q-btn @click="deleteAccount" color="black" label="Удалить аккаунт" />
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="row">
        <div class="col">
          <div class="profile-info q-ml-sm">
            <div class="profile-info__item text-h6 q-mb-xl">
              <strong>Имя:</strong>
              <span
                v-if="authStore.user.firstName"
                style="color: white"
                class="profile-info__item__text q-ml-xl q-pa-sm bg-dark"
                >{{ authStore.user.firstName }}</span
              >
              <span
                v-else
                class="profile-info__item__text q-ml-xl q-pa-sm bg-dark"
                >Информация отсуствует</span
              >
            </div>
          </div>
          <div class="profile-info q-ml-sm">
            <div class="profile-info__item text-h6 q-mb-xl">
              <strong>Email:</strong>
              <span
                v-if="authStore.user.email"
                class="profile-info__item__text q-ml-xl q-pa-sm bg-dark"
                >{{ authStore.user.email }}</span
              >
              <span
                v-else
                class="profile-info__item__text q-ml-xl q-pa-sm bg-dark"
                >Информация отсуствует</span
              >
            </div>
          </div>
        </div>
        <div class="col">
          <div class="profile-info q-ml-sm">
            <div class="profile-info__item text-h6 q-mb-xl">
              <strong>Телефон:</strong>
              <span
                v-if="authStore.user.number"
                class="profile-info__item__text q-ml-xl q-pa-sm bg-dark"
                >{{ authStore.user.number }}</span
              >
              <span
                v-else
                class="profile-info__item__text q-ml-xl q-pa-sm bg-dark"
                >Информация отсуствует</span
              >
            </div>
          </div>
          <div class="profile-info q-ml-sm">
            <div class="profile-info__item text-h6 q-mb-xl">
              <strong>Город:</strong>
              <span
                v-if="authStore.user.address"
                class="profile-info__item__text q-mt-sm q-ml-xl q-pa-sm bg-dark"
                >{{ authStore.user.address }}</span
              >
              <span
                v-else
                class="profile-info__item__text q-ml-xl q-pa-sm bg-dark"
                >Информация отсуствует</span
              >
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-separator size="5px" color="black" />
    <q-card-section>
      <div class="row">
        <div class="full-width col col-8">
          <span class="text-h4">О себе:</span>
          <p
            v-if="authStore.user.description"
            class="profile-text text-h7 q-pa-sm bg-dark"
          >
            {{ authStore.user.description }}
          </p>
          <p v-else class="profile-text text-h7 q-pa-sm bg-dark">
            Информация отсуствует
          </p>
        </div>
      </div>
    </q-card-section>
  </q-card>

  <q-card class="bg-white mobile-only">
    <q-card-section>
      <div class="row">
        <div class="col flex justify-center">
          <h4 class="text-h4 q-ma-sm">Ваш профиль</h4>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="row">
        <div class="col flex">
          <div class="btn-container q-ma-sm col">
            <q-btn
              @click="router.push('/edit')"
              color="black"
              label="Редактировать информацию"
            />
          </div>
          <div class="btn-container q-ma-sm col">
            <q-btn
              @click="deleteAccount"
              color="black"
              label="Удалить аккаунт"
            />
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="col">
        <div class="profile-info-mobile q-ml-sm">
          <div class="profile-info-mobile__item text-h6 q-mb-xl">
            <strong>Имя:</strong>
            <span
              v-if="authStore.user.firstName"
              class="profile-info-mobile__item__text q-ml-xl q-pa-sm bg-dark"
              >{{ authStore.user.firstName }}</span
            >
            <span
              v-else
              class="profile-info-mobile__item__text q-ml-xl q-pa-sm bg-dark"
              >Информация отсуствует</span
            >
          </div>
        </div>
        <div class="profile-info-mobile q-ml-sm">
          <div class="profile-info-mobile__item text-h6 q-mb-xl">
            <strong>Email:</strong>
            <span
              v-if="authStore.user.email"
              class="profile-info-mobile__item__text q-ml-xl q-pa-sm bg-dark"
              >{{ authStore.user.email }}</span
            >
            <span
              v-else
              class="profile-info-mobile__item__text q-ml-sm q-pa-sm bg-dark"
              >Информация отсуствует</span
            >
          </div>
        </div>
        <div class="profile-info-mobile q-ml-sm">
          <div class="profile-info-mobile__item text-h6 q-mb-xl">
            <strong>Телефон:</strong>
            <span
              v-if="authStore.user.number"
              class="profile-info-mobile__item__text q-ml-sm q-pa-sm bg-dark"
              >{{ authStore.user.number }}</span
            >
            <span
              v-else
              class="profile-info-mobile__item__text q-ml-sm q-pa-sm bg-dark"
              >Информация отсуствует</span
            >
          </div>
        </div>
        <div class="profile-info-mobile q-ml-sm">
          <div class="profile-info-mobile__item text-h6 q-mb-xl">
            <strong>Город:</strong>
            <span
              v-if="authStore.user.address"
              class="profile-info-mobile__item__text q-mt-sm q-ml-xl q-pa-sm bg-dark"
              >{{ authStore.user.address }}</span
            >
            <span
              v-else
              class="profile-info-mobile__item__text q-ml-sm q-pa-sm bg-dark"
              >Информация отсуствует</span
            >
          </div>
        </div>
      </div>
    </q-card-section>
    <q-separator size="5px" color="black" />
    <q-card-section>
      <div class="row">
        <div class="full-width col col-8">
          <span class="text-h4">О себе:</span>
          <p
            v-if="authStore.user.description"
            class="profile-text text-h7 q-pa-sm bg-dark"
          >
            {{ authStore.user.description }}
          </p>
          <p v-else class="profile-text text-h7 q-pa-sm bg-dark">
            Описание отсуствует
          </p>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();

const router = useRouter();

const deleteAccount = async () => {
  await authStore.delete();
  await router.push('login');
};
</script>

<style scoped lang="scss">
.btn-container {
  display: flex;
  justify-content: space-around;
}

.profile-info {
  &__item {
    &__text {
      color: white;
      border-radius: 10px;
    }
  }
}
.profile-info-mobile {
  &__item {
    &__text {
      color: white;
      font-size: 15px;
      border-radius: 10px;
    }
  }
}

.profile-text {
  word-wrap: break-word;
  color: white;
  border-radius: 10px;
  height: 200px;
}
</style>
