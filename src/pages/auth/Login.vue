<template>
  <VaForm ref="form" @submit.prevent="submit" class="p-[24px] rounded-xl bg-[var(--va-background-secondary)]">
    <h1 class="font-semibold text-4xl mb-4">Log in</h1>
    <p class="text-base mb-4 leading-5">
      <RouterLink :to="{ name: 'signup' }" class="font-semibold text-primary">Sign up</RouterLink>
    </p>
    <VaInput
      v-model="formData.username"
      :rules="[validators.required]"
      class="mb-4"
      label="Username"
      type="text"
    />
    <VaValue v-slot="isPasswordVisible" :default-value="false">
      <VaInput
        v-model="formData.password"
        :rules="[validators.required]"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        label="Password"
        @clickAppendInner.stop="isPasswordVisible.value = !isPasswordVisible.value"
      >
        <template #appendInner>
          <VaIcon
            :name="isPasswordVisible.value ? 'mso-visibility_off' : 'mso-visibility'"
            class="cursor-pointer"
            color="secondary"
          />
        </template>
      </VaInput>
    </VaValue>

    <div class="auth-layout__options flex flex-col sm:flex-row items-start sm:items-center justify-between">
      <VaCheckbox v-model="formData.keepLoggedIn" class="mb-2 sm:mb-0" label="Keep me signed in on this device" />
      <RouterLink :to="{ name: 'recover-password' }" class="mt-2 sm:mt-0 sm:ml-1 font-semibold text-primary">
        Forgot password?
      </RouterLink>
    </div>

    <div class="flex justify-center mt-4">
      <VaButton class="w-full" @click="submit"> Login</VaButton>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, useToast } from 'vuestic-ui'
import axios from 'axios'
import { validators } from '../../services/utils'
import { useGlobalStore } from '../../stores/global-store'

const { validate } = useForm('form')
const { push } = useRouter()
const { init } = useToast()
const store = useGlobalStore()

const formData = reactive({
  username: '',
  password: '',
  keepLoggedIn: false,
})

const submit = async () => {
  if (validate()) {
    try {
      // Replace the login logic here if necessary
      if (formData.username == 'admin' && formData.password == '123456') {
        // Calculate the start and end date
        const today = new Date();
        const endDate = today.toLocaleDateString('en-US'); // Today's date
        today.setDate(today.getDate() - 7); // Subtract 7 days from today
        const startDate = today.toLocaleDateString('en-US'); // Start date (7 days ago)

        const a = [startDate]
        const b = [endDate]
        // Set to localStorage
        store.setUserID('1')
        localStorage.setItem('userID', '1');
        localStorage.setItem('startDate', '01/31/2025');
        localStorage.setItem('endDate', '01/31/2025');

        // Show success toast
        init({ message: "You've successfully logged in", color: 'success' });

        // Redirect to the dashboard
        push({ name: 'dashboard' });
      } else {
        // Show login failure message
        init({ message: 'Login failed', color: 'danger' });
      }
    } catch (error) {
      // Show error message if an error occurs
      init({ message: 'An error occurred while logging in', color: 'danger' });
    }
  }
};

</script>
