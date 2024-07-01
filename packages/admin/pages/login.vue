<script setup lang="ts">
import type { AuthTokens } from '~/generated/graphql/graphql';
import signInQuery from '~/graphql/auth/sign-in.query.gql';

const router = useRouter();

definePageMeta({
  layout: 'auth',
});

const loginData = ref({
  email: '',
  password: '',
});

const isLoading = ref(false);

const login = async () => {
  isLoading.value = true;

  try {
    const { accessToken, refreshToken }: AuthTokens = await new Promise(
      (resolve, reject) => {
        const { onResult, onError } = useQuery(signInQuery, {
          loginInput: {
            email: loginData.value.email,
            password: loginData.value.password,
          },
        });

        onResult((data) => {
          if (data.partial) return;

          if (!data.data?.signIn) {
            reject('auth.login.invalid');
          } else {
            resolve(data.data.signIn);
          }
        });

        onError((error) => {
          reject(error);
        });
      },
    );

    useCookie('accesstoken').value = accessToken;
    useCookie('refreshtoken').value = refreshToken;

    router.push('/');
  } catch (err) {
    console.log(err);
  }

  isLoading.value = false;
};
</script>
<template>
  <div class="flex flex-col gap-2 justify-center w-72">
    <div class="flex items-center gap-2">
      <div class="flex justify-center items-center">
        <div class="text-primary font-extrabold text-2xl -rotate-6 ml-1">M</div>
        <div
          class="text-black font-extrabold text-2xl rotate-6 relative -left-1"
        >
          B
        </div>
      </div>
      <div class="font-bold uppercase">CMS Login</div>
    </div>

    <div class="flex flex-col gap-2">
      <InputText v-model="loginData.email" type="email" placeholder="Email" />

      <InputText
        v-model="loginData.password"
        type="password"
        placeholder="Password"
      />

      <Button
        label="Sign in"
        :loading="isLoading"
        :disabled="!loginData.email || !loginData.password"
        @click="login"
      />
    </div>
  </div>
</template>
