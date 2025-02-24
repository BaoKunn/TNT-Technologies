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

const { validate } = useForm('form')
const { push } = useRouter()
const { init } = useToast()

const formData = reactive({
  username: '',
  password: '',
  keepLoggedIn: false,
})

const submit = async () => {
  if (validate()) {
  //   try {
  //     // Gọi API đăng nhập
  //     const response = await axios.get(`https://farmapidev.tnt-tech.vn/api/USER/Login?UserName=${formData.email}&Password=${formData.password}`)

  //     if (response.status == 200) {
  //       // Hiển thị thông báo thành công và chuyển hướng đến dashboard
  //       init({ message: "You've successfully logged in", color: 'success' })
  //       push({ name: 'dashboard' })
  //     } else {
  //       // Hiển thị thông báo lỗi nếu không thành công
  //       init({ message: response.data.message || 'Login failed', color: 'danger' })
  //     }
  //   } catch (error) {
  //     // Xử lý lỗi nếu có
  //     init({ message: 'An error occurred while logging in', color: 'danger' })
  //   }
  // }
  try {
      if (formData.username == 'bk' && formData.password == '1') {
        // Hiển thị thông báo thành công và chuyển hướng đến dashboard
        init({ message: "You've successfully logged in", color: 'success' })
        push({ name: 'dashboard' })
      } else {
        // Hiển thị thông báo lỗi nếu không thành công
        init({ message: 'Login failed', color: 'danger' })
        // init({ message: response.data.message || 'Login failed', color: 'danger' })
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      init({ message: 'An error occurred while logging in', color: 'danger' })
    }
  }
}
</script>
