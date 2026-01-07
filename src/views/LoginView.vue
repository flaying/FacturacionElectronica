<template>
  <div class="login-page d-flex justify-content-center align-items-center">
    <div class="card login-card shadow">
      <div class="card-body p-4">
        <h4 class="text-center text-primary mb-2">FACTURACIÓN ELECTRÓNICA</h4>
        <p class="text-center text-muted mb-4">
          INICIA SESIÓN PARA CONTINUAR.
        </p>
<form >
        <!-- Username -->
        <div class="mb-3 input-group">
          <span class="input-group-text">
            <i class="bi bi-person"></i>
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="USUARIO"
            v-model="username"
          />
        </div>

        <!-- Password -->
        <div class="mb-3 input-group">
          <span class="input-group-text">
            <i class="bi bi-lock"></i>
          </span>
          <input
            type="password"
            class="form-control"
            placeholder="CONTRASEÑA"
            v-model="password"
          />
        </div>

        <!-- Remember / Forgot -->
        <div class="d-flex justify-content-end mb-4">
        <a href="#" class="text-decoration-none text-primary small">
            <i class="bi bi-lock me-1"></i>
            OLVIDÉ MI PWD?
        </a>
        </div>

        <!-- Button -->
      <div class="text-center">
        <button type="button" class="btn btn-login w-4S0 mb-3" @click="iniciarSesion">
            INICIAR SESIÓN
        </button>
    </div>


       </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth/auth'
import { toast } from 'vue3-toastify'

const username = ref('');
const password = ref('');

const router = useRouter();
const authStore = useAuthStore();

const iniciarSesion = async () => {
  if (!username.value.trim() ) {
 
    toast.warning('Usuario es requerido')
    return
  }

   if ( !password.value.trim()) {
   
    toast.warning('Contrseña es requerida')
    return
  }
  const success = await authStore.login(username.value, password.value)

  if (success) {
    toast.success('Bienvenido ' + username.value + '!')
    router.push('/Main')
  } else {
    toast.error(authStore.error)
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background-color: #bfbfbf;
}

.login-card {
  width: 420px;
  border-radius: 12px;
  border: none;
}

.input-group-text {
  background-color: #fff;
}

.btn-login {
  background-color: #ff5a2c;
  color: white;
  font-weight: 600;
  border-radius: 6px;
}

.btn-login:hover {
  background-color: #e94e24;
}
.form-control {
  border: 1px solid #b6d4fe; /* azul claro permanente */
}

.form-control:focus {
  border-color: #4da3ff; 
  box-shadow: 0 0 0 0.12rem rgba(77, 163, 255, 0.25);
}

</style>
