<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { AppInfo } from '@/constant'
import Account from '@/types/account'
import { Notify } from 'quasar'

const user = ref('')
const password = ref('')
const isLoading = ref(false)
const isPwd = ref(true)

const router = useRouter()

const login = () => {
  isLoading.value = true

  const model = new Account()
  model.login(
    { username: user.value, password: password.value },
    () => {
      isLoading.value = false
      router.push('/home')
    },
    () => {
      isLoading.value = false
      Notify.create('Failed to logged-in.')
    }
  )
}
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="bg-indigo-5 window-height window-width row justify-center items-center">
        <div class="column">
          <div class="row">
            <h5 class="text-h5 text-white q-my-md">{{ AppInfo.AppName }}</h5>
          </div>
          <div class="row">
            <q-card square bordered class="q-pa-lg shadow-1">
              <q-card-section>
                <q-form class="q-gutter-md">
                  <q-input square filled clearable v-model="user" type="text" label="User" autofocus tabindex="1">
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>
                  <q-input square filled v-model="password" :type="isPwd ? 'password' : 'text'" label="Password" tabindex="2">
                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>
                    <template v-slot:append>
                      <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
                    </template>
                  </q-input>
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-md">
                <q-btn unelevated color="indigo-7" size="lg" class="full-width" label="Login" @click="login" tabindex="3" :loading="isLoading" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
@media (min-width: 800px) {
  // 800px or more
  .q-card {
    width: 50vw;
    height: auto;
  }
}

@media (max-width: 799px) {
  // 799px or less
  .q-card {
    width: 90vw;
    height: auto;
  }
}
</style>
